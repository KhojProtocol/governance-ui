import React, { useContext, useEffect, useState } from 'react'
import Input from 'components/inputs/Input'
import * as yup from 'yup'

import {
  Governance,
  ProgramAccount,
  serializeInstructionToBase64,
} from '@solana/spl-governance'

import { PublicKey, StakeProgram } from '@solana/web3.js'

import {
  UiInstruction,
  ValidatorStakingForm,
} from '@utils/uiTypes/proposalCreationTypes'
import { NewProposalContext } from '../../../new'
import { isFormValid } from '@utils/formValidation'
import useWalletStore from 'stores/useWalletStore'
import { web3 } from '@project-serum/anchor'
import useGovernanceAssets from '@hooks/useGovernanceAssets'
import GovernedAccountSelect from '../../GovernedAccountSelect'
import * as anchor from '@project-serum/anchor'
import { parseMintNaturalAmountFromDecimal } from '@tools/sdk/units'

const SOLANA_VALIDATOR_DAO_PROGRAM_ID = new PublicKey(
  'AwyKDr1Z5BfdvK3jX1UWopyjsJSV5cq4cuJpoYLofyEn'
)
//const SOLANA_VALIDATOR_DAO_IDL_ID = new PublicKey('GnhBKwcWcqUwSLoheNKQLvdu6v3fFR9mUaQnw6Ci8jmP')
const GOVERNANCE_PROGRAM_ID = new PublicKey(
  'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'
)

const StakeValidator = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const connection = useWalletStore((s) => s.connection)
  const programId: PublicKey = StakeProgram.programId
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  const shouldBeGoverned = index !== 0 && governance
  const wallet = useWalletStore((s) => s.current)

  const [form, setForm] = useState<ValidatorStakingForm>({
    validatorVoteKey: '',
    amount: 0,
    seed: 0,
    governedTokenAccount: undefined,
  })
  const [formErrors, setFormErrors] = useState({})
  const { handleSetInstructions } = useContext(NewProposalContext)

  const handleSetForm = ({ propertyName, value }) => {
    setFormErrors({})
    setForm({ ...form, [propertyName]: value })
  }

  const [governedAccount, setGovernedAccount] = useState<
    ProgramAccount<Governance> | undefined
  >(undefined)

  const setValidatorVoteKey = (event) => {
    const value = event.target.value
    handleSetForm({
      value: value,
      propertyName: 'validatorVoteKey',
    })
  }

  const setSeed = (event) => {
    const value = event.target.value
    handleSetForm({
      value: value,
      propertyName: 'seed',
    })
  }

  const setAmount = (event) => {
    const value = event.target.value
    handleSetForm({
      value: value,
      propertyName: 'amount',
    })
  }

  const validateInstruction = async (): Promise<boolean> => {
    const validatorsStatus = await connection.current.getVoteAccounts()
    const validators = validatorsStatus.current.map((x) => x.votePubkey)
    //const validator = validatorsStatus.current.map(x => x.votePubkey);

    const schema = yup.object().shape({
      validatorVoteKey: yup
        .string()
        .required('Validator vote address is required')
        .oneOf(validators),
      amount: yup
        .number()
        .min(1, 'Amount must be positive number')
        .required('Amount is required'),
      seed: yup
        .number()
        .min(0, 'Seed must be positive number')
        .required('Seed is required'),
    })
    const { isValid, validationErrors } = await isFormValid(schema, form)
    setFormErrors(validationErrors)
    return isValid
  }

  async function getInstruction(): Promise<UiInstruction> {
    const isValid = await validateInstruction()
    const governancePk = governance?.pubkey
    const returnInvalid = (): UiInstruction => {
      return {
        serializedInstruction: '',
        isValid: false,
        governance: undefined,
      }
    }
    const governanceAccount = governance?.account

    if (
      !connection ||
      !isValid ||
      !programId ||
      !governanceAccount ||
      !governancePk ||
      !form.governedTokenAccount?.isSol ||
      !wallet ||
      !wallet.publicKey
    ) {
      return returnInvalid()
    }

    const nativeTreasury = form.governedTokenAccount.pubkey
    const prerequisiteInstructions: web3.TransactionInstruction[] = []
    const seedBuffer = new Uint8Array([form.seed])
    const provider = new anchor.AnchorProvider(
      connection.current,
      {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      },
      { commitment: 'confirmed' }
    )
    const idl = await anchor.Program.fetchIdl(
      SOLANA_VALIDATOR_DAO_PROGRAM_ID,
      provider
    )
    if (!idl) {
      console.log('idl is null')
      return returnInvalid()
    }
    const program = new anchor.Program(
      idl,
      SOLANA_VALIDATOR_DAO_PROGRAM_ID,
      provider
    )
    const validatorVotePK = new PublicKey(form.validatorVoteKey)

    const [daoStakeAccount] = await web3.PublicKey.findProgramAddress(
      [
        Buffer.from('validator_dao_stake_account'),
        governancePk.toBuffer(),
        nativeTreasury.toBuffer(),
        GOVERNANCE_PROGRAM_ID.toBuffer(),
        validatorVotePK.toBuffer(),
        seedBuffer,
      ],
      SOLANA_VALIDATOR_DAO_PROGRAM_ID
    )

    const mintAmount = parseMintNaturalAmountFromDecimal(form.amount!, 9)

    const instruction = await program.methods
      .stake(form.seed, new anchor.BN(mintAmount))
      .accounts({
        governanceId: governancePk,
        governanceNativeTreasuryAccount: nativeTreasury,
        daoStakeAccount: daoStakeAccount,
        payer: nativeTreasury,
        clockProgram: web3.SYSVAR_CLOCK_PUBKEY,
        stakeConfig: web3.STAKE_CONFIG_ID,
        stakeHistory: web3.SYSVAR_STAKE_HISTORY_PUBKEY,
        validatorVoteKey: validatorVotePK,
        governanceProgram: GOVERNANCE_PROGRAM_ID,
        stakeProgram: web3.StakeProgram.programId,
        systemProgram: web3.SystemProgram.programId,
        rentProgram: web3.SYSVAR_RENT_PUBKEY,
      })
      .instruction()

    return {
      serializedInstruction: serializeInstructionToBase64(instruction),
      isValid: true,
      governance: form.governedTokenAccount.governance,
      prerequisiteInstructions: prerequisiteInstructions,
      shouldSplitIntoSeparateTxs: false,
    }
  }

  useEffect(() => {
    handleSetInstructions(
      {
        governedAccount: governedAccount,
        getInstruction,
      },
      index
    )
  }, [form])

  useEffect(() => {
    handleSetInstructions(
      { governedAccount: governedAccount, getInstruction },
      index
    )
  }, [form])
  useEffect(() => {
    setGovernedAccount(form.governedTokenAccount?.governance)
  }, [form.governedTokenAccount])

  return (
    <>
      <GovernedAccountSelect
        label="Source account"
        governedAccounts={governedTokenAccountsWithoutNfts.filter(
          (x) => x.isSol
        )}
        onChange={(value) => {
          handleSetForm({ value, propertyName: 'governedTokenAccount' })
        }}
        value={form.governedTokenAccount}
        error={formErrors['governedTokenAccount']}
        shouldBeGoverned={shouldBeGoverned}
        governance={governance}
      ></GovernedAccountSelect>
      <Input
        label="Validator Vote Address"
        value={form.validatorVoteKey}
        error={formErrors['validatorVoteKey']}
        type="string"
        onChange={setValidatorVoteKey}
      />
      <Input
        label="Seed for stake address (will be added with validator address)"
        value={form.seed}
        error={formErrors['seed']}
        type="number"
        min="0"
        max="255"
        onChange={setSeed}
      />
      <Input
        label="Amount"
        value={form.amount}
        error={formErrors['amount']}
        type="number"
        min="1"
        onChange={setAmount}
      />
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(164, 172, 183, 1)',
          marginTop: '18px',
        }}
      >
        Stake tokens into validator from native sol treasury.
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(164, 172, 183, 1)',
          marginTop: '18px',
        }}
      >
        Please ensure that the SOL native treasury account holds enough SOL to
        stake.
      </div>
    </>
  )
}

export default StakeValidator

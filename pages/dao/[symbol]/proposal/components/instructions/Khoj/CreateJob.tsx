/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useEffect, useState } from 'react'
import useRealm from '@hooks/useRealm'
import {
  PublicKey,
  SystemProgram,
  // SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js'
import * as yup from 'yup'
import { isFormValid } from '@utils/formValidation'
import {
  UiInstruction,
  KhojCreateJobForm,
} from '@utils/uiTypes/proposalCreationTypes'
import { NewProposalContext } from '../../../new'
import useGovernanceAssets from '@hooks/useGovernanceAssets'
import { Governance } from '@solana/spl-governance'
import { ProgramAccount } from '@solana/spl-governance'
import useWalletStore from 'stores/useWalletStore'
import { serializeInstructionToBase64 } from '@solana/spl-governance'
import { AccountType } from '@utils/uiTypes/assets'
import InstructionForm, {
  InstructionInput,
  InstructionInputType,
} from '../FormCreator'
import { USDC_MINT } from 'Strategies/protocols/mango/tools'
import { BN } from '@project-serum/anchor'
import { abbreviateAddress } from '@utils/formatting'
import { createJob } from '@khoj-protocol/sdk/dist/cjs/apis'

const KHOJ_MINT_DEVNET = new PublicKey(
  'Hw9FZ2nZ7QsL7WngdQyQpqJChfV2v9LZzYqp8LM3Uza5'
)

const CreateJob = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  console.log(governance)
  const wallet = useWalletStore((s) => s.current)
  const { connection } = useWalletStore()
  const { realmInfo } = useRealm()
  const { assetAccounts } = useGovernanceAssets()
  console.log('Khoj asset', assetAccounts)
  const isDevnet = connection.cluster === 'devnet'
  const PRICE_MINT = isDevnet
    ? new PublicKey(KHOJ_MINT_DEVNET)
    : new PublicKey(USDC_MINT)
  const governedSolAccounts = assetAccounts.filter(
    (solAcc) =>
      solAcc.type === AccountType.SOL &&
      assetAccounts.find(
        (tokenAcc) =>
          tokenAcc.extensions.token?.account.owner.toBase58() ===
            solAcc.extensions.transferAddress?.toBase58() &&
          tokenAcc.extensions.mint?.publicKey.toBase58() ===
            PRICE_MINT.toBase58()
      )
  )
  console.log('Khoj sol', governedSolAccounts)
  const governedUSDCAccounts = assetAccounts.filter(
    (token) =>
      token.isToken &&
      token.extensions.mint?.publicKey.toBase58() === PRICE_MINT.toBase58() &&
      governedSolAccounts.find(
        (solAcc) =>
          solAcc.extensions.transferAddress?.toBase58() ===
          token.extensions.token?.account.owner.toBase58()
      )
  )
  console.log('Khoj usdc', governedUSDCAccounts)
  const shouldBeGoverned = index !== 0 && governance
  const programId: PublicKey | undefined = realmInfo?.programId
  const [form, setForm] = useState<KhojCreateJobForm>({
    governedAccount: null,
    title: '',
    uri: '',
    price: 1,
  })
  const [formErrors, setFormErrors] = useState({})
  const { handleSetInstructions } = useContext(NewProposalContext)
  const handleSetForm = ({ propertyName, value }) => {
    setFormErrors({})
    setForm({ ...form, [propertyName]: value })
  }
  const validateInstruction = async (): Promise<boolean> => {
    const { isValid, validationErrors } = await isFormValid(schema, form)
    setFormErrors(validationErrors)
    return isValid
  }
  async function getInstruction(): Promise<UiInstruction> {
    const isValid = await validateInstruction()
    let serializedInstructions: string[] = []
    const prequisiteInstructions: TransactionInstruction[] = []
    if (
      isValid &&
      programId &&
      form.governedAccount?.governance?.account &&
      wallet?.publicKey
    ) {
      // const provider = new AnchorProvider(connection.current, wallet, {})
      // const neoProgram = new Program<NEO_PROGRAM>(
      //   NEO_IDL,
      //   NEO_CONTRACT_PROGRAM_ADDRESS,
      //   provider
      // )
      // const [userId] = await findUserId(governedSolAccounts[0].pubkey)
      // const instruction = await neoProgram.methods
      //   .initUser({
      //     firstName: "Khoj",
      //     lastName: "DAO",
      //     organisation: "",
      //     pfp: null,
      //     userType: 0,
      //   })
      //   .accounts({
      //     user: userId,
      //     payer: governedSolAccounts[0].pubkey,
      //     systemProgram: SystemProgram.programId,
      //   })
      //   .instruction()

      const [transaction] = await createJob(connection.current, wallet as any, {
        creator: governedSolAccounts[0].pubkey,
        title: form.title,
        uri: form.uri,
        price: new BN(form.price),
        priceMint: PRICE_MINT,
      })

      //size of ata
      const size = 165
      const rent = await connection.current.getMinimumBalanceForRentExemption(
        size
      )
      const transferRentIx = SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: form.governedAccount.extensions.token!.account.owner!,
        lamports: rent,
      })
      prequisiteInstructions.push(transferRentIx)
      // //Mango instruction call and serialize
      // const instructions = await getPurchaseInstructions(
      //   form.governedAccount.extensions.token!.account.owner!,
      //   ISSUER,
      //   form.governedAccount.extensions.token!.account.owner!,
      //   SALE_MINT,
      //   new BN(form.quantity),
      //   connection.current
      // )

      const instructions = transaction.instructions //[instruction] //
      serializedInstructions = instructions.map((x) =>
        serializeInstructionToBase64(x)
      )
    }
    const obj: UiInstruction = {
      prerequisiteInstructions: prequisiteInstructions,
      additionalSerializedInstructions: serializedInstructions,
      serializedInstruction: '',
      isValid,
      governance: form.governedAccount?.governance,
    }
    return obj
  }
  useEffect(() => {
    handleSetForm({
      propertyName: 'programId',
      value: programId?.toString(),
    })
  }, [realmInfo?.programId])
  useEffect(() => {
    handleSetInstructions(
      { governedAccount: form.governedAccount?.governance, getInstruction },
      index
    )
  }, [form])
  const schema = yup.object().shape({
    // price: yup.number().min(1).required('Price is required'),
  })
  const inputs: InstructionInput[] = [
    {
      label: 'USDC account owned by SOL account',
      initialValue: form.governedAccount,
      name: 'governedAccount',
      type: InstructionInputType.GOVERNED_ACCOUNT,
      shouldBeGoverned: shouldBeGoverned as any,
      governance: governance,
      options: governedUSDCAccounts,
      additionalComponent: form.governedAccount?.extensions.token ? (
        <div>
          SOL account:{' '}
          <small>
            {abbreviateAddress(
              form.governedAccount?.extensions.token?.account.owner
            )}
          </small>
        </div>
      ) : null,
    },
    {
      label: 'Title',
      initialValue: form.title,
      type: InstructionInputType.INPUT,
      // validateMinMax: true,
      name: 'title',
      inputType: 'string',
      // min: 1,
      additionalComponent: <div>Title: {form.title ? form.title : ''}</div>,
    },
    {
      label: 'URI',
      initialValue: form.uri,
      type: InstructionInputType.INPUT,
      // validateMinMax: true,
      name: 'uri',
      inputType: 'string',
      // min: 1,
      additionalComponent: <div>URI: {form.uri ? form.uri : ''}</div>,
    },
    {
      label: 'Price',
      initialValue: form.price,
      type: InstructionInputType.INPUT,
      validateMinMax: true,
      name: 'price',
      inputType: 'string',
      min: 1,
      additionalComponent: (
        <div>Price: {form.price ? Number(form.price) : 0}</div>
      ),
    },
  ]

  return (
    <>
      {form && (
        <InstructionForm
          outerForm={form}
          setForm={setForm}
          inputs={inputs}
          setFormErrors={setFormErrors}
          formErrors={formErrors}
        ></InstructionForm>
      )}
    </>
  )
}

export default CreateJob

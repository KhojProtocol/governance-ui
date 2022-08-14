import * as web3 from '@solana/web3.js'
import * as splToken from '@solana/spl-token'
import type { Wallet } from '@saberhq/solana-contrib'
import { AccountFn } from './constants'
import { BN } from '@project-serum/anchor'

export async function withFindOrInitAssociatedTokenAccount(
  transaction: web3.Transaction,
  connection: web3.Connection,
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  payer: web3.PublicKey,
  allowOwnerOffCurve?: boolean
): Promise<web3.PublicKey> {
  const associatedAddress = await splToken.Token.getAssociatedTokenAddress(
    splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    splToken.TOKEN_PROGRAM_ID,
    mint,
    owner,
    allowOwnerOffCurve
  )
  const account = await connection.getAccountInfo(associatedAddress)
  if (!account) {
    transaction.add(
      splToken.Token.createAssociatedTokenAccountInstruction(
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        splToken.TOKEN_PROGRAM_ID,
        mint,
        associatedAddress,
        owner,
        payer
      )
    )
  }
  return associatedAddress
}

export async function tryGetAccount<T>(fn: AccountFn<T>) {
  try {
    return await fn()
  } catch {
    return null
  }
}

export const getBatchedMultipleAccounts = async (
  connection: web3.Connection,
  ids: web3.PublicKey[],
  config?: web3.GetMultipleAccountsConfig,
  batchSize = 100
): Promise<(web3.AccountInfo<Buffer | web3.ParsedAccountData> | null)[]> => {
  const batches: web3.PublicKey[][] = [[]]
  ids.forEach((id) => {
    const batch = batches[batches.length - 1]
    if (batch) {
      if (batch.length >= batchSize) {
        batches.push([id])
      } else {
        batch.push(id)
      }
    }
  })
  const batchAccounts = await Promise.all(
    batches.map((b) =>
      connection.getMultipleAccountsInfo(b, config as web3.Commitment)
    )
  )
  return batchAccounts.flat()
}

export const executeTransaction = async (
  connection: web3.Connection,
  wallet: Wallet,
  transaction: web3.Transaction,
  config: {
    silent?: boolean
    signers?: web3.Signer[]
    confirmOptions?: web3.ConfirmOptions
    callback?: (success: boolean) => void
  }
): Promise<string> => {
  let txid = ''
  try {
    transaction.feePayer = wallet.publicKey
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash('max')
    ).blockhash
    await wallet.signTransaction(transaction)
    if (config.signers && config.signers.length > 0) {
      transaction.partialSign(...config.signers)
    }
    txid = await web3.sendAndConfirmRawTransaction(
      connection,
      transaction.serialize(),
      config.confirmOptions
    )
    config.callback && config.callback(true)
    console.log('Successful tx', txid)
  } catch (e: unknown) {
    console.log(
      'Failed transaction: ',
      (e as web3.SendTransactionError).logs,
      e
    )
    config.callback && config.callback(false)
    if (!config.silent) {
      throw new Error(`${e instanceof Error ? e.message : String(e)}`)
    }
  }
  return txid
}

export function addSigners(
  keys: web3.AccountMeta[],
  ownerOrAuthority: web3.PublicKey,
  multiSigners: web3.Signer[]
): web3.AccountMeta[] {
  if (multiSigners.length) {
    keys.push({ pubkey: ownerOrAuthority, isSigner: false, isWritable: false })
    multiSigners.forEach((signer) =>
      keys.push({
        pubkey: signer.publicKey,
        isSigner: true,
        isWritable: false,
      })
    )
  } else {
    keys.push({ pubkey: ownerOrAuthority, isSigner: true, isWritable: false })
  }
  return keys
}

export class TokenAmount extends BN {
  constructor(amount: number) {
    super(amount)
  }
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse()
    const b = Buffer.from(a)
    if (b.length === 8) {
      return b
    }

    if (b.length >= 8) {
      throw new Error('TokenAmount too large')
    }

    const zeroPad = Buffer.alloc(8)
    b.copy(zeroPad)
    return zeroPad
  }

  /**
   * Construct a TokenAmount from Buffer representation
   */
  static fromBuffer(buffer: Buffer): TokenAmount {
    if (buffer.length !== 8) {
      throw new Error(`Invalid buffer length: ${buffer.length}`)
    }

    return new BN(
      Array.from(buffer)
        .reverse()
        .map((i) => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16
    )
  }
}

export enum TokenInstruction {
  InitializeMint = 0,
  InitializeAccount = 1,
  InitializeMultisig = 2,
  Transfer = 3,
  Approve = 4,
  Revoke = 5,
  SetAuthority = 6,
  MintTo = 7,
  Burn = 8,
  CloseAccount = 9,
  FreezeAccount = 10,
  ThawAccount = 11,
  TransferChecked = 12,
  ApproveChecked = 13,
  MintToChecked = 14,
  BurnChecked = 15,
  InitializeAccount2 = 16,
  SyncNative = 17,
  InitializeAccount3 = 18,
  InitializeMultisig2 = 19,
  InitializeMint2 = 20,
}

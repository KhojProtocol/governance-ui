import type { BN } from '@project-serum/anchor'
import type { Wallet } from '@saberhq/solana-contrib'
import type { Connection } from '@solana/web3.js'
import { PublicKey, Transaction } from '@solana/web3.js'
import {
  withAcceptProposal,
  withAcceptWork,
  withInitJob,
  withInitProposal,
  withInitUser,
  withStake,
  withSubmitWork,
  withUnstake,
  withUpdateUser,
} from './transactions'
import { tryGetAccount } from './utils'

export const createUser = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
  }
): Promise<[Transaction, PublicKey]> => {
  let transaction = new Transaction()
  let userId: PublicKey

  ;[transaction, userId] = await withInitUser(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction, userId]
}

export const updateUser = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
  }
): Promise<[Transaction, PublicKey]> => {
  let transaction = new Transaction()
  let userId: PublicKey

  ;[transaction, userId] = await withUpdateUser(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction, userId]
}

export const stake = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    amount: BN
  }
): Promise<Transaction> => {
  let transaction = new Transaction()

  ;[transaction] = await withStake(transaction, connection, wallet, params)

  return transaction
}

export const unstake = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    amount: BN
  }
): Promise<Transaction> => {
  let transaction = new Transaction()

  ;[transaction] = await withUnstake(transaction, connection, wallet, params)

  return transaction
}

export const createJob = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    title: string
    uri: string
    price: BN
    priceMint: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  let transaction = new Transaction()
  let jobId: PublicKey

  ;[transaction, jobId] = await withInitJob(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction, jobId]
}

export const createProposal = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    uri: string
    price: BN
    jobId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  let transaction = new Transaction()
  let proposalId: PublicKey

  ;[transaction, proposalId] = await withInitProposal(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction, proposalId]
}

export const acceptProposal = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withAcceptProposal(
    transaction,
    connection,
    wallet,
    params
  )

  return [transaction]
}

export const submitWork = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withSubmitWork(transaction, connection, wallet, params)

  return [transaction]
}

export const acceptWork = async (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  let transaction = new Transaction()

  ;[transaction] = await withAcceptWork(transaction, connection, wallet, params)

  return [transaction]
}

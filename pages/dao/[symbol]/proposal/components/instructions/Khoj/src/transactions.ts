import { BN } from '@project-serum/anchor'
import type {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import type { Wallet } from '@saberhq/solana-contrib'
import { tryGetAccount, withFindOrInitAssociatedTokenAccount } from './utils'
import {
  findEscrowId,
  findJobId,
  findPlatformId,
  findProposalId,
  findStakeId,
  findUserId,
} from './pdas'
import {
  acceptProposalInstr,
  acceptWorkInstr,
  initJob,
  initPlatformInstr,
  initProposal,
  initUser,
  stakeInstr,
  submitWorkInstr,
  unstakeInstr,
  updateUserInstr,
} from './instructions'
import {
  getJobData,
  getPlatformData,
  getProposalData,
  getUserData,
} from './accounts'

export const withInitPlatform = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    mintId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [platformId] = await findPlatformId()

  const payerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    params.mintId,
    wallet.publicKey,
    wallet.publicKey
  )

  transaction.add(
    await initPlatformInstr(connection, wallet, {
      ...params,
      platformId,
      payerTA,
    })
  )
  return [transaction, platformId]
}

export const withInitUser = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
  }
): Promise<[Transaction, PublicKey]> => {
  const [userId] = await findUserId(wallet.publicKey)

  transaction.add(
    await initUser(connection, wallet, {
      ...params,
      userId,
    })
  )
  return [transaction, userId]
}

export const withUpdateUser = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
  }
): Promise<[Transaction, PublicKey]> => {
  const [userId] = await findUserId(wallet.publicKey)

  transaction.add(
    await updateUserInstr(connection, wallet, {
      ...params,
      userId,
    })
  )
  return [transaction, userId]
}

export const withStake = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    amount: BN
  }
): Promise<[Transaction]> => {
  const platformData = await getPlatformData(connection)

  const [userId] = await findUserId(wallet.publicKey)
  const [stakeId] = await findStakeId(wallet.publicKey)

  const stakeTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    stakeId,
    wallet.publicKey,
    true
  )

  const payerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    wallet.publicKey,
    wallet.publicKey
  )

  transaction.add(
    await stakeInstr(connection, wallet, {
      ...params,
      platformId: platformData.pubkey,
      userId,
      stakeId,
      stakeTA,
      payerTA,
    })
  )

  return [transaction]
}

export const withUnstake = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    amount: BN
  }
): Promise<[Transaction]> => {
  const platformData = await getPlatformData(connection)

  const [userId] = await findUserId(wallet.publicKey)
  const [stakeId] = await findStakeId(wallet.publicKey)

  const stakeTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    stakeId,
    wallet.publicKey,
    true
  )

  const payerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    platformData.parsed.mint,
    wallet.publicKey,
    wallet.publicKey
  )

  transaction.add(
    await unstakeInstr(connection, wallet, {
      ...params,
      platformId: platformData.pubkey,
      userId,
      stakeId,
      stakeTA,
      payerTA,
    })
  )

  return [transaction]
}

export const withInitJob = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    title: string
    uri: string
    price: BN
    priceMint: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [userId] = await findUserId(wallet.publicKey)

  let userData = await tryGetAccount(() =>
    getUserData(connection, wallet.publicKey)
  )

  if (!userData) {
    transaction.add(
      await initUser(connection, wallet, {
        firstName: '',
        lastName: '',
        organisation: '',
        userId: userId,
      })
    )
  }
  let jobCount = userData?.parsed.createdJobCount || new BN(0)
  const [jobId] = await findJobId(userId, jobCount)

  transaction.add(
    await initJob(connection, wallet, {
      title: params.title,
      uri: params.uri,
      userId: userId,
      jobId: jobId,
      price: params.price,
      priceMint: params.priceMint,
    })
  )
  return [transaction, jobId]
}

export const withInitProposal = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    uri: string
    price: BN
    jobId: PublicKey
  }
): Promise<[Transaction, PublicKey]> => {
  const [proposalId] = await findProposalId(params.jobId, wallet.publicKey)

  transaction.add(
    await initProposal(connection, wallet, {
      uri: params.uri,
      jobId: params.jobId,
      proposalId: proposalId,
      price: params.price,
    })
  )
  return [transaction, proposalId]
}

export const withAcceptProposal = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  const jobData = await getJobData(connection, params.jobId)
  const [escrowId] = await findEscrowId(params.jobId)

  const escrowTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    escrowId,
    wallet.publicKey,
    true
  )

  const authorityTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    wallet.publicKey,
    wallet.publicKey
  )

  transaction.add(
    await acceptProposalInstr(connection, wallet, {
      ...params,
      escrowId,
      escrowTA,
      authorityTA,
    })
  )

  return [transaction]
}

export const withSubmitWork = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  transaction.add(
    await submitWorkInstr(connection, wallet, {
      ...params,
    })
  )

  return [transaction]
}

export const withAcceptWork = async (
  transaction: Transaction,
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<[Transaction]> => {
  const jobData = await getJobData(connection, params.jobId)
  const proposalData = await getProposalData(connection, params.proposalId)

  const [escrowId] = await findEscrowId(params.jobId)
  console.log(escrowId.toBase58())

  const escrowTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    escrowId,
    wallet.publicKey,
    true
  )

  const proposerTA = await withFindOrInitAssociatedTokenAccount(
    transaction,
    connection,
    jobData.parsed.priceMint,
    proposalData.parsed.proposer,
    wallet.publicKey,
    true
  )

  transaction.add(
    await acceptWorkInstr(connection, wallet, {
      ...params,
      escrowId,
      escrowTA,
      proposerTA,
    })
  )

  return [transaction]
}

import type { BN } from '@project-serum/anchor'
import type {
  Connection,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js'
import { SystemProgram } from '@solana/web3.js'
import type { Wallet } from '@saberhq/solana-contrib'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { NEO_CONTRACT_PROGRAM_ADDRESS, NEO_IDL, NEO_PROGRAM } from './constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

export const initPlatformInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    mintId: PublicKey
    payerTA: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initPlatform({})
    .accounts({
      platform: params.platformId,
      mint: params.mintId,
      payerMintTokenAccount: params.payerTA,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initUser = (
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
    userId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initUser({
      firstName: params.firstName,
      lastName: params.lastName,
      organisation: params.organisation,
    })
    .accounts({
      user: params.userId,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const updateUserInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    firstName: string
    lastName: string
    organisation: string
    userId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .updateUser({
      firstName: params.firstName,
      lastName: params.lastName,
      organisation: params.organisation,
    })
    .accounts({
      user: params.userId,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const stakeInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    userId: PublicKey
    stakeId: PublicKey
    stakeTA: PublicKey
    payerTA: PublicKey
    amount: BN
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .stake({
      amount: params.amount,
    })
    .accounts({
      platform: params.platformId,
      user: params.userId,
      stake: params.stakeId,
      stakeMintTokenAccount: params.stakeTA,
      payerMintTokenAccount: params.payerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const unstakeInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    platformId: PublicKey
    userId: PublicKey
    stakeId: PublicKey
    stakeTA: PublicKey
    payerTA: PublicKey
    amount: BN
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .unstake({
      amount: params.amount,
    })
    .accounts({
      platform: params.platformId,
      user: params.userId,
      stake: params.stakeId,
      stakeMintTokenAccount: params.stakeTA,
      payerMintTokenAccount: params.payerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initJob = (
  connection: Connection,
  wallet: Wallet,
  params: {
    title: string
    uri: string
    price: BN
    userId: PublicKey
    jobId: PublicKey
    priceMint: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initJob({
      title: params.title,
      uri: params.uri,
      price: params.price,
      jobType: 0,
    })
    .accounts({
      job: params.jobId,
      priceMint: params.priceMint,
      user: params.userId,
      creator: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const initProposal = (
  connection: Connection,
  wallet: Wallet,
  params: {
    uri: string
    price: BN
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .initProposal({
      uri: params.uri,
      price: params.price,
    })
    .accounts({
      job: params.jobId,
      proposal: params.proposalId,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const acceptProposalInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
    escrowId: PublicKey
    escrowTA: PublicKey
    authorityTA: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .acceptProposal({})
    .accounts({
      escrow: params.escrowId,
      job: params.jobId,
      proposal: params.proposalId,
      escrowTokenAccount: params.escrowTA,
      authorityTokenAccount: params.authorityTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const submitWorkInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .submitWork({})
    .accounts({
      job: params.jobId,
      proposal: params.proposalId,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

export const acceptWorkInstr = (
  connection: Connection,
  wallet: Wallet,
  params: {
    jobId: PublicKey
    proposalId: PublicKey
    escrowId: PublicKey
    escrowTA: PublicKey
    proposerTA: PublicKey
  }
): Promise<TransactionInstruction> => {
  const provider = new AnchorProvider(connection, wallet, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )
  return neoProgram.methods
    .acceptWork({})
    .accounts({
      escrow: params.escrowId,
      escrowTokenAccount: params.escrowTA,
      proposal: params.proposalId,
      job: params.jobId,
      proposerTokenAccount: params.proposerTA,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()
}

import { Connection, PublicKey } from '@solana/web3.js'
import {
  AnchorProvider,
  BorshAccountsCoder,
  Program,
} from '@project-serum/anchor'
import {
  AccountData,
  CREATOR_OFFSET,
  JobData,
  NEO_CONTRACT_PROGRAM_ADDRESS,
  NEO_IDL,
  NEO_PROGRAM,
  PlatformData,
  ProposalData,
  PROPOSAL_JOB_OFFSET,
  UserData,
} from './constants'
import { findPlatformId, findUserId } from './pdas'

export const getPlatformData = async (
  connection: Connection
): Promise<AccountData<PlatformData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const [platformId] = await findPlatformId()
  const parsed = await neoProgram.account.platform.fetch(platformId)
  return {
    parsed,
    pubkey: platformId,
  }
}

export const getUserData = async (
  connection: Connection,
  address: PublicKey
): Promise<AccountData<UserData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const [userId] = await findUserId(address)
  const parsed = await neoProgram.account.user.fetch(userId)
  return {
    parsed,
    pubkey: address,
  }
}

export const getJobData = async (
  connection: Connection,
  jobId: PublicKey
): Promise<AccountData<JobData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const parsed = await neoProgram.account.job.fetch(jobId)
  return {
    parsed,
    pubkey: jobId,
  }
}

export const getAvailableJobs = async (
  connection: Connection
): Promise<AccountData<JobData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    NEO_CONTRACT_PROGRAM_ADDRESS
  )

  const jobDatas: AccountData<JobData>[] = []
  const coder = new BorshAccountsCoder(NEO_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: JobData = coder.decode('job', account.account.data)
      if (jobData) {
        jobDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return jobDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getCreatedJobsForUser = async (
  connection: Connection,
  user: PublicKey
): Promise<AccountData<JobData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    NEO_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [{ memcmp: { offset: CREATOR_OFFSET, bytes: user.toBase58() } }],
    }
  )

  const jobDatas: AccountData<JobData>[] = []
  const coder = new BorshAccountsCoder(NEO_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: JobData = coder.decode('job', account.account.data)
      if (jobData) {
        jobDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return jobDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getProposalData = async (
  connection: Connection,
  proposalId: PublicKey
): Promise<AccountData<ProposalData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new AnchorProvider(connection, null, {})
  const neoProgram = new Program<NEO_PROGRAM>(
    NEO_IDL,
    NEO_CONTRACT_PROGRAM_ADDRESS,
    provider
  )

  const parsed = await neoProgram.account.proposal.fetch(proposalId)
  return {
    parsed,
    pubkey: proposalId,
  }
}

export const getSubmittedProposalsForJob = async (
  connection: Connection,
  job: PublicKey
): Promise<AccountData<ProposalData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    NEO_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [
        { memcmp: { offset: PROPOSAL_JOB_OFFSET, bytes: job.toBase58() } },
      ],
    }
  )

  const proposalDatas: AccountData<ProposalData>[] = []
  const coder = new BorshAccountsCoder(NEO_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: ProposalData = coder.decode(
        'proposal',
        account.account.data
      )
      if (jobData) {
        proposalDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return proposalDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

export const getSubmittedProposalsForUser = async (
  connection: Connection,
  user: PublicKey
): Promise<AccountData<ProposalData>[]> => {
  const programAccounts = await connection.getProgramAccounts(
    NEO_CONTRACT_PROGRAM_ADDRESS,
    {
      filters: [{ memcmp: { offset: CREATOR_OFFSET, bytes: user.toBase58() } }],
    }
  )

  const proposalDatas: AccountData<ProposalData>[] = []
  const coder = new BorshAccountsCoder(NEO_IDL)
  programAccounts.forEach((account) => {
    try {
      const jobData: ProposalData = coder.decode(
        'proposal',
        account.account.data
      )
      if (jobData) {
        proposalDatas.push({
          ...account,
          parsed: jobData,
        })
      }
    } catch (e) {
      // console.log(`Failed to decode data`);
    }
  })
  return proposalDatas.sort((a, b) =>
    a.pubkey.toBase58().localeCompare(b.pubkey.toBase58())
  )
}

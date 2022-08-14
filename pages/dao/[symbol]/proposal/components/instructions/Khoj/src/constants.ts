import type { AnchorTypes } from '@saberhq/anchor-contrib'
import { PublicKey } from '@solana/web3.js'
import * as NEO_CONTRACT_TYPES from './idl/neo_contract'

export const NEO_CONTRACT_PROGRAM_ADDRESS = new PublicKey(
  '9A65SzZCc7jpXpjnSLh2grtTsU95zno5MbjHXHXBu64X'
)

export const NEO_OWNER = new PublicKey(
  'E1LMZ2rzvqh1dhDzUTDTn5Snk8p4wt9fc5rPA7M6ev2V'
)

export type NEO_PROGRAM = NEO_CONTRACT_TYPES.NeoContract

export const NEO_IDL = NEO_CONTRACT_TYPES.IDL

export type NeoTypes = AnchorTypes<NEO_PROGRAM>

export const PLATFORM_SEED = 'platform'
export const USER_SEED = 'user'
export const STAKE_SEED = 'stake'
export const JOB_SEED = 'job'
export const PROPOSAL_SEED = 'proposal'
export const ESCROW_SEED = 'escrow'

export const CREATOR_OFFSET = 9
export const PROPOSAL_JOB_OFFSET = 41

type Accounts = NeoTypes['Accounts']

export type PlatformData = Accounts['platform']
export type UserData = Accounts['user']
export type JobData = Accounts['job']
export type ProposalData = Accounts['proposal']
export type EscrowData = Accounts['escrow']

export type AccountData<T> = {
  pubkey: PublicKey
  parsed: T
}

export type AccountFn<T> = () => Promise<AccountData<T>>

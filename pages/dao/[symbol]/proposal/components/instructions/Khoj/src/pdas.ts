import { BN, utils } from '@project-serum/anchor'
import * as web3 from '@solana/web3.js'
import {
  ESCROW_SEED,
  JOB_SEED,
  NEO_CONTRACT_PROGRAM_ADDRESS,
  NEO_OWNER,
  PLATFORM_SEED,
  PROPOSAL_SEED,
  STAKE_SEED,
  USER_SEED,
} from './constants'

export const findPlatformId = async (): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode(PLATFORM_SEED),
      new web3.PublicKey(NEO_OWNER).toBuffer(),
    ],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findUserId = async (
  address: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(USER_SEED), address.toBuffer()],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findStakeId = async (
  address: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(STAKE_SEED), address.toBuffer()],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findJobId = async (
  userId: web3.PublicKey,
  id: BN
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode(JOB_SEED),
      userId.toBuffer(),
      id.toArrayLike(Buffer, 'le', 8),
    ],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findProposalId = async (
  jobId: web3.PublicKey,
  user: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(PROPOSAL_SEED), jobId.toBuffer(), user.toBuffer()],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

export const findEscrowId = async (
  jobId: web3.PublicKey
): Promise<[web3.PublicKey, number]> => {
  return web3.PublicKey.findProgramAddress(
    [utils.bytes.utf8.encode(ESCROW_SEED), jobId.toBuffer()],
    NEO_CONTRACT_PROGRAM_ADDRESS
  )
}

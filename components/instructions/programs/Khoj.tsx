import {
  AnchorProvider,
  BorshInstructionCoder,
  Program,
} from '@project-serum/anchor'
import { Connection, Keypair } from '@solana/web3.js'
import {
  NEO_CONTRACT_PROGRAM_ADDRESS,
  NEO_IDL,
  NEO_PROGRAM,
} from '@khoj-protocol/sdk/dist/cjs/constants'

export const KHOJ_INSTRUCTIONS = {
  [NEO_CONTRACT_PROGRAM_ADDRESS.toBase58()]: {
    45: {
      name: 'Khoj: Create Job',
      accounts: [{ name: 'Job' }],
      getDataUI: async (connection: Connection, data: Uint8Array) => {
        try {
          const program = new Program<NEO_PROGRAM>(
            NEO_IDL,
            NEO_CONTRACT_PROGRAM_ADDRESS,
            new AnchorProvider(null as any, Keypair.generate() as any, {})
          )
          const decodedInstructionData = new BorshInstructionCoder(
            program.idl
          ).decode(Buffer.from(data))?.data as any
          return (
            <div>
              <div>Title: {decodedInstructionData.ix.title}</div>
              <div>Price: {decodedInstructionData.ix.price.toNumber()}</div>
            </div>
          )
        } catch (e) {
          console.log(e)
          return <div>{JSON.stringify(data)}</div>
        }
      },
    },
  },
}

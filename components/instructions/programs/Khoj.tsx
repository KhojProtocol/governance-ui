import {
  AnchorProvider,
  BorshInstructionCoder,
  Program,
} from '@project-serum/anchor'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import {
  NEO_CONTRACT_PROGRAM_ADDRESS,
  NEO_IDL,
  NEO_PROGRAM,
} from '@khoj-protocol/sdk/dist/cjs/constants'
import { getSubmittedProposalsForJob } from '@khoj-protocol/sdk/dist/cjs/accounts'
import { AccountMetaData } from '@solana/spl-governance'

export const KHOJ_INSTRUCTIONS = {
  [NEO_CONTRACT_PROGRAM_ADDRESS.toBase58()]: {
    45: {
      name: 'Khoj: Create Job',
      accounts: [{ name: 'Job' }],
      getDataUI: async (
        connection: Connection,
        data: Uint8Array,
        accounts: AccountMetaData[]
      ) => {
        try {
          const program = new Program<NEO_PROGRAM>(
            NEO_IDL,
            NEO_CONTRACT_PROGRAM_ADDRESS,
            new AnchorProvider(null as any, Keypair.generate() as any, {})
          )
          const decodedInstructionData = new BorshInstructionCoder(
            program.idl
          ).decode(Buffer.from(data))?.data as any

          const proposalDatas = await getSubmittedProposalsForJob(
            connection,
            new PublicKey(accounts[0].pubkey)
          )
          const proposalValues = await Promise.all(
            proposalDatas.map(async (pD) => {
              let jsonData: any = {}
              try {
                jsonData = await (
                  await fetch(`https://arweave.net/${pD.parsed.uri}`)
                ).json()
              } catch (error) {}
              return {
                data: pD,
                name: jsonData['name'] || '',
                description: jsonData['description'] || '',
                userData: undefined,
                metadata: undefined,
              }
            })
          )

          return (
            <div>
              <div>Title: {decodedInstructionData.ix.title}</div>
              <div>Price: {decodedInstructionData.ix.price.toNumber()}</div>
              {proposalValues.map((proposal, index) => (
                <div>
                  <br />
                  <hr />
                  <br />
                  <div>Title: {proposal.name}</div>
                  <div>Description: {proposal.description}</div>
                  <div>Price: {proposal.data.parsed.price.toNumber()}</div>
                </div>
              ))}
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

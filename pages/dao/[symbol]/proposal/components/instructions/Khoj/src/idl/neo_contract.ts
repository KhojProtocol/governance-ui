export type NeoContract = {
  version: '0.1.0'
  name: 'neo_contract'
  instructions: [
    {
      name: 'initPlatform'
      accounts: [
        {
          name: 'platform'
          isMut: true
          isSigner: false
        },
        {
          name: 'mint'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerMintTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'InitPlatformIx'
          }
        }
      ]
    },
    {
      name: 'initUser'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'InitUserIx'
          }
        }
      ]
    },
    {
      name: 'updateUser'
      accounts: [
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'UpdateUserIx'
          }
        }
      ]
    },
    {
      name: 'stake'
      accounts: [
        {
          name: 'platform'
          isMut: true
          isSigner: false
        },
        {
          name: 'stake'
          isMut: true
          isSigner: false
        },
        {
          name: 'stakeMintTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerMintTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'StakeIx'
          }
        }
      ]
    },
    {
      name: 'unstake'
      accounts: [
        {
          name: 'platform'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'stake'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerMintTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'stakeMintTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'UnstakeIx'
          }
        }
      ]
    },
    {
      name: 'initJob'
      accounts: [
        {
          name: 'job'
          isMut: true
          isSigner: false
        },
        {
          name: 'user'
          isMut: true
          isSigner: false
        },
        {
          name: 'priceMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'creator'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'InitJobIx'
          }
        }
      ]
    },
    {
      name: 'initProposal'
      accounts: [
        {
          name: 'proposal'
          isMut: true
          isSigner: false
        },
        {
          name: 'job'
          isMut: true
          isSigner: false
        },
        {
          name: 'proposer'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'InitProposalIx'
          }
        }
      ]
    },
    {
      name: 'acceptProposal'
      accounts: [
        {
          name: 'escrow'
          isMut: true
          isSigner: false
        },
        {
          name: 'escrowTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'proposal'
          isMut: true
          isSigner: false
        },
        {
          name: 'job'
          isMut: true
          isSigner: false
        },
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'authorityTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'AcceptProposalIx'
          }
        }
      ]
    },
    {
      name: 'submitWork'
      accounts: [
        {
          name: 'proposal'
          isMut: true
          isSigner: false
        },
        {
          name: 'job'
          isMut: true
          isSigner: false
        },
        {
          name: 'proposer'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'SubmitWorkIx'
          }
        }
      ]
    },
    {
      name: 'acceptWork'
      accounts: [
        {
          name: 'escrow'
          isMut: true
          isSigner: false
        },
        {
          name: 'escrowTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'proposal'
          isMut: true
          isSigner: false
        },
        {
          name: 'job'
          isMut: true
          isSigner: false
        },
        {
          name: 'authority'
          isMut: true
          isSigner: true
        },
        {
          name: 'proposerTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'ix'
          type: {
            defined: 'AcceptWorkIx'
          }
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'platform'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'mint'
            type: 'publicKey'
          },
          {
            name: 'mintTokenAccount'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'user'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'address'
            type: 'publicKey'
          },
          {
            name: 'firstName'
            type: 'string'
          },
          {
            name: 'lastName'
            type: 'string'
          },
          {
            name: 'organisation'
            type: 'string'
          },
          {
            name: 'createdJobCount'
            type: 'u64'
          },
          {
            name: 'stakeAmount'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'job'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'creator'
            type: 'publicKey'
          },
          {
            name: 'state'
            type: {
              defined: 'JobState'
            }
          },
          {
            name: 'title'
            type: 'string'
          },
          {
            name: 'uri'
            type: 'string'
          },
          {
            name: 'price'
            type: 'u64'
          },
          {
            name: 'priceMint'
            type: 'publicKey'
          },
          {
            name: 'jobType'
            type: 'u8'
          },
          {
            name: 'proposalCount'
            type: 'u64'
          },
          {
            name: 'acceptedProposal'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'proposal'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'proposer'
            type: 'publicKey'
          },
          {
            name: 'job'
            type: 'publicKey'
          },
          {
            name: 'state'
            type: {
              defined: 'ProposalState'
            }
          },
          {
            name: 'uri'
            type: 'string'
          },
          {
            name: 'price'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'escrow'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'stake'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'AcceptProposalIx'
      type: {
        kind: 'struct'
        fields: []
      }
    },
    {
      name: 'AcceptWorkIx'
      type: {
        kind: 'struct'
        fields: []
      }
    },
    {
      name: 'InitJobIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'title'
            type: 'string'
          },
          {
            name: 'uri'
            type: 'string'
          },
          {
            name: 'price'
            type: 'u64'
          },
          {
            name: 'jobType'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'InitPlatformIx'
      type: {
        kind: 'struct'
        fields: []
      }
    },
    {
      name: 'InitProposalIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'uri'
            type: 'string'
          },
          {
            name: 'price'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'InitUserIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'firstName'
            type: 'string'
          },
          {
            name: 'lastName'
            type: 'string'
          },
          {
            name: 'organisation'
            type: 'string'
          }
        ]
      }
    },
    {
      name: 'StakeIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'amount'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'SubmitWorkIx'
      type: {
        kind: 'struct'
        fields: []
      }
    },
    {
      name: 'UnstakeIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'amount'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'UpdateUserIx'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'firstName'
            type: {
              option: 'string'
            }
          },
          {
            name: 'lastName'
            type: {
              option: 'string'
            }
          },
          {
            name: 'organisation'
            type: {
              option: 'string'
            }
          }
        ]
      }
    },
    {
      name: 'JobState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'AwaitingProposals'
          },
          {
            name: 'AwaitingSubmission'
          },
          {
            name: 'AwaitingApproval'
          },
          {
            name: 'Done'
          }
        ]
      }
    },
    {
      name: 'ProposalState'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'AwaitingAcceptance'
          },
          {
            name: 'AwaitingSubmission'
          },
          {
            name: 'AwaitingApproval'
          },
          {
            name: 'Done'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'Unauthorized'
      msg: 'Unauthorized'
    },
    {
      code: 6001
      name: 'JobNotAvailable'
      msg: 'Job Not Available'
    },
    {
      code: 6002
      name: 'ProposalNotForThisJob'
      msg: 'Proposal not for this job'
    },
    {
      code: 6003
      name: 'InvalidPriceMint'
      msg: 'Invalid Price Mint'
    },
    {
      code: 6004
      name: 'InvalidTokenAccount'
      msg: 'Invalid Token Account'
    },
    {
      code: 6005
      name: 'InvalidProposal'
      msg: 'Invalid Proposal'
    }
  ]
}

export const IDL: NeoContract = {
  version: '0.1.0',
  name: 'neo_contract',
  instructions: [
    {
      name: 'initPlatform',
      accounts: [
        {
          name: 'platform',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payerMintTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'InitPlatformIx',
          },
        },
      ],
    },
    {
      name: 'initUser',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'InitUserIx',
          },
        },
      ],
    },
    {
      name: 'updateUser',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'UpdateUserIx',
          },
        },
      ],
    },
    {
      name: 'stake',
      accounts: [
        {
          name: 'platform',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeMintTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payerMintTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'StakeIx',
          },
        },
      ],
    },
    {
      name: 'unstake',
      accounts: [
        {
          name: 'platform',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payerMintTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeMintTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'UnstakeIx',
          },
        },
      ],
    },
    {
      name: 'initJob',
      accounts: [
        {
          name: 'job',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'priceMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'InitJobIx',
          },
        },
      ],
    },
    {
      name: 'initProposal',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'job',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'InitProposalIx',
          },
        },
      ],
    },
    {
      name: 'acceptProposal',
      accounts: [
        {
          name: 'escrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'job',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorityTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'AcceptProposalIx',
          },
        },
      ],
    },
    {
      name: 'submitWork',
      accounts: [
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'job',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'SubmitWorkIx',
          },
        },
      ],
    },
    {
      name: 'acceptWork',
      accounts: [
        {
          name: 'escrow',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'escrowTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'proposal',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'job',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'proposerTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'ix',
          type: {
            defined: 'AcceptWorkIx',
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'platform',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'mint',
            type: 'publicKey',
          },
          {
            name: 'mintTokenAccount',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'user',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'address',
            type: 'publicKey',
          },
          {
            name: 'firstName',
            type: 'string',
          },
          {
            name: 'lastName',
            type: 'string',
          },
          {
            name: 'organisation',
            type: 'string',
          },
          {
            name: 'createdJobCount',
            type: 'u64',
          },
          {
            name: 'stakeAmount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'job',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'creator',
            type: 'publicKey',
          },
          {
            name: 'state',
            type: {
              defined: 'JobState',
            },
          },
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'priceMint',
            type: 'publicKey',
          },
          {
            name: 'jobType',
            type: 'u8',
          },
          {
            name: 'proposalCount',
            type: 'u64',
          },
          {
            name: 'acceptedProposal',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'proposal',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'proposer',
            type: 'publicKey',
          },
          {
            name: 'job',
            type: 'publicKey',
          },
          {
            name: 'state',
            type: {
              defined: 'ProposalState',
            },
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'escrow',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'stake',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'AcceptProposalIx',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'AcceptWorkIx',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'InitJobIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
          {
            name: 'jobType',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'InitPlatformIx',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'InitProposalIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'uri',
            type: 'string',
          },
          {
            name: 'price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'InitUserIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'firstName',
            type: 'string',
          },
          {
            name: 'lastName',
            type: 'string',
          },
          {
            name: 'organisation',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'StakeIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'SubmitWorkIx',
      type: {
        kind: 'struct',
        fields: [],
      },
    },
    {
      name: 'UnstakeIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'UpdateUserIx',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'firstName',
            type: {
              option: 'string',
            },
          },
          {
            name: 'lastName',
            type: {
              option: 'string',
            },
          },
          {
            name: 'organisation',
            type: {
              option: 'string',
            },
          },
        ],
      },
    },
    {
      name: 'JobState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'AwaitingProposals',
          },
          {
            name: 'AwaitingSubmission',
          },
          {
            name: 'AwaitingApproval',
          },
          {
            name: 'Done',
          },
        ],
      },
    },
    {
      name: 'ProposalState',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'AwaitingAcceptance',
          },
          {
            name: 'AwaitingSubmission',
          },
          {
            name: 'AwaitingApproval',
          },
          {
            name: 'Done',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'Unauthorized',
      msg: 'Unauthorized',
    },
    {
      code: 6001,
      name: 'JobNotAvailable',
      msg: 'Job Not Available',
    },
    {
      code: 6002,
      name: 'ProposalNotForThisJob',
      msg: 'Proposal not for this job',
    },
    {
      code: 6003,
      name: 'InvalidPriceMint',
      msg: 'Invalid Price Mint',
    },
    {
      code: 6004,
      name: 'InvalidTokenAccount',
      msg: 'Invalid Token Account',
    },
    {
      code: 6005,
      name: 'InvalidProposal',
      msg: 'Invalid Proposal',
    },
  ],
}

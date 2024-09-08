export const CONTRACT_ADDRESS = "0xf0fF2331ABf8d6C166891156b6C7F488a3fE946E";
export const CONTRACT_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint64",
        name: "encryptedredeem",
        type: "tuple",
      },
    ],
    name: "retrieve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEaddress",
        name: "encryptedAddress",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint64",
        name: "encryptedredeem",
        type: "tuple",
      },
    ],
    name: "sendEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct inEuint64",
        name: "encryptedSecret",
        type: "tuple",
      },
    ],
    name: "storewallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

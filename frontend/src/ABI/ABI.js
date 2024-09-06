export const CONTRACT_ADDRESS = "0x563Ac14Bfd04c3a3342D1466830ff4470cDFd76c";
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
    outputs: [],
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

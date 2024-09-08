export const CONTRACT_ADDRESS = "0x4ffC0AB9e5122e8Fdc42cEbb1a241053F19f11d6";
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
    name: "getBackEth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pubkey",
        type: "bytes32",
      },
    ],
    name: "getSealedWallet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
        name: "encryptedredeem",
        type: "tuple",
      },
    ],
    name: "recieve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "pubkey",
        type: "bytes32",
      },
    ],
    name: "sealoutputRedeem",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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

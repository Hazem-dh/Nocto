export const CONTRACT_ADDRESS = "0x2E9c97B62b003Cd47E50FF9D8CE8Ae75c191630A";
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

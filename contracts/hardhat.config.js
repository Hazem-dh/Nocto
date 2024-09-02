require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const keys = process.env.KEY;

const TESTNET_CHAIN_ID = 8008135;
const TESTNET_RPC_URL = "https://api.helium.fhenix.zone";

const testnetConfig = {
  chainId: TESTNET_CHAIN_ID,
  url: TESTNET_RPC_URL,
};

module.exports = {
  solidity: "0.8.25",
  // Optional: defaultNetwork is already being set to "localfhenix" by fhenix-hardhat-plugin
  // defaultNetwork: "localfhenix",
  networks: {
    testnet: testnetConfig,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

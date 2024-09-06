import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient } from "fhenixjs";
import { CONTRACT_ABI } from "../ABI/ABI";

function GenerateStealthAddress() {
  // see if user wants to generate
  //const [privateKey, setPrivateKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState("0x...");
  const [error, setError] = useState("");
  // Function to copy user address to clip board
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Function to copy user address to clip board
  const GenerateAddress = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the user's MetaMask provider
      const provider = new BrowserProvider(window.ethereum);
      const client = new FhenixClient({ provider });

      const signer = await provider.getSigner();
      const accounts = await provider.listAccounts();
      const userWallet = accounts[0].address;
      // Using random Number for now , might change to use input later
      const min = 100000000;
      const max = 9223372036854775807;
      const rand = min + Math.random() * (max - min);

      const concatenatedInput = rand + userWallet;

      // Hash the concatenated string
      const hash = ethers.keccak256(ethers.toUtf8Bytes(concatenatedInput));
      // Sign the hash using MetaMask
      const signature = await signer.signMessage(hash);
      // Use the first 32 bytes of the signature to create a new wallet
      const signatureHash = ethers.keccak256(signature);
      const derivedPrivateKey = signatureHash.slice(0, 66); // Take the first 32 bytes (64 hex chars + '0x')
      const wallet = new ethers.Wallet(derivedPrivateKey);
      setWalletAddress(wallet.address);

      /* global BigInt */
      console.log(Number(rand));
      let encrypted = await client.encrypt_uint64(BigInt(rand));
      // smart contract address , to change later
      const contractAddress = "0xe4e430285D4E1a42DCC3bBa6BF0a4790040C7624";
      const contract = new ethers.Contract(
        contractAddress,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.store(encrypted);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction successful");
      // Set the generated private key and wallet address
      //setPrivateKey(wallet.privateKey);
      // console.log(wallet.privateKey);
      console.log(wallet.address);
    } catch (error) {
      console.log(error);
      setError(
        "An error occurred while generating the key pair: " + error.message
      );
    }

    try {
    } catch (error) {
      console.error("Error executing function:", error);
    }
  };

  return (
    <div className="  flex flex-col items-center justify-center w-1/3 bg-white text-gray-800 p-6 rounded-lg shadow-black  drop-shadow-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Generate a stealth Address</h2>
      <div className="flex w-full flex-row">
        <div className="w-3/4 ml-7 relative">
          <input
            id="wallet-address-input"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={walletAddress}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
          >
            {!isCopied ? (
              <span id="default-icon">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              </span>
            ) : (
              <span id="success-icon">
                <svg
                  className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
        <button
          className="flex items-center justify-center ml-12 px-8  bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={(e) => {
            GenerateAddress(e);
          }}
        >
          Generate
        </button>
      </div>
      {/*       <button
        className="flex items-center justify-center mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={(e) => {
          onButtonclick(e);
        }}
      >
        Save
      </button> */}
    </div>
  );
}

export default GenerateStealthAddress;

import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, getPermit } from "fhenixjs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../ABI/ABI";

function RetrieveTokens() {
  const [redeem, setRedeem] = useState("");
  const [disabled, Setdisabled] = useState(true);
  const [error, setError] = useState("");
  const [success, SetSuccess] = useState("");
  function isValidReddem(str) {
    // Regular expression to check if the string contains exactly 12 digits
    const regex = /^\d{12}$/;
    return regex.test(str);
  }

  useEffect(() => {
    console.log(redeem);
    if (isValidReddem(redeem)) {
      Setdisabled(false);
    } else {
      Setdisabled(true);
    }
  }, [redeem]);

  const RetrieveHandle = async (e) => {
    try {
      // Get the user's MetaMask provider
      const provider = new BrowserProvider(window.ethereum);
      const client = new FhenixClient({ provider });

      const signer = await provider.getSigner();

      /* global BigInt */
      let encrypted_redeem_code = await client.encrypt_uint64(BigInt(redeem));

      // smart contract address , to change later
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.recieve(encrypted_redeem_code);
      const result = await tx.wait(); // Wait for the transaction to be mined
      console.log(tx);
      console.log(result);
      SetSuccess("Sucess Message");
    } catch (error) {
      setError("An error occurred while generating the key pair");
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
      <h2 className="text-xl font-semibold mb-4"> Retrieve ETH</h2>
      <div className="flex w-full flex-row mb-2">
        <div className="w-3/4  relative">
          <input
            id="wallet-address-input"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={redeem}
            placeholder="Redeem code"
            onChange={(e) => {
              setRedeem(e.target.value);
            }}
          />
        </div>
        <button
          className={`flex items-center justify-center ml-10 py-2 px-10 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
            disabled
              ? "bg-blue-300 cursor-not-allowed opacity-50"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
          onClick={(e) => {
            RetrieveHandle(e);
          }}
          disabled={disabled}
        >
          Retrieve
        </button>
      </div>
    </div>
  );
}

export default RetrieveTokens;

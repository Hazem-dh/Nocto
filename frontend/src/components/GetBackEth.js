import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, getPermit } from "fhenixjs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../ABI/ABI";

function GetBackEth() {
  const [redeem, setRedeem] = useState("");
  const [error, setError] = useState("");
  const [success, SetSuccess] = useState("");

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
        <div className="w-3/4 py-2   relative">
          <p>get back your eth if no one pickd it</p>
        </div>
        <button
          className={`flex items-center justify-center ml-10 py-2 px-5 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${"bg-blue-600 hover:bg-blue-500"}`}
          onClick={(e) => {
            RetrieveHandle(e);
          }}
        >
          Get back eth
        </button>
      </div>
    </div>
  );
}

export default GetBackEth;

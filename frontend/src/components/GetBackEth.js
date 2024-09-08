import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient } from "fhenixjs";
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
      console.log(redeem);
      /* global BigInt */
      let encrypted_redeem_code = await client.encrypt_uint64(BigInt(redeem));

      // smart contract address , to change later
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.getBackEth(encrypted_redeem_code);
      await tx.wait(); // Wait for the transaction to be mined

      SetSuccess("You ETH is sent back to you");
    } catch (error) {
      setError("An error occurred while getting back eth");
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-7/12 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
      <h2 className="text-xl font-semibold mb-4"> Get back your eth</h2>
      <div className=" pb-3   relative">
        <p>
          {" "}
          In case the reciever didn't retrieve eth you can get it back after
          <b> 1 week</b>
        </p>
      </div>
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
          className={`flex items-center justify-center ml-10 py-2 px-8 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${"bg-blue-600 hover:bg-blue-500"}`}
          onClick={(e) => {
            RetrieveHandle(e);
          }}
        >
          Get back eth
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-shadow-8 font-bold ">{error}</div>
      )}
      {success && (
        <div className="text-green-500 text-shadow-8 font-bold ">{success}</div>
      )}
    </div>
  );
}

export default GetBackEth;

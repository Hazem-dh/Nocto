import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, getPermit } from "fhenixjs";
import { CONTRACT_ABI } from "../ABI/ABI";

function RetrieveTokens() {
  const [walletAddress, setWalletAddress] = useState("");
  const [disabled, Setdisabled] = useState(true);

  const SendHandle = (e) => {};

  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
      <h2 className="text-xl font-semibold mb-4"> Retrieve ETH</h2>
      <div className="flex w-full flex-row mb-2">
        <div className="w-3/4  relative">
          <input
            id="wallet-address-input"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={walletAddress}
            placeholder="Redeem code"
            onChange={(e) => {
              setWalletAddress(e.value);
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
            SendHandle(e);
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

/*   const [decrypted, setDecrypted] = useState("");

  const onButtonclick = async (e) => {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const client = new FhenixClient({ provider });
    const signer = await provider.getSigner();
    const contractAddress = "0x563Ac14Bfd04c3a3342D1466830ff4470cDFd76c";
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);
    const permit = await getPermit(contractAddress, provider);

    client.storePermit(permit);

    const permission = client.extractPermitPermission(permit);

    try {
      const response = await contract.retrieve(permission);
      console.log(response);
      const plaintext = client.unseal(contractAddress, response);
      console.log(Number(plaintext));
      setDecrypted(Number(plaintext));
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-1/3 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Retrieve</h2>

      <button
        className="flex items-center justify-center mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={(e) => {
          onButtonclick(e);
        }}
      >
        decrypt
      </button>
      {decrypted}
    </div> */

import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, getPermit } from "fhenixjs";
import { CONTRACT_ABI } from "../ABI/ABI";

function RetrieveTokens() {
  const [decrypted, setDecrypted] = useState("");

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
    </div>
  );
}

export default RetrieveTokens;

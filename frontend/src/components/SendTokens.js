import React, { useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient } from "fhenixjs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../ABI/ABI";

function SendTokens() {
  const [walletAddress, setWalletAddress] = useState("");
  const [disabled, Setdisabled] = useState(true);
  //TODO : Set erorr and success message
  const [error, setError] = useState("");
  const [success, SetSuccess] = useState("");
  const [redeem, SetRedeem] = useState("");

  useEffect(() => {
    console.log(walletAddress);
    if (isValidEthereumAddress(walletAddress)) {
      Setdisabled(false);
    } else {
      Setdisabled(true);
    }
  }, [walletAddress]);

  const isValidEthereumAddress = (address) => {
    const re = /^0x[a-fA-F0-9]{40}$/;
    return re.test(address);
  };

  const generateSecureRedeemCode = (length = 12) => {
    const charset = "0123456789"; // Restricting to numeric characters only
    let code = "";

    // Using crypto.getRandomValues for secure random number generation
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charset.length;
      code += charset[randomIndex];
    }

    return code;
  };

  const SendHandle = async (e) => {
    try {
      // Get the user's MetaMask provider
      const provider = new BrowserProvider(window.ethereum);
      const client = new FhenixClient({ provider });

      const signer = await provider.getSigner();

      /* global BigInt */
      let encryptedAddress = await client.encrypt_address(walletAddress);
      let redeem_code = generateSecureRedeemCode();

      let encrypted_redeem_code = await client.encrypt_uint64(
        BigInt(redeem_code)
      );
      console.log(encrypted_redeem_code);

      // smart contract address , to change later
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.sendEth(
        encryptedAddress,
        encrypted_redeem_code,
        {
          value: ethers.parseEther("0.1"), // Convert 0.1 ETH to Wei
        }
      );
      await tx.wait(); // Wait for theEtransat to be mined
      SetRedeem(redeem_code);
      console.log(redeem_code);
    } catch (error) {
      setError("An error occurred while generating the key pair");
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Send ETH</h2>
      <div className="flex w-full flex-row mb-2">
        <div className="w-3/4  relative">
          <input
            id="wallet-address-input"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={walletAddress}
            placeholder="0x.."
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
          />
        </div>
        <button
          className={`flex items-center justify-center ml-14 py-2 px-10 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
            disabled
              ? "bg-blue-300 cursor-not-allowed opacity-50"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
          onClick={(e) => {
            SendHandle(e);
          }}
          disabled={disabled}
        >
          Send
        </button>
      </div>
      {redeem && (
        <div className="text-green-500 text-shadow-8 font-bold ">{redeem}</div>
      )}
    </div>
  );
}

export default SendTokens;

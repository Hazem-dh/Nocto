import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";

function ConnectWallet() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");

  const connectWallet = async () => {
    console.log("sddd");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      console.log(accounts);
      const network = await provider.getNetwork();
      console.log(network);
      setNetwork(network);
      setError(null);
    } catch (error) {
      setError("Connection failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="absolute top-5 right-5 flex items-center space-x-4">
      {network && (
        <div className="text-white font-semibold">
          {network.name.charAt(0).toUpperCase() + network.name.slice(1)} Network
        </div>
      )}
      {account ? (
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none font-semibold">
          {account.slice(0, 6)}...{account.slice(-4)}
        </button>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none font-semibold"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default ConnectWallet;

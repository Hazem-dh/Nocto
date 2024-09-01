import React, { useState } from "react";
import { ethers } from "ethers";

function ConnectWallet({ isConnected }) {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");

  const connectWallet = async () => {
    console.log("sddd");
    console.log(isConnected);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      console.log(accounts);
      const network = await provider.getNetwork();
      console.log(network);
      isConnected(true);
      setNetwork(network);
      setError(null);
    } catch (error) {
      isConnected(false);
      setError("Connection failed. Please try again.");
      console.error(error);
    }
  };
  const Disconnect = async () => {
    setAccount(null);
    setNetwork(null);
    setError(null);
  };

  return (
    <div className="absolute top-5 right-5 flex items-center space-x-4">
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {account ? (
        <>
          <div className="text-white font-semibold">
            {/*  {network.name.charAt(0).toUpperCase() + network.name.slice(1)}{" "} */}
            {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <button
            onClick={Disconnect}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none font-semibold"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none font-semibold"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ConnectWallet({ isConnected }) {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const network = await provider.getNetwork();
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

  useEffect(() => {
    if (window.ethereum) {
      // Listen for account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          console.log("Account disconnected");
          isConnected(false);
          setAccount(null); // Handle disconnection
        } else {
          console.log("Account changed:", accounts[0]);
          setAccount(accounts[0]); // Handle account change
        }
      };

      // Listen for disconnection
      const handleDisconnect = (error) => {
        console.log("Disconnected from the wallet:", error);
        setAccount(null);
        setNetwork(null);
        setError(null); // Handle disconnection
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("disconnect", handleDisconnect);

      // Cleanup event listeners on component unmount
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("disconnect", handleDisconnect);
      };
    }
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div className="absolute top-5 right-5 flex items-center space-x-4">
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {account ? (
        <>
          <button
            //onClick={Disconnect}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none font-semibold"
          >
            {account.slice(0, 6)}...{account.slice(-4)}
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

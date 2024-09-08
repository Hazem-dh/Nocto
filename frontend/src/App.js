import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ConnectWallet from "./components/ConnectWallet";
import SendTokens from "./components/SendTokens";
import RetrieveTokens from "./components/RetrieveTokens";
import GenerateStealthAddress from "./components/GenerateStealthAddress";
import logo from "./assets/logo.png";
import WalletGif from "./components/WalletGif";
import Ripple from "./components/Ripple";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      // Check if window.ethereum is available (MetaMask)
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          setIsWalletConnected(true);
          console.log(accounts[0]);
        } else {
          setIsWalletConnected(false);
        }
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const handleWalletConnect = (connected) => {
    setIsWalletConnected(connected);
  };

  return (
    <>
      <div className="relative h-screen bg-gradient-to-r from-indigo-900 to-sky-400 ">
        {/* LOGO */}
        <div className="absolute top-5 left-5">
          <img src={logo} alt="Logo" className="h-32" />
        </div>

        <ConnectWallet isConnected={handleWalletConnect} />
        <div className="flex flex-row min-h-screen ">
          <div className="flex flex-col items-center justify-center w-1/2 p-10 space-y-6 text-white">
            <h1 className="text-4xl font-bold">Welcome to Nocto</h1>
            <p className="text-xl">
              Nocto is your gateway to private, secure, and anonymous
              transactions. Leveraging FHE (Fully Homomorphic Encryption), Nocto
              allows you to create a stealth wallet, send ETH anonymously, and
              retrieve it securely using a unique redeem code.
            </p>
            <p className="text-lg">Experience next-level privacy with Nocto.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-3/4  space-y-6">
            {isWalletConnected ? (
              <>
                {" "}
                {/* Same as */}
                <GenerateStealthAddress />
                <SendTokens></SendTokens>
                <RetrieveTokens></RetrieveTokens>
              </>
            ) : (
              <>
                <div className="relative flex h-[1000px] w-full flex-col items-center justify-center    ">
                  <WalletGif />
                  <p className="z-10  text-center text-3xl font-medium tracking-tighter text-white">
                    Connect wallet
                  </p>
                  <Ripple />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default App;

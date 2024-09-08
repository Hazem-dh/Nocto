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

        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
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
                <p className="z-10  text-center text-xl font-medium tracking-tighter text-white">
                  Connect wallet
                </p>
                <Ripple />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default App;

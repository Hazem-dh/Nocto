import "./App.css";
import React, { useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, EncryptedType, EncryptedUint8 } from "fhenixjs";
import ConnectWallet from "./components/ConnectWallet";
import SendTokens from "./components/SendTokens";
import RetrieveTokens from "./components/RetrieveTokens";
import GenerateStealthAddress from "./components/GenerateStealthAddress";
import logo from "./assets/logo.png";
function App() {
  return (
    <>
      <div className="relative h-screen bg-gradient-to-r from-indigo-500 to-sky-500 ">
        {/* LOGO */}
        <div className="absolute top-5 left-5">
          <img src={logo} alt="Logo" className="h-32" />
        </div>

        <ConnectWallet />

        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <GenerateStealthAddress />
          <SendTokens></SendTokens>
          <RetrieveTokens></RetrieveTokens>
        </div>
      </div>
    </>
  );
}
export default App;

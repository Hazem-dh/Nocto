import "./App.css";
import React, { useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, EncryptedType, EncryptedUint8 } from "fhenixjs";
import logo from "./assets/logo.png"; // adjust the path as necessary
function App() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [encryption, setEncryption] = useState("Nothing incrypted");

  const onButtonclick = async (e) => {
    e.preventDefault();

    const provider = new BrowserProvider(window.ethereum);

    const client = new FhenixClient({ provider });
    // to encrypt data for a Fhenix contract
    try {
      const resultUint8 = await client.encrypt_uint8(20);
      console.log(resultUint8);
    } catch (error) {
      console.log(error);
      console.log("connect your wallet");
    }
  };

  const onTextChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

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
    <>
      <div
        style={{ backgroundColor: "#282c34" }}
        className="relative h-screen "
      >
        <div className="absolute top-5 left-5">
          <img src={logo} alt="Logo" className="h-32" />
        </div>
        <div className="absolute top-5 right-5 flex items-center space-x-4">
          {network && (
            <div className="text-white font-semibold">
              {network.name.charAt(0).toUpperCase() + network.name.slice(1)}{" "}
              Network
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

        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <div className=" flex flex-col items-center justify-center w-80 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Card 1</h2>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onTextChange(e);
              }}
              placeholder={"enter value"}
              className="px- py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            ></input>
            <button
              className="flex items-center justify-center mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={(e) => {
                onButtonclick(e);
              }}
            >
              encrypt
            </button>

            <br></br>
            <p> {encryption}</p>
          </div>
          <div className="w-80 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Card 2</h2>
            <p>This is the content of the second card.</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;

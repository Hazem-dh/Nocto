import React, { useState, useEffect } from "react";

function SendTokens() {
  const [walletAddress, setWalletAddress] = useState("");
  const [disabled, Setdisabled] = useState(true);

  useEffect(() => {}, [walletAddress]);

  const SendHandle = (e) => {};

  return (
    <div className="flex flex-col items-center justify-center w-1/3 bg-white text-gray-800 p-6 rounded-lg shadow-black shadow-lg">
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
              setWalletAddress(e.value);
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
    </div>
  );
}

export default SendTokens;

import React from "react";
import walletGif from "../assets/wallet.gif"; // Adjust the path based on your file structure

const WalletGif = () => {
  return (
    <div className="flex justify-center items-center ">
      <img src={walletGif} alt="Wallet Animation" className="w-1/2 h-auto" />
    </div>
  );
};

export default WalletGif;

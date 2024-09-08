import React, { useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { FhenixClient, getPermit } from "fhenixjs";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../ABI/ABI";

function GenerateStealthAddress() {
  const [isCopied, setIsCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState("0x...");
  const [Pk, setPk] = useState("");
  const [store, setStore] = useState(false);
  const [exportPk, setExportPk] = useState(false);
  const [disabled, Setdisabled] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (store == false && exportPk == false) {
      Setdisabled(true);
    } else {
      Setdisabled(false);
    }
  }, [store, exportPk]);

  const handleStoreChange = (event) => {
    setStore(event.target.checked);
    console.log(store);
  };
  const handlePkChange = (event) => {
    setExportPk(event.target.checked);
  };

  // Function to copy user address to clip board
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Function to copy user address to clip board
  const GenerateAddress = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the user's MetaMask provider
      const provider = new BrowserProvider(window.ethereum);
      const client = new FhenixClient({ provider });

      const signer = await provider.getSigner();
      const accounts = await provider.listAccounts();
      const userWallet = accounts[0].address;
      // Using random Number for now , This is just for POC
      const min = 100000000;
      const max = 9223372036854775807;
      const rand = min + Math.random() * (max - min);
      const concatenatedInput = rand + userWallet;
      // Hash the concatenated string
      const hash = ethers.keccak256(ethers.toUtf8Bytes(concatenatedInput));
      // Sign the hash using MetaMask
      const signature = await signer.signMessage(hash);
      // Use the first 32 bytes of the signature to create a new wallet
      const signatureHash = ethers.keccak256(signature);
      const derivedPrivateKey = signatureHash.slice(0, 66); // Take the first 32 bytes (64 hex chars + '0x')
      const wallet = new ethers.Wallet(derivedPrivateKey);
      setWalletAddress(wallet.address);
      //store wallet address if needed
      if (store) {
        /* global BigInt */
        let encrypted = await client.encrypt_uint64(BigInt(rand));
        // smart contract address , to change later
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        const tx = await contract.storewallet(encrypted);
        await tx.wait(); // Wait for theEtransat to be mined
      }

      // Show private key
      if (exportPk) {
        setPk("Private key : " + wallet.privateKey);
      }
      console.log(Pk);
    } catch (error) {
      console.log(error);
      setError("An error occurred while generating the key pair");
      console.log(error.message);
    }
  };

  const retrieveAddress = async (e) => {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const client = new FhenixClient({ provider });
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const permit = await getPermit(CONTRACT_ADDRESS, provider);

    client.storePermit(permit);

    const permission = client.extractPermitPermission(permit);

    try {
      const response = await contract.getSealedWallet(permission.publicKey);

      const plaintext = client.unseal(CONTRACT_ADDRESS, response);
      console.log(secret);
      const secret = Number(plaintext);
      const accounts = await provider.listAccounts();
      const userWallet = accounts[0].address;
      // Using random Number for now , might change to use input later
      const concatenatedInput = secret + userWallet;
      // Hash the concatenated string
      const hash = ethers.keccak256(ethers.toUtf8Bytes(concatenatedInput));
      // Sign the hash using MetaMask
      const signature = await signer.signMessage(hash);
      // Use the first 32 bytes of the signature to create a new wallet
      const signatureHash = ethers.keccak256(signature);
      const derivedPrivateKey = signatureHash.slice(0, 66); // Take the first 32 bytes (64 hex chars + '0x')
      const wallet = new ethers.Wallet(derivedPrivateKey);
      setPk("Private key : " + wallet.privateKey);
      setWalletAddress(wallet.address);
    } catch (error) {
      setError("You don't have any private key stored");
    }
  };
  return (
    <div className="  flex flex-col items-center justify-center w-7/12 bg-white text-gray-800 p-6 rounded-lg shadow-black  drop-shadow-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Generate a stealth Address</h2>
      <h4 className="text-l  mb-4">
        Choose wether to store your wallet or export your private key or why not
        both !{" "}
      </h4>
      <div className="flex w-full flex-row mb-2">
        <div className="w-1/2  relative">
          <input
            id="wallet-address-input"
            type="text"
            className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={walletAddress}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
          >
            {!isCopied ? (
              <span id="default-icon">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              </span>
            ) : (
              <span id="success-icon">
                <svg
                  className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>

        <div className="mt-2 ml-6 block min-h-[1.5rem] pl-6">
          <input
            className="relative float-left -ml-6 mr-2 mt-1 h-5 w-5 appearance-none rounded-md border-2 border-solid border-neutral-300 outline-none cursor-pointer transition-all duration-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_10px_transparent] before:content-[''] checked:border-blue-500 checked:bg-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:block checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-2 checked:after:border-l-0 checked:after:border-t-0 checked:after:border-white hover:border-blue-400 hover:before:opacity-[0.1] hover:before:shadow-[0px_0px_0px_10px_rgba(0,0,0,0.1)] focus:shadow-none focus:ring-2 focus:ring-blue-300 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_10px_rgba(0,0,0,0.1)] checked:focus:before:shadow-[0px_0px_0px_10px_rgba(59,113,202,0.4)] disabled:opacity-50 dark:border-neutral-600 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-blue-300 dark:focus:before:shadow-[0px_0px_0px_10px_rgba(255,255,255,0.4)]"
            type="checkbox"
            value={store}
            id="Storewallet"
            onChange={handleStoreChange}
          />
          <label
            className="inline-block  text-neutral-700 hover:cursor-pointer dark:text-neutral-300"
            htmlFor="Storewallet"
          >
            Store wallet
          </label>
        </div>
        <div className="mt-2 ml-6 block min-h-[1.5rem] pl-6">
          <input
            className="relative float-left -ml-6 mr-2 mt-1 h-5 w-5 appearance-none rounded-md border-2 border-solid border-neutral-300 outline-none cursor-pointer transition-all duration-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_10px_transparent] before:content-[''] checked:border-blue-500 checked:bg-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:block checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-2 checked:after:border-l-0 checked:after:border-t-0 checked:after:border-white hover:border-blue-400 hover:before:opacity-[0.1] hover:before:shadow-[0px_0px_0px_10px_rgba(0,0,0,0.1)] focus:shadow-none focus:ring-2 focus:ring-blue-300 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_10px_rgba(0,0,0,0.1)] checked:focus:before:shadow-[0px_0px_0px_10px_rgba(59,113,202,0.4)] disabled:opacity-50 dark:border-neutral-600 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-blue-300 dark:focus:before:shadow-[0px_0px_0px_10px_rgba(255,255,255,0.4)]"
            type="checkbox"
            value={exportPk}
            onChange={handlePkChange}
            id="export"
          />
          <label
            className="inline-block pl-2 text-neutral-700 hover:cursor-pointer dark:text-neutral-300"
            htmlFor="export"
          >
            Export private Key
          </label>
        </div>
      </div>
      {Pk && (
        <div className="text-red-500 text-shadow-8 font-bold mt-2"> {Pk} </div>
      )}
      <button
        className={`flex items-center justify-center mt-5 py-2 px-8 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${
          disabled
            ? "bg-blue-300 cursor-not-allowed opacity-50"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        onClick={(e) => {
          GenerateAddress(e);
        }}
        disabled={disabled}
      >
        Generate
      </button>
      <button
        className={`flex items-center justify-center my-5 py-2 px-8 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${"bg-blue-600 hover:bg-blue-500"}`}
        onClick={(e) => {
          retrieveAddress(e);
        }}
      >
        retrieve Private key
      </button>
      {error && (
        <div className="text-red-500 text-shadow-8 font-bold ">{error}</div>
      )}
    </div>
  );
}

export default GenerateStealthAddress;

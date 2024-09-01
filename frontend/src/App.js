import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import logo from './assets/logo.png'; // adjust the path as necessary
function App() {




  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);
 
/* 
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        checkNetwork();
      });

      window.ethereum.on('chainChanged', () => {
        checkNetwork();
      });

      checkNetwork();
    }
  }, []); */


  const connectWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      console.log(accounts)
        const network = await provider.getNetwork();
        console.log(network)
        setNetwork(network);
        setError(null);
    } catch (error) {
      setError('Connection failed. Please try again.');
      console.error(error);
    }
  };
 


  return (


  <>
 <div style={{ backgroundColor: '#282c34' }}  className="relative h-screen ">
 <div className="absolute top-5 left-5">
          <img src={logo} alt="Logo" className="h-32" />
      </div>
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

      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="w-80 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Card 1</h2>
        <p>This is the content of the first card.</p>
      </div>
      <div className="w-80 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Card 2</h2>
        <p>This is the content of the second card.</p>
      </div>
      <div className="w-80 bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Card 3</h2>
        <p>This is the content of the third card.</p>
      </div>
    </div>
    </div>
   
</>
  );
}
export default App;

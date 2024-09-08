# Nocto

Nocto is a DApp built on Fhenix that enables users to generate stealth addresses and privately send ETH transactions. The platform ensures confidentiality and security by leveraging Fully Homomorphic Encryption (FHE) and standardized transaction amounts.

## Project Structure

- **Frontend**: The frontend of the Nocto project is located in the `frontend` folder.
- **Smart Contracts**: The smart contracts are stored in the `contracts` folder. The deployed contract address and ABI can be found in the `ABI.js` file.

## Getting Started

### Frontend

To launch the frontend application:

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will be running on `http://localhost:3000`.

### Smart Contracts

The smart contracts for Nocto are managed using Hardhat. Follow the steps below to work with the contracts:

1. Install Hardhat and necessary dependencies:

   ```bash
   npm install --save-dev hardhat
   ```

2. Compile the contracts:

   ```bash
   npx hardhat compile
   ```

3. Deploy the contracts to your local blockchain or a testnet:

   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

4. Run tests to ensure everything is functioning correctly:

   ```bash
   npx hardhat test
   ```

### Smart Contract Address

The deployed smart contract address is located in the `ABI.js` file, which also contains the contract's ABI for interaction purposes.

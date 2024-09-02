// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;
import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Stealth {
    euint32 internal encryptedNumber;

    function store(inEuint32 calldata encryptedBalance) public {
        encryptedNumber = FHE.asEuint32(encryptedBalance);
    }

    function retrieve(
        Permission memory signature
    ) public view returns (string memory) {
        // Seal the output for a specific publicKey
        return FHE.sealoutput(encryptedNumber, signature.publicKey);
    }
}

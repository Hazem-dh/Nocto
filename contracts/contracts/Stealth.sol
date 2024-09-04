// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;
import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Stealth {
    mapping(address => euint64) internal safe;
    mapping(bytes32 => eaddress) internal addresses;
    mapping(bytes32 => euint64) internal balanceredeem;

    function storewallet(inEuint64 calldata encryptedSecret) public {
        safe[msg.sender] = FHE.asEuint64(encryptedSecret);
    }

    function sendEth(inEaddress calldata encryptedAddress) public payable {}
    // Logic to return sensitive data

    function retrieve(
        inEaddress calldata encryptedAddress,
        Permission calldata permission
    ) public view onlySender(permission) {}
}

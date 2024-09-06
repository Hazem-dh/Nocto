// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;
import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";

contract Stealth {
    uint constant AMOUNT1 = 0.1 ether;
    mapping(address => euint64) internal safe;
    mapping(uint256 => eaddress) internal redeemers;

    modifier allowedValue() {
        require(msg.value == AMOUNT1, "value not allowed");
        _;
    }
    /**
     * @notice Stores encrypted wallet seeds.
     * @dev This function stores the provided wallet seed for a newly generated stealth wallet
     * @param encryptedSecret the encrypted seed to be stored.
     */
    function storewallet(inEuint64 calldata encryptedSecret) public {
        safe[msg.sender] = FHE.asEuint64(encryptedSecret);
    }

    /**
     * @notice Store Eth in smart contract.
     * @dev function that stores Eth to an encrypted address to be retrieved in the future
     *  and a reddem code is used to point to encryoted redeem address
     * @param encryptedAddress The value to store, must be greater than zero.
     * @param encryptedredeem The value to store, must be greater than zero.
     */
    function sendEth(
        inEaddress calldata encryptedAddress,
        inEuint64 calldata encryptedredeem
    ) public payable allowedValue {
        uint64 redeemcode = FHE.decrypt(FHE.asEuint64(encryptedredeem));
        //Add check if
        redeemers[redeemcode] = FHE.asEaddress(encryptedAddress);
    }

    /**
     * @notice Stores encrypted wallet seeds.
     * @dev a function that sent eth to an address that was sent eth
     * @param encryptedredeem encrypted redeem code.
     */
    function retrieveEth(inEuint64 calldata encryptedredeem) public {
        uint64 redeemcode = FHE.decrypt(FHE.asEuint64(encryptedredeem));
        address redeemer = FHE.decrypt(redeemers[redeemcode]);
        require(msg.sender == redeemer, "No one sent you ETH");
        // this check might be useless
        require(address(this).balance >= AMOUNT1, "Insufficient balance");
        // Send ETH using transfer()
        payable(msg.sender).transfer(AMOUNT1);
        //empty the slot
        redeemers[redeemcode] = FHE.asEaddress(0);
    }
}

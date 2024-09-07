// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;
import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";

contract Stealth {
    // Constant amount of eth
    uint constant AMOUNT1 = 0.1 ether;
    // 1 Week Time
    uint constant WEEK = 604800;

    mapping(address => euint64) internal safe;
    mapping(uint256 => eaddress) internal redeemers;
    mapping(address => bool) internal notRedeemed;
    mapping(address => uint256) internal timeLock;

    /**
     * @dev Modifier to make a function callable only if the sender sents 0.1 eth
     *
     * Requirements:
     * - The caller must send 0.1 eth
     */
    modifier allowedValue() {
        require(msg.value == AMOUNT1, "value not allowed");
        _;
    }

    /**
     * @notice Stores encrypted wallet seeds.
     * @dev This function stores the provided wallet seed for a newly generated wallet
     * @param encryptedSecret The value to store, must be greater than zero.
     */
    function storewallet(inEuint64 calldata encryptedSecret) public {
        safe[msg.sender] = FHE.asEuint64(encryptedSecret);
    }

    /**
     * @notice Stores encrypted wallet seeds.
     * @dev This function stores the provided value in the `storedValue` state variable.
     * It emits a `ValueChanged` event upon successful execution.
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
        notRedeemed[msg.sender] = true;
        timeLock[msg.sender] = block.timestamp;
    }

    /**
     * @notice Stores encrypted wallet seeds.
     * @dev a function that sent eth to an address that was sent eth
     * @param encryptedredeem encrypted redeem code.
     */
    function retrieve(inEuint64 calldata encryptedredeem) public {
        uint64 redeemcode = FHE.decrypt(FHE.asEuint64(encryptedredeem));
        eaddress redeemer = redeemers[redeemcode];
        eaddress sender = FHE.asEaddress(msg.sender);
        FHE.req(FHE.eq(redeemer, sender));
        //require(msg.sender == redeemer, "No one sent you ETH");
        // this check might be useless
        require(address(this).balance >= AMOUNT1, "Insufficient balance");
        // Send ETH using transfer()
        payable(msg.sender).transfer(AMOUNT1);
        //empty the slot
        redeemers[redeemcode] = FHE.asEaddress(0);
        //confirm reception
        notRedeemed[msg.sender] = false;
    }

    /**
     * @notice Eth sender gets back its eth
     * @dev a function to retrieve sent eth after a week in case it's not been recieved to
     *   prevent eth from being locked inside the contract
     */
    function getBackEth() public {
        // Eth should not have been already retrieved by reciever
        require(
            notRedeemed[msg.sender],
            "Reciver has already retrived the sent eth"
        );
        // A minimum of a week should pass before being able to send back eth
        require(
            block.timestamp > timeLock[msg.sender] + WEEK,
            "Reciver has already retrived the sent eth"
        );
        payable(msg.sender).transfer(AMOUNT1);
    }
}

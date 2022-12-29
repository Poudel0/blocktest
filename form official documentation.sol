// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract Coin {
    address public minter;
    mapping (address => uint256) public balances;

    event Sent(address from, address to, uint amount);

    constructor(){
        minter =msg.sender;
    }


function mint (address reciever, uint256 amount) public {
    require(msg.sender == minter);
    balances[reciever] += amount;

}

 error InsufficientBalance(uint requested, uint available);

  
    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender])
            revert InsufficientBalance({
                requested: amount,
                available: balances[msg.sender]
            });

    balances [msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
}
}
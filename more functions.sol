// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;


contract second_storage{
    uint256 public a_num;
    function store(uint256 _a_num) public{
        a_num=_a_num;
    }

    function ret() public view returns(uint256){
        return a_num;
    }
    function add() public  view returns(uint256){
        return a_num+9;
    }
}
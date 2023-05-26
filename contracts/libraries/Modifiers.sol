// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "./Errors.sol";
abstract contract Modifiers {

    modifier NotContract(
        address _contractAddress
    )
    {
        if((msg.sender != tx.origin)) revert NoContract(_contractAddress);
        if(_contractAddress != tx.origin) revert NoContract(_contractAddress);
        if(_contractAddress == address(this)) revert NoContract(_contractAddress);
        if(_contractAddress == address(0)) revert NoContract(_contractAddress);
        uint256 size;
        assembly {
            size := extcodesize(_contractAddress)
        }
        if(size > 0)revert NoContract(_contractAddress);
        _;
    }

    modifier noZero(
        uint256 _value
    )
    {
        require(_value > 0,"NO ZERO : Enter is a valid amount.");
        _;
    }

}
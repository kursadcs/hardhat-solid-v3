// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/// Contract is paused!
    error Paused();

///Invalid Action!
    error InvalidAction();

/// Invalid Address!
    error InvalidAddress();

///Invalid Input Value!
    error InvalidInput();

/// Invalid Price!
    error InvalidPrice();

/// Insufficient Balance
    error InsufficientBalance();

/**
 * @dev Revert with an error when an account being called as an assumed
 *      contract does not have code and returns no data.
 * @param account The account that should contain code.
 */
    error NoContract(address account);

/// Approval Required!
    error ApprovalRequired();

/// Insufficient Allowance!
    error InsufficientAllowance();

/// User Not Expired
    error UserNotExpired();
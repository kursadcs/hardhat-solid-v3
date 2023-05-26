// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { ISolidStateERC20 } from "@solidstate/contracts/token/ERC20/ISolidStateERC20.sol";
import  "@solidstate/contracts/security/reentrancy_guard/ReentrancyGuard.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@solidstate/contracts/access/ownable/OwnableInternal.sol';
import { Modifiers } from "../libraries/Modifiers.sol";
import { incSCParams } from "../libraries/Structs.sol";
import { LibIncSC } from "../libraries/LibIncSC.sol";
import { ItemType } from "../libraries/Enums.sol";
import "../libraries/Errors.sol";

contract incSC is Modifiers, ReentrancyGuard, OwnableInternal{
    using SafeMath for uint256;

}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import { incSCParams,incSC2Params,incSC3Params } from "./Structs.sol";

library LibIncSC{
    bytes32 internal constant STORAGE_SLOT = keccak256('storage.inc.sc.com');

    struct Layout {
        uint256 scCounter;
        //      user    =>       scCounter => params
        mapping(address => mapping(uint256 => incSCParams)) incSCInfo;
        mapping(address => mapping(uint256 => incSC2Params)) incSC2Info;
        mapping(address => mapping(uint256 => incSC3Params)) incSC3Info;
    }

    function layout() internal pure returns (Layout storage l) {
        bytes32 slot = STORAGE_SLOT;
        assembly {
            l.slot := slot
        }
    }
}
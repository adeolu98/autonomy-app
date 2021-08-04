// SPDX-License-Identifier: MIT
//contract used in test.js file only 
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TestToken", "TST") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
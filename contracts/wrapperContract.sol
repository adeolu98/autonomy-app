// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IUniswapV2.sol";
import "./IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


//wrapper contract autonomy bots call when all instances given are true 

contract TradeExecutor is ReentrancyGuard {
    IUniswapV2Router02 public UniswapRouter;
    IERC20 DAI;
    address public WETH;
    address owner;
    bool executed;
    // active, contracts the state of contract, active/inactive
    bool active;
    // time after which call can be executed 
    uint public time;

    event receiveether(uint value, address sender);

    constructor(IERC20 _DAI, address _owner, address _weth, IUniswapV2Router02 _UniswapRouter) {
        DAI = _DAI;
        owner = _owner;
        UniswapRouter = _UniswapRouter;
        WETH = _weth;
        time = block.timestamp + 4 days;
        active = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller not owner");
        _;
    }

    receive() external payable{
        emit receiveether(msg.value, msg.sender);
    }
    
    fallback() external payable {
    
    }
    

    function execute() public nonReentrant {
        require(executed != true, "trade can only be executed once");
        require(active == true, "contract is inactive");
        require(time <= block.timestamp, 'time not elasped, cant execute trade till after');
        
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = address(DAI);
        uint256 amountOutMin = 1;
        
        //approve uniswap router to spend weth 
        IERC20(WETH).approve(address(UniswapRouter), IERC20(WETH).balanceOf(address(this)));

        //swap on uniswap
        UniswapRouter.swapExactTokensForTokens(IERC20(WETH).balanceOf(address(this)), amountOutMin, path, owner, block.timestamp+ 30 minutes);
        //mark trade as executed
        executed = true;
    }
    
    function makeInactive() public onlyOwner {
        active = false;
    }

    function withdrawToken(IERC20 _token, uint amount)public onlyOwner{
        _token.transfer(owner, amount);
    }

    function withdrawETH(uint amount) public onlyOwner{
        payable(owner).transfer(amount);
    }
}

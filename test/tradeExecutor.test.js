const { assert } = require("console");
const { isMainThread } = require("worker_threads");

const TradeExecutor = artifacts.require('TradeExecutor');
const TestToken = artifacts.require('TestToken');

contract('TradeExecutor', function (accounts) {

    const DAI = "0xaD6D458402F60fD3Bd25163575031ACDce07538D";
    const WETH = "0xc778417e063141139fce010982780140aa0cd5ab";
    const UNISWAPRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    before(async () => {
        // deploy the smart contracts in test environment 
        //accounts [0] is the owner 
        TradeExecutorInstance = await TradeExecutor.new(DAI, accounts[0], WETH, UNISWAPRouter);
        TestTokenInstace = await TestToken.new();
        // get smart contract address 
        TradeExecutorAddress = TradeExecutorInstance.address;
        TestTokenAddress = TestTokenInstace.address;
    });

    describe('check that makeInactive() works as intended', async () => {
        it('allows calls from owner only', async () => {
            try {
                await TradeExecutorInstance.makeInactive({ from: accounts[1] });
            } catch (e) {
                assert(e.message.includes('caller not owner'))
            }
        })
        it('allow owner to change state', async () => {
            await TradeExecutorInstance.makeInactive({ from: accounts[0] });
            const active = await TradeExecutorInstance.active();
            assert(active === false, 'contract still active')
        })
    })

    describe('check that withdrawToken() works as intended', async () => {
        it('allows calls from owner only', async () => {
            try {
                await TradeExecutorInstance.withdrawToken(TestTokenAddress, 1, { from: accounts[1] });
            } catch (e) {
                assert(e.message.includes('caller not owner'))
            }

        })

        it('allows token withdrawals', async () => {
            //transfer 1 token to tradeexecutor contract 
            await TestTokenInstace.transfer(TradeExecutorAddress, 1, { from: accounts[0] });
            const TradeExecutorBalance = await TestTokenInstace.balanceOf(TradeExecutorAddress);
            console.log(TradeExecutorBalance.toNumber(), 'tokens is transferred to trade executor')
            assert(TradeExecutorBalance.toNumber() === 1, 'token not transferred to trade executor')

            //withdraw token from tradeExecutor
            await TradeExecutorInstance.withdrawToken(TestTokenAddress, 1, { from: accounts[0] })
            //check new trade executor contract token bal 
            const newTradeExecutorBalance = await TestTokenInstace.balanceOf(TradeExecutorAddress);
            assert(newTradeExecutorBalance.toNumber() === 0, 'tokens not (all) withdrawn')
        })
    })

    describe('checks that withdrawETH works as intended', async () => {
        it('allows calls from owner only', async () => {
            try {
                await TradeExecutorInstance.withdrawETH( 1, { from: accounts[1] });
            } catch (e) {
                assert(e.message.includes('caller not owner'))
            }

        })

        it('should withdraw eth', async () => {
            //transfer eth to tradeExecutor contract 
            await web3.eth.sendTransaction({ to: TradeExecutorAddress, from: accounts[0], value: web3.utils.toWei("0.5", "ether") })
            //check tradeexecutor eth bal
            const TradeExecutorETHBalance = await web3.eth.getBalance(TradeExecutorAddress);
            console.log(web3.utils.fromWei(TradeExecutorETHBalance.toString(), "ether"), 'eth in tradeexecutor contract before withdrawETH() is called');
            //transfer all balance 
            await TradeExecutorInstance.withdrawETH(TradeExecutorETHBalance, { from: accounts[0] })
            const newTradeExecutorETHBalance = await web3.eth.getBalance(TradeExecutorAddress);
            console.log(web3.utils.fromWei(newTradeExecutorETHBalance.toString(), "ether"), 'eth in tradeexecutor contract after withdrawETH() is called');
            assert(newTradeExecutorETHBalance.toString() === "0", 'trade executor contract still has eth')
        })


    })

})
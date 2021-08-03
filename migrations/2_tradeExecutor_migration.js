const TradeExecutor = artifacts.require("TradeExecutor");

// contract addresses on ropsten 
const DAI = "0xaD6D458402F60fD3Bd25163575031ACDce07538D" ;
const WETH = "0xc778417e063141139fce010982780140aa0cd5ab";
const UNISWAPRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const owner = "0x5DB34e5761F52c47C02874E2Ece98586b823e837";

module.exports = function (deployer) {
  deployer.deploy(TradeExecutor, DAI, owner, WETH, UNISWAPRouter )
};
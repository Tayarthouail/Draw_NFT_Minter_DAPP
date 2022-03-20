const SmartContract = artifacts.require("DrawNFT");

module.exports = function (deployer) {
  deployer.deploy(SmartContract);
};

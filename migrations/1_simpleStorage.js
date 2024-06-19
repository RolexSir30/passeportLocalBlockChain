const DigitalPassport = artifacts.require("./DigitalPassport.sol");

module.exports = function (deployer) {
  deployer.deploy(DigitalPassport);
};

const DigitalPassport = artifacts.require("DigitalPassport");

module.exports = function(deployer) {
  deployer.deploy(DigitalPassport);
};

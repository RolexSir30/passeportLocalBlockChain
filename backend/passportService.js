// backend/passportService.js
const web3 = require('./web3');
const DigitalPassport = require('./DigitalPassport.json');

const contractAddress = '0xC6b5db5b307418fBDB3110e301069bf04fc4005C'; // Remplacez par l'adresse de votre contrat déployé
const contract = new web3.eth.Contract(DigitalPassport.abi, contractAddress);

exports.createPassport = (data, callback) => {
  web3.eth.getAccounts((err, accounts) => {
    if (err) {
      console.error('Error fetching accounts:', err);
      return callback(err);
    }
    contract.methods.createPassport(
      data.name,
      data.nationality,
      data.passportNumber,
      data.dateOfBirth,
      data.placeOfBirth,
      data.issueDate,
      data.expirationDate
    ).send({ from: accounts[0] }, (err, result) => {
      if (err) {
        console.error('Error creating passport:', err);
        return callback(err);
      }
      callback(null, result);
    });
  });
};

exports.getPassport = (address, callback) => {
  contract.methods.getPassport(address).call((err, result) => {
    if (err) {
      console.error('Error fetching passport:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

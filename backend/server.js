const express = require('express');
const { Web3 } = require('web3');const cors = require('cors');

const app = express();
const port = 5000;
const web3 = new Web3('http://127.0.0.1:7545'); // URL du serveur Ganache

// Configuration CORS
app.use(cors({
  origin: "http://127.0.0.1:7545"
}));




app.use(express.json());

const fs = require('fs');

// Charger le fichier JSON
const rawdata = fs.readFileSync('DigitalPassport.json');
const contractData = JSON.parse(rawdata);

// Extraire l'ABI
const contractABI = contractData.abi;



const contractAddress = '0x8fA2339A70C5fED7dC1Df6201E7b9ADF891BD3b0'; // Adresse de votre contrat intelligent
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/createPassport', async (req, res) => {
  const { name, nationality, passportNumber, dateOfBirth, placeOfBirth, issueDate, expirationDate } = req.body;
  const accounts = await web3.eth.getAccounts();
  const fromAddress = accounts[1];
  console.log("test")

  try {
    console.log("Data to send:", { name, nationality, passportNumber, dateOfBirth, placeOfBirth, issueDate, expirationDate });
    await contract.methods.createPassport(name, nationality, passportNumber, dateOfBirth, placeOfBirth, issueDate, expirationDate)
      .send({ from: fromAddress, gas: 3000000 });
    res.send({ message: 'Passport created successfully' });
  } catch (error) {
    console.error("Error creating passport:", error);
    res.status(500).send({ error: 'Failed to create passport' });
  }
  
});

app.get('/getPassport/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const passport = await contract.methods.getPassport(address).call();
    res.send(passport);
  } catch (error) {
    res.status(500).send({ error: 'Failed to get passport' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

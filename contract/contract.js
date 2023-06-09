const Web3 = require('web3');

// import contract from "./contract.json"
const contract = require("./contract.json");
require("dotenv").config();

const Contract = require('web3-eth-contract');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot instance
// const bot = new TelegramBot(token, { polling: true });
const contractAddress = process.env.CONTRACT_ADDRESS;

// Instantiate the contract
function getContract() {
    // const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
    return new Contract(contract, contractAddress)
    // return new web3.eth.Contract(contract, contractAddress);
  }
  
  // Get the locked time for a wallet address
async function getLockedTime(walletAddress) {
    try {
      const contract = getContract();
      return await contract.methods.FedsComing(walletAddress).call();
    } catch (error) {
      throw new Error('Failed to fetch the locked time.');
    }
  }

// Get the current timestamp
function getCurrentTime() {
  return Math.floor(Date.now() / 1000);
}

module.exports = getContract, getLockedTime, getCurrentTime
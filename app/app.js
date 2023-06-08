const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();
const Web3 = require('web3');
import contract from "../contract/contract.json"

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const contractAddress = process.env.CONTRACT_ADDRESS;

// Instantiate the contract
function getContract() {
    return new web3.eth.Contract(contract, contractAddress);
  }
  
// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = `Hello! Welcome to my Telegram bot from funky. ${msg.chat.username}`;
  bot.sendMessage(chatId, message);
});

// Listener (handler) for showcasing different keyboard layout
bot.onText(/\/keyboard/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Alternative keybaord layout', {
        'reply_markup': {
            'keyboard': [['Sample text', '2nd sample'], ['Keyboards'], ['I\'m robot']],
            resize_keyboard: true,
            one_time_keyboard: true,
            force_reply: true,
        }
    });
 });
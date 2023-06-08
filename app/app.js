const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();  
import * as contract from "../contract/contract.js";

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
 // Handle the /wen command
bot.onText(/\/wen (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const walletAddress = match[1];

  try {
    const lockedTime = await contract.getLockedTime(walletAddress);
    const currentTime = contract.getCurrentTime();

    if (lockedTime > 0) {
      const remainingTime = lockedTime - currentTime;
      const remainingHours = Math.floor(remainingTime / 3600);
      const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
      const remainingSeconds = remainingTime % 60;

      bot.sendMessage(
        chatId,
        `Wallet ${walletAddress} will be locked for ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds.`
      );
    } else {
      bot.sendMessage(chatId, `Wallet ${walletAddress} is not subject to locking.`);
    }
  } catch (error) {
    bot.sendMessage(chatId, 'An error occurred while fetching the locking information.');
    console.error(error);
  }
});
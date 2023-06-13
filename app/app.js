require("dotenv").config();
const {
  getContract,
  getLockedTime,
  getEthersProvider,
  getBalanceOf,
} = require("../contract/contract.js");
const { TokenLogs } = require("../database/models.js");
const { contractABI, tokenContract, telegramKey } = require("../config.js");
const TelegramBot = require("node-telegram-bot-api");
const connectDB = require("../database/connection.js");
connectDB();

// Create a bot instance
const bot = new TelegramBot(telegramKey, { polling: true });

// Listen for /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = `Hello! Welcome to my Telegram bot from funky. ${msg.chat.username}`;
  bot.sendMessage(chatId, message);
});

// Listener (handler) for showcasing different keyboard layout
bot.onText(/\/keyboard/, (msg) => {
  bot.sendMessage(msg.chat.id, "Alternative keybaord layout", {
    reply_markup: {
      keyboard: [["Sample text", "2nd sample"], ["Keyboards"], ["I'm robot"]],
      resize_keyboard: true,
      one_time_keyboard: true,
      force_reply: true,
    },
  });
});

// Handle the /wen command
bot.onText(/\/wen (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const walletAddress = match[1];
  const currentTime = parseInt(Date.now() / 1000);

  try {
    const tokenInfo = await TokenLogs.findOne({ wallet: walletAddress });

    if (tokenInfo) {
      const lockedTime = tokenInfo.deadTimestamp;
      const remainingTime = lockedTime - currentTime;
      const remainingHours = Math.floor(remainingTime / 3600);
      const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
      const remainingSeconds = remainingTime % 60;

      bot.sendMessage(
        chatId,
        `Wallet ${walletAddress} will be locked for ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds.`
      );
    } else {
      const contract = await getContract(
        tokenContract,
        contractABI,
        getEthersProvider()
      );
      const lockedTime = await getLockedTime(contract, walletAddress);

      bot.sendMessage(
        chatId,
        "An error occurred while fetching the locking information."
      );

      if (lockedTime > 0) {
        const tokenInfo = TokenLogs({
          wallet: walletAddress,
          deadTimestamp: lockedTime,
          balance: await getBalanceOf(contract, walletAddress),
        });
        tokenInfo.save();

        const remainingTime = lockedTime - currentTime;
        const remainingHours = Math.floor(remainingTime / 3600);
        const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
        const remainingSeconds = remainingTime % 60;

        bot.sendMessage(
          chatId,
          `Wallet ${walletAddress} will be locked for ${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds.`
        );
      } else {
        bot.sendMessage(
          chatId,
          `Wallet ${walletAddress} is not subject to locking.`
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
});

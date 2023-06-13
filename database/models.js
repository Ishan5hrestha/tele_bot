const { getAddress } = require("ethers");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransLogSchema = new Schema({
  wallet: {
    type: String,
    get: getAddress,
    set: getAddress,
  },
  deadTimestamp: Number,
  balance: String,
  dead: { type: Boolean, default: false },
});

const TokenInfoSchema = new Schema({
  total_locked_amount: { type: String },
  total_dead_wallet_count: { type: Number },
  total_tracked_holders: { type: Number },
});

const TokenInfo = mongoose.model("TokenInfo", TokenInfoSchema);
const TokenLogs = mongoose.model("TokenLogs", TransLogSchema);

module.exports = {
  TokenInfo,
  TokenLogs,
};

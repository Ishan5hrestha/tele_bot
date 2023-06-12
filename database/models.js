// const { getAddress } = require("ethers/lib/utils");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransLogSchema = new Schema({
  fromWallet: { type: String }, //, get: getAddress, set: getAddress},
  toWallet: { type: String }, //, get: getAddress, set: getAddress },
  deadTimestamp: Number,
  balance: Number,
});

const TokenInfoSchema = new Schema({
  total_locked_amount: { type: String },
  total_dead_wallet_count: { type: Number },
  total_tracked_holders: { type: Number },
});

const TokenInfo = mongoose.model("TokenInfo", TokenInfoSchema);
const TokenLogs = mongoose.model("TokenLogs", TransLogSchema);

modules.exports = {
  TokenInfo,
  TokenLogs,
};

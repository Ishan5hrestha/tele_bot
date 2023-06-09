// const { getAddress } = require("ethers/lib/utils");
const mongoose = require('mongoose');
const {Schema} = mongoose;

const transLog = new Schema({
    fromWallet: { type: String},//, get: getAddress, set: getAddress},
    toWallet: { type: String},//, get: getAddress, set: getAddress },
    deadTimestamp: Number,
    balance: Number
})

module.exports = mongoose.model('transLog', transLog);

//schema
/// total token amount lock, total wallet dead, total tracked holders, 
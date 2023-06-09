require("./api/server");
const { getContract, getLockedTime, getCurrentTime } = require("./contract/contract");
const db = require('./database/mongo.database');

console.log(getContract());
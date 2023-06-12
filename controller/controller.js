const { TokenInfo } = require("./models");

/*
/// Steps reqired for controller:
/// check for the wallet balance 
/// check for the db if there was any balance
///  -> delete wallet info in data base if the token balance of the wallet is 0
///  -> just update the balance if the balance is not zero and there is already the dead time
///  -> just leave it as it is if nothing has changed
/// 
*/

const checkAndUpdateBalance = (wallet) => {};

/*
/// wen/ ??? 
/// read the wallet with nearest death time, 
/// 
*/

const checkNearestDeathWallet = async (wallet) => {
  //call smart contract and check

  const walletsInfo = await TokenInfo.findAll({});
};

modules.exports = {
  checkAndUpdateBalance,
  checkNearestDeathWallet,
};

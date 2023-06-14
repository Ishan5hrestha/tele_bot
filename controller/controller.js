const { tokenContract, contractABI, deathAfter } = require("../config");
const {
  getBalanceOf,
  getContract,
  getEthersProvider,
  getLockedTime,
} = require("../contract/contract");
const { TokenLogs } = require("../database/models");

/*
/// Steps required for controller:
/// check for the wallet balance 
/// check for the db if there was any balance
///  -> delete wallet info in data base if the token balance of the wallet is 0
///  -> just update the balance if the balance is not zero and there is already the dead time
///  -> just leave it as it is if nothing has changed
/// 
*/
const checkAndUpdateBalance = async (wallet) => {
  let provider = getEthersProvider();
  let contract = getContract(tokenContract, contractABI, provider);
  let balance = await getBalanceOf(contract, wallet);

  if (balance == 0) {
    let deleteTokenInfo = await TokenLogs.findOne({
      wallet: wallet,
    });

    console.log("deleted token info", deleteTokenInfo);
  } else {
    try {
      let updatedTokenInfo = await TokenLogs.findOneAndUpdate(
        {
          wallet: wallet,
        },
        {
          balance: balance,
        }
      );
      console.log("updated token info", updatedTokenInfo);
    } catch (err) {
      //no tokens so create new
      let createdTokenInfo = await TokenLogs({
        wallet: wallet,
        balance: balance,
        deadTimestamp: await getLockedTime(contract, wallet),
      });

      createdTokenInfo.save();
      console.log("createdTokenInfo", createdTokenInfo);
    }
  }
};

/*
/// wen/ ??? 
/// read the wallet with nearest death time, 
/// 
*/
const checkNearestDeathWallet = async (wallet) => {
  //call smart contract and check
  let currentTime = Date.now();
  //within 1 hour of current time
  currentTime = parseInt(currentTime / 1000);
  let withinHour = currentTime + 3600;

  //(ascending order deadTimestamp) select those wallet which deadTimestamp is smaller than within hour and not dead
  //update the dead boolean for those wallet which is dead i.e. deadTimestamp < currentTime

  const queryNearDeadWallets = {
    deadTimestamp: { $lt: withinHour, $gte: currentTime },
    dead: false,
  };

  const walletInfos = await TokenLogs.find(queryNearDeadWallets).sort({
    deadTimestamp: "asc",
  });

  await killWallets();
  walletInfos.console.log(walletInfos);

  if (walletInfos) return walletInfos[0];

  return;
};

const killWallets = async () => {
  //call smart contract and check
  let currentTime = Date.now();
  //within 1 hour of current time
  currentTime = parseInt(currentTime / 1000);
  const queryDeadWallets = {
    deadTimestamp: { $lt: currentTime },
    dead: false,
  };
  const deadWalletResult = await TokenLogs.updateMany(queryDeadWallets, {
    $set: { dead: true },
  });
  console.log(deadWalletResult);
};

module.exports = {
  checkAndUpdateBalance,
  checkNearestDeathWallet,
};

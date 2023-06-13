const { ethers } = require("ethers");
const { rpcURI } = require("../config");

function getContract(contractAddress, abi, provider) {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract;
}

function getEthersProvider() {
  // return new ethers.providers.JsonRpcProvider(API_URL);
  let provider = new ethers.JsonRpcProvider(rpcURI);
  return provider;
}

//view functions --------------------------------
async function getLockedTime(contract, walletAddress) {
  try {
    const lockedUnixTime = await contract.FedsComing(walletAddress);
    return parseInt(lockedUnixTime.toString());
  } catch (error) {
    throw new Error("Failed to fetch the locked time.");
  }
}

async function getBalanceOf(contract, walletAddress) {
  const balance = await contract.balanceOf(walletAddress);
  return balance;
}

module.exports = {
  getContract,
  getLockedTime,
  getEthersProvider,
  getBalanceOf,
};

const { ethers } = require("ethers");

function getContract(contractAddress, abi, provider) {
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return contract;
}

function getEthersProvider(API_URL) {
  // return new ethers.providers.JsonRpcProvider(API_URL);
  let provider = new ethers.JsonRpcProvider(API_URL);
  return provider;
}

//view functions --------------------------------
async function getLockedTime(contract, walletAddress) {
  try {
    const lockedUnixTime = await contract.FedsComing(walletAddress);
    return lockedUnixTime;
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

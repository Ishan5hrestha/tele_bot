require("./api/server");
const {
  getContract,
  getLockedTime,
  getCurrentTime,
  getEthersProvider,
  getBalanceOf,
} = require("./contract/contract");
const abi = require("./contract/contract.json");
require("dotenv").config();

main = async () => {
  const provider = getEthersProvider(process.env.INFURA_API_KEY);
  const tokenAddress = process.env.CONTRACT_ADDRESS;

  const tokenContract = getContract(tokenAddress, abi, provider);

  const walletBalance = await getBalanceOf(
    tokenContract,
    "0xAcdC0c3F1f75694AC322E88C9da47036018a4611"
  );

  console.log(walletBalance);
};

main();

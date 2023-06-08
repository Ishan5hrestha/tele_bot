const { getAddress } = require("ethers/lib/utils");


const untrackedWallets = ["0x48465737316634e72E69a4619387b03eDCdEc414", ];


export const getUntrackedWallets = () => {
    let wallets = [];
    untrackedWallets.forEach(element => {
        wallets.push(getAddress(element));
    });

    return wallets;
}

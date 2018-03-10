var contract_address = '0xA30eb3C11E3d8a710518268a5c70F68E57F32f5B';
var contract_abi = '[{"constant":false,"inputs":[{"name":"favNum","type":"uint256"}],"name":"interact","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fromAddres","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdatedMinutes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"favNum","type":"uint256"},{"indexed":true,"name":"addr","type":"address"},{"indexed":true,"name":"timeUpdated","type":"uint256"}],"name":"Interaction","type":"event"}]';

var accounts;

var contractEvent;
var contractEventCounter = 0;

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Injected web3 Not Found!!!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
    // Now you can start your app & access web3 freely:
    startApp()
})

function startApp() {
    web3.eth.getAccounts(function(error, result) {
        if(error) {
            console.log(error);
        }
        else {
            var accounts = web3.personal.listAccounts;
            var accountSelect = document.getElementById('account_select');

            var count = 0;
            accounts.forEach(account => {
                var option = document.createElement('option');
                option.value = account;
                option.text = account + ' | ' + count++;
                accountSelect.add(option);
            });
        }
    })
}

function doUnlockAccount() {
    var accountSelect = document.getElementById('account_select');
    var account = accountSelect.options[accountSelect.selectedIndex].value;
    var password = document.getElementById('password_input').value;
    
    web3.personal.unlockAccount(account, password, function (error, result) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    })
}
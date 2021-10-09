window.accounts = [];

window.addEventListener('load', async () => {

    if (Boolean(window.ethereum) == true) {

        ethereum.autoRefreshOnNetworkChange = false;
        window.web3 = new ethers.providers.Web3Provider(window.ethereum);

        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts);
    }
    else if (window.web3) {
        accounts = await web3.currentProvider.enable()
        console.log(accounts);
    }
    else {
        console.log('Get web3')
    }

});
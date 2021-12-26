let accounts = [];
let convoinstance;

window.addEventListener('load', async () => {
    convoinstance = new Convo.Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');
    console.log('convoinstance setup', convoinstance)

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

async function test() {
    let adds = [
        "0xcf0949bf6d2adf8032260fd08039c879cf71c128",
        "0xD665afb9A4019a8c482352aaa862567257Ed62CF",
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "0xB53b0255895c4F9E3a185E484e5B674bCCfbc076",
        "0xa28992A6744e36f398DFe1b9407474e1D7A3066b",
        "0x707aC3937A9B31C225D8C240F5917Be97cab9F20"
    ];
    for (let index = 0; index < adds.length; index++) {
        const add = adds[index];
        console.log('testing', add);
        let resp = await convoinstance.omnid.computeTrustScore(add, {
            maticMainnetRpc: "https://polygon-rpc.com/",
            etherumMainnetRpc: "https://mainnet.infura.io/v3/1e7969225b2f4eefb3ae792aabf1cc17",
            avalancheMainnetRpc: "https://api.avax.network/ext/bc/C/rpc",
            deepdaoApiKey: "LfYMTHGu6J7oTEXT1JDkZ+SrbSD5ETfaXguV0mL44rMowgRsClZwaENG3LHBHv7rFeDJrQnOvEmxcLVZvNqVFA==",
            CNVSEC_ID: "oJUhahEidqvMKyiVGYTUOULSiwIutohAFAfnI43ZiTAVc0bZg2A47ATHRBYp4RFD",
        })
        console.log(resp);
    }
}

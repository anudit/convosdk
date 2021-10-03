let Hestia;

window.addEventListener('load', async () => {

    if (Boolean(window.ethereum) == true){

        ethereum.autoRefreshOnNetworkChange = false;

        window.accounts = [];
        const biconomy = new Biconomy(ethereum,{apiKey: "zgMOuSoVm.ee90efe8-31d3-4416-88f0-cae22db150f5"});
        window.web3 = new ethers.providers.Web3Provider(biconomy);

        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setupContracts(accounts)
    }
    else if (window.web3){

        let accounts = await web3.currentProvider.enable()
        setupContracts(accounts)
    }
    else {
        console.log('Get web3')
    }

});

function setupContracts(accounts){
    Hestia = new ethers.Contract(hestiaAddress, hestiaAbi, web3.getSigner());
    window.accounts = accounts;
}



async function call(msg ="yolo"){

    let domainData = {
        name: "Quote",
        version: "1",
        chainId : "80001",
        verifyingContract: quoteAddress
    };

    const metaTransactionType = [
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" }
    ];

    const domainType = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
    ];

    const nonce = await Quote.nonces(accounts[0]);

    let message = {};
    message.nonce = parseInt(nonce);
    message.from = accounts[0];

    const dataToSign = JSON.stringify({
        types: {
            EIP712Domain: domainType,
            MetaTransaction: metaTransactionType
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message
    });

    console.log(dataToSign);

    web3.provider.sendAsync(
        {
           jsonrpc: "2.0",
           id: 999999999999,
           method: "eth_signTypedData_v4",
           params: [accounts[0], dataToSign]
        },
        async (err, result)=>{
            if (err) {
                return console.error(err);
            }
            const signature = result.result.substring(2);
            const r = "0x" + signature.substring(0, 64);
            const s = "0x" + signature.substring(64, 128);
            const v = parseInt(signature.substring(128, 130), 16);

            let data = await Quote.setQuoteMeta(accounts[0], msg, r, s, v);
            console.log(data);
        });
}



async function getAllNFTsMatic(){

    let promise = new Promise((res, rej) => {
        getLatestMaticBlockNumber().then((blk)=>{
            fetch(`https://api.covalenthq.com/v1/80001/events/topics/0x67cdd88cece6fe7f33bb60f6b6113642d5860f0507d575786cc51767008c5213/?starting-block=${hestiaBlock}&key=${covalent_key}&ending-block=${parseInt(blk)}`)
            .then(response => response.json())
            .then(data => {
                let rs = []
                for (let index = 0; index < data.data.items.length; index++) {
                    const element = data.data.items[index];
                    rs.push(
                        Hestia.interface.decodeEventLog('NewPost', element.raw_log_data, element.raw_log_topics )
                    )
                }
                res(rs);
            })
            .catch((error) => {
                rej(error);
            });
        })

    });
    let result = await promise;
    return result;
}


let dArticlesList = document.getElementById('dArticlesList');
    let lastArticleID = await getLastArticleID();

    let promiseArray= [];
    for (let i = Math.max(1, lastArticleID-11); i< lastArticleID+1;i++){
        promiseArray.push(getArticle(i));
    }
    const recentArticles = await Promise.all(promiseArray);


async function getLatestMaticBlockNumber(){
    let promise = new Promise((res, rej) => {
        fetch("https://rpc-mainnet.maticvigil.com/v1/36aed576f085dcef42748c474a02b1c51db45c86", {
        "headers": {
            "content-type": "application/json",
        },
        "body": "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"eth_blockNumber\",\"params\":[]}",
        "method": "POST",
        })
        .then(response => response.json())
        .then(data => {
            res(data.result);
        })
        .catch((error) => {
            rej(error);
        });
    });
    let result = await promise;
    return result;
}

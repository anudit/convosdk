require('dotenv').config({ path: '.env' });
const { ethers } = require('ethers')
const { create, ReleaseMeta, generateID } = require('@valist/sdk');
const fetch = require('cross-fetch');
const fs = require('fs');
const { createWriteStream } = require('fs');
const http = require('https')
const { pipeline } = require('stream');
const { promisify } = require('util');
const Web3HttpProvider = require('web3-providers-http');


const download = async ({ url, path }) => {
    const streamPipeline = promisify(pipeline);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
    }

    await streamPipeline(response.body, createWriteStream(path));
};


async function publishToValist(releaseDetails) {

    // Use this to skip a specific release.
    let skip = ['0.1.0', '0.1.1', '0.1.2', '0.1.3', '0.1.4', '0.1.5', '0.1.6', '0.1.7', '0.1.8', '0.1.9', '0.1.10', '0.1.11', '0.1.12', '0.1.13', '0.1.14', '0.1.15', '0.1.16', '0.2.0', '0.2.1', '0.2.2', '0.2.3', '0.2.4', '0.2.5', '0.2.6', '0.2.7', '0.4.8']

    if (skip.includes(releaseDetails.version) == true) return;

    const web3 = new Web3HttpProvider('https://polygon-rpc.com/');
    const provider = new ethers.providers.Web3Provider(web3);

    const wallet = new ethers.Wallet(process.env.VALIST_RELEASER_PK, provider);

    const valistClient = await create(wallet.provider, { wallet, metaTx: true });
    const { chainId } = await provider.getNetwork();
    const accountID = generateID(chainId, 'theconvospace');
    const projectID = generateID(accountID, 'sdk');

    await fs.promises.mkdir(process.cwd() + '/releases', { recursive: true })

    console.log('Downloading Release:', releaseDetails._id);

    const filePath = process.cwd() + '/releases/' + releaseDetails.name.replace('/', '-') + "-" + releaseDetails.version + '.tgz';
    await download({
        url: releaseDetails.dist.tarball,
        path: filePath,
    })

    let fileStream = fs.createReadStream(filePath);

    const metaURI = await valistClient.writeFile(fileStream);

    const release = new ReleaseMeta();
    release.name = releaseDetails.version;
    release.external_url = metaURI;
    release.image = "";
    release.description = "";

    const tx = await valistClient.createRelease(projectID, releaseDetails.version, release);
    console.log('Publishing Release:', `https://polygonscan.com/tx/${tx.hash}`);

    tx.wait();

}


async function migratePackage(packageName) {
    console.log('Fetching Releases')
    let pkgDeets = await fetch(`https://registry.npmjs.org/${packageName}`);
    pkgDeets = await pkgDeets.json();

    if ('versions' in pkgDeets) {
        for (const releaseVersion in pkgDeets['versions']) {
            const release = pkgDeets['versions'][releaseVersion];
            console.log(releaseVersion, release?.dist?.tarball);
            await publishToValist(release);
        }
    }
    else {
        console.error(`${packageName} doesn't have any releases`);
    }
}


// 1. Setup VALIST_RELEASER_PK in .env file
// 2. Change Packge Name below.
// 3. Run Script.
migratePackage('@theconvospace/sdk').then(() => {
    process.exit(0);
});

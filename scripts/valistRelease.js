require('dotenv').config({ path: '.env' });
const { ethers } = require('ethers')
const { create, ReleaseMeta, generateID } = require('@valist/sdk');
const fetch = require('cross-fetch');
const fs = require('fs');
const { createWriteStream } = require('fs');
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

    const web3 = new Web3HttpProvider('https://polygon-rpc.com');
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


async function publishPackage(packageName, version) {
    console.log('Fetching Release');
    let pkgDeets = await fetch(`https://registry.npmjs.org/${packageName}/${version}`);
    pkgDeets = await pkgDeets.json();
    await publishToValist(pkgDeets);
}


// 1. Setup VALIST_RELEASER_PK in .env file
// 2. Change Packge Name below.
// 3. Run Script.
publishPackage('@theconvospace/sdk', '0.4.12').then(() => {
    process.exit(0);
});

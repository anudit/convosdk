require('dotenv').config({ path: '.env' });
const { ethers } = require('ethers')
const { create, ReleaseMeta, generateID, getFilesFromPath, ReleaseConfig } = require('@valist/sdk');
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


async function publishToValist(packageName, version) {

    let releaseDetails = await fetch(`https://registry.npmjs.org/${packageName}/${version}`).then(r => r.json());

    const rpc = new ethers.providers.JsonRpcProvider('https://polygon.llamarpc.com');
    const wallet = new ethers.Wallet(process.env.VALIST_RELEASER_PK, rpc);

    const valistClient = await create(wallet, { metaTx: true });
    const { chainId } = await wallet.provider.getNetwork();
    const accountID = generateID(chainId, accountName);
    const projectID = generateID(accountID, projectName);

    await fs.promises.mkdir(process.cwd() + '/releases', { recursive: true })

    console.log('Downloading Release:', releaseDetails._id);

    const filePath = process.cwd() + '/releases/' + releaseDetails.name.replace('/', '-') + "-" + releaseDetails.version + '.tgz';
    await download({
        url: releaseDetails.dist.tarball,
        path: filePath,
    })

    let config = new ReleaseConfig(accountName, projectName, version);
    config.image = "";
    config.description = "";

    config.platforms.web = filePath;

    console.log('Uploading Release to Valist');

    const release = await valistClient.uploadRelease(config);

    const tx = await valistClient.createRelease(projectID, version, release);
    console.log('Publishing Release:', `https://polygonscan.com/tx/${tx.hash}`);

    // await tx.wait();

}


async function publishPackage(packageName, version) {
    if (typeof version === 'object' && version?.length > 0) {
        array.forEach(async (v) => {
            console.log(`Fetching Release ${v}`);
            await publishToValist(packageName, v);
        });
    }
    else {
        console.log(`Fetching Release ${version}`);
        await publishToValist(packageName, version);
    }
}


// 1. Setup VALIST_RELEASER_PK in .env file
// 2. Change accountName & projectName below.
// 3. Run Script.

const accountName = "theconvospace"
let projectName = "sdk"
let version = "0.6.15"

publishPackage(`@${accountName}/${projectName}`, version).then(() => {
    process.exit(0);
});

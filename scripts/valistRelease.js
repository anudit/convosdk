require('dotenv').config({ path: '.env' });
const { ethers } = require('ethers')
const { create, ReleaseMeta, generateID } = require('@valist/sdk');
const fetch = require('cross-fetch');
const fs = require('fs');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const Web3HttpProvider = require('web3-providers-http');
const { getFilesFromPath } = require('@valist/sdk');

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

    const web3 = new Web3HttpProvider('https://polygon-rpc.com');
    const provider = new ethers.providers.Web3Provider(web3);

    const wallet = new ethers.Wallet(process.env.VALIST_RELEASER_PK, provider);

    const valistClient = await create(wallet.provider, { wallet, metaTx: true });
    const { chainId } = await provider.getNetwork();
    const accountID = generateID(chainId, accountName);
    const projectID = generateID(accountID, projectName);

    await fs.promises.mkdir(process.cwd() + '/releases', { recursive: true })

    console.log('Downloading Release:', releaseDetails._id);

    const filePath = process.cwd() + '/releases/' + releaseDetails.name.replace('/', '-') + "-" + releaseDetails.version + '.tgz';
    await download({
        url: releaseDetails.dist.tarball,
        path: filePath,
    })

    const artifacts = await getFilesFromPath(filePath);
    console.log('Uploading Release to Valist');
    const metaURI = await valistClient.writeFolder(artifacts);

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
let version = "0.6.3"

publishPackage(`@${accountName}/${projectName}`, version).then(() => {
    process.exit(0);
});

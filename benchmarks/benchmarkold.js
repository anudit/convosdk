require('dotenv').config({ path: '.env.local' })
const { createStream } = require('table');
const { Convo } = require('../packages/sdk/lib/cjs/index');

const { BITQUERY_API_KEY, ETHERSCAN_API_KEY, CNVSEC_ID, POLYGONSCAN_API_KEY } = process.env;

let LOG_RESP = false;

const colors = {
    danger: "\x1b[31m",
    success: "\x1b[32m",
    warn: "\x1b[33m",
    reset: '\033[0m',
};

const config = {
    polygonMainnetRpc: "https://polygon-rpc.com",
    etherumMainnetRpc: "https://eth.public-rpc.com",
    avalancheMainnetRpc: "https://avalanche.public-rpc.com",
    maticPriceInUsd: 1.4,
    etherumPriceInUsd: 3200,
    etherscanApiKey: ETHERSCAN_API_KEY,
    polygonscanApiKey: POLYGONSCAN_API_KEY,
    bitqueryApiKey: BITQUERY_API_KEY,
    CNVSEC_ID: CNVSEC_ID,
    DEBUG: false,
};

const addresssTable = [
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "0xcf0949bf6d2adf8032260fd08039c879cf71c128",
    "0xD665afb9A4019a8c482352aaa862567257Ed62CF",
    "0xB53b0255895c4F9E3a185E484e5B674bCCfbc076",
    "0xa28992A6744e36f398DFe1b9407474e1D7A3066b",
    "0x707aC3937A9B31C225D8C240F5917Be97cab9F20",
    "0x225b11096e5aec644bf1a0f09358d9534ce20903",
    "0x09750ad360fdb7a2ee23669c4503c974d86d8694",
    "0xbCEaA0040764009fdCFf407e82Ad1f06465fd2C4",
    "0x8d07D225a769b7Af3A923481E1FdF49180e6A265",
    "0x2fdc5ec86B1744F8884D08FE404AC2F8612d3528",
    "0x28b4de9c45af6cb1a5a46c19909108f2bb74a2be",
    "0x597D1747256304d5d47eCE999A8e5bAdE6d41845",
    "0x7F01611a10dFd14B425Dd61A2ed1fCc8420D9443"
];

const convoInstance = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');

const timeit = async (callback, params) => {
    let startDate = new Date();

    let resp = await callback.apply(this, params);
    if (Boolean(LOG_RESP) === true) console.log(resp);

    let endDate = new Date();
    return (endDate.getTime() - startDate.getTime()) / 1000

};

function avg(array) {
    var total = 0;
    var count = 0;

    array.forEach(function (item) {
        total += item;
        count++;
    });

    return total / count;
}

function min(array) {
    var min = 1000000;
    for (let index = 0; index < array.length; index++) {
        if (array[index] < min) min = array[index];
    }
    return min;
}

function max(array) {
    var max = -1000000;
    for (let index = 0; index < array.length; index++) {
        if (array[index] > max) max = array[index];
    }
    return max;
}

function colForTime(time) {
    return time > 3 ? colors['danger'] : time > 2 ? colors['warn'] : time > 1 ? colors['success'] : colors['reset'];
}

async function runTestOn(callback, addConfig) {
    let times = []

    for (let index = 0; index < addresssTable.length; index++) {

        const address = addresssTable[index];
        let params = [address];
        if (addConfig === true) params.push(config);
        let timeTaken = await timeit(callback, params);
        times.push(timeTaken);
    }
    return times;
}

async function runBenchmark(functionList) {

    console.log(`\nOmnid : Benchmarking ${functionList.length} Adaptors against ${addresssTable.length} Addresses.`);

    const stream = createStream({
        columnDefault: {
            width: 28
        },
        columnCount: 5,
        columns: [
            { alignment: 'center', width: 3 },
            { alignment: 'center' },
            { alignment: 'center', width: 12 },
            { alignment: 'center', width: 12 },
            { alignment: 'center', width: 12 }
        ]
    });

    stream.write(
        ["#", "Function", "Min Time", "Avg Time", "Max Time"],
    )

    for (let index = 0; index < functionList.length; index++) {
        const times = await runTestOn(
            functionList[index].fn,
            functionList[index].withConfig
        );
        const minTime = min(times).toFixed(3);
        const avgTime = avg(times).toFixed(3);
        const maxTime = max(times).toFixed(3);

        stream.write([
            index + 1,
            functionList[index].fn.name,
            `${colForTime(minTime)} ${minTime}s ${colors['reset']}`,
            `${colForTime(avgTime)} ${avgTime}s ${colors['reset']}`,
            `${colForTime(maxTime)} ${maxTime}s ${colors['reset']}`
        ])
    }

}

async function runBenchmarkManual() {

    console.log('');

    const stream = createStream({
        columnDefault: {
            width: 28
        },
        columnCount: 3,
        columns: [
            { alignment: 'center', width: 12 },
            { alignment: 'center', width: 12 },
            { alignment: 'center', width: 12 }
        ]
    });

    stream.write(
        ["Min Time", "Avg Time", "Max Time"],
    )

    let times = []
    for (let index = 0; index < addresssTable.length; index++) {
        const address = addresssTable[index];
        let time = await timeit(
            convoInstance.omnid.computeTrustScore, // update function here
            [address, config, ['coordinape', 'arcx', 'superrare']],
        );
        times.push(time);
    }
    const minTime = min(times).toFixed(3);
    const avgTime = avg(times).toFixed(3);
    const maxTime = max(times).toFixed(3);

    stream.write([
        `${colForTime(minTime)} ${minTime}s ${colors['reset']}`,
        `${colForTime(avgTime)} ${avgTime}s ${colors['reset']}`,
        `${colForTime(maxTime)} ${maxTime}s ${colors['reset']}`
    ])

}

async function tests() {

    console.log('Using Version: ', convoInstance.version);

    await runBenchmark([
        { fn: convoInstance.omnid.adaptors.getAaveData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getArcxData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getAsyncartData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getBirdData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getBoardroomData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.checkBrightId, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getCeloData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getCoinviseData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getCommonsstackData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getContextData, withConfig: false },
        // { fn: convoInstance.omnid.adaptors.getCoordinapeData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getCryptoreliefData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getCryptoscamdbData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getCyberconnectData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getDapplistData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getDebankData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getDeepDaoData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.addressToEns, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getEmblemData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getEtherscanData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getFortaData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getFoundationData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getGitcoinData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getGoldfinchData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getGovernordaoData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getHiveOneData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.checkIdena, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getKarmaData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getKlimaData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getKnownOriginData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getLayer3Data, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getLearnWeb3Data, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getLensData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getMetagameData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getMewData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getMirrorData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getPoapData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getPolygonData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getProjectGalaxyData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.checkPoH, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getPopData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getQuadrataData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getQuestbookData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getRabbitholeData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getRaribleData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getRss3Data, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getSdnData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getShowtimeData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getSuperrareData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getTokenBlacklistData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getTxnData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getUnipassData, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getSybilData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.resolveUnstoppableDomains, withConfig: false },
        { fn: convoInstance.omnid.adaptors.getYupData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getZapperData, withConfig: true },
        { fn: convoInstance.omnid.adaptors.getZoraData, withConfig: true },
    ])

    await runBenchmarkManual();

}

tests().then(() => {
    process.exit(0);
});

// runBenchmarkManual();

require('dotenv').config({ path: '.env.local' })
const { createStream } = require('table');
const { Convo, } = require('../packages/sdk/lib/index');
const { ethers } = require('ethers');

const { ALCHEMY_API_KEY, ZAPPER_API_KEY, OPTIMISMSCAN_API_KEY, ETHERSCAN_API_KEY, CNVSEC_ID, POLYGONSCAN_API_KEY } = process.env;

const colors = {
    danger: "\x1b[31m",
    success: "\x1b[32m",
    warn: "\x1b[33m",
    reset: '\033[0m',
};

const convoInstance = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');

const config = {
    polygonMainnetRpc: "https://polygon-rpc.com",
    etherumMainnetRpc: "https://eth.public-rpc.com",
    avalancheMainnetRpc: "https://avalanche.public-rpc.com",
    maticPriceInUsd: 0.8,
    etherumPriceInUsd: 1200,
    etherscanApiKey: ETHERSCAN_API_KEY,
    polygonscanApiKey: POLYGONSCAN_API_KEY,
    optimismscanApiKey: OPTIMISMSCAN_API_KEY,
    alchemyApiKey: ALCHEMY_API_KEY,
    zapperApiKey: ZAPPER_API_KEY,
    CNVSEC_ID: CNVSEC_ID,
    DEBUG: false,
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

class Benchmark {
    title = "Benchmark";
    tests = [];
    testCases = [];

    constructor(benchTitle, computeConfig) {
        this.title = benchTitle;
        this.config = computeConfig;
        return this;
    }

    run = async () => {

        const timeit = async (callback, params) => {
            let startDate = new Date();

            let resp = await callback.apply(this, params);

            let endDate = new Date();
            return [(endDate.getTime() - startDate.getTime()) / 1000, resp]

        };

        const runTestOn = async (callback, addConfig, verbose = false) => {
            let times = []
            let resps = []

            for (let index = 0; index < this.testCases.length; index++) {

                const address = this.testCases[index];
                let params = [address];
                if (addConfig === true) params.push(this.config);
                let [timeTaken, resp] = await timeit(callback, params);
                if (verbose) console.log(resp);
                times.push(timeTaken);
                resps.push(resp);
            }
            return [times, resps];
        }

        console.log(`\n${this.title} : Benchmarking ${this.tests.length} Functions against ${this.testCases.length} Test Cases.`);

        const stream = createStream({
            columnDefault: {
                width: 28
            },
            columnCount: 6,
            columns: [
                { alignment: 'center', width: 3 },
                { alignment: 'center' },
                { alignment: 'center', width: 12 },
                { alignment: 'center', width: 12 },
                { alignment: 'center', width: 12 },
                { alignment: 'center', width: 12 },
                { alignment: 'center', width: 12 }
            ]
        });

        stream.write(
            ["#", "Function", "Min Time", "Avg Time", "Max Time", "Resp Preview"],
        )

        for (let index = 0; index < this.tests.length; index++) {
            const [times, resps] = await runTestOn(
                this.tests[index].fn,
                this.tests[index].withConfig,
                Boolean(this.tests[index]?.verbose)
            );
            const minTime = min(times).toFixed(3);
            const avgTime = avg(times).toFixed(3);
            const maxTime = max(times).toFixed(3);

            stream.write([
                index + 1,
                this.tests[index].fn.name,
                `${colForTime(minTime)} ${minTime}s ${colors['reset']}`,
                `${colForTime(avgTime)} ${avgTime}s ${colors['reset']}`,
                `${colForTime(maxTime)} ${maxTime}s ${colors['reset']}`,
                Boolean(resps[0]) ? JSON.stringify(resps[0]).slice(0, 10) : `${colForTime(100)} ${resps[0]} ${colors['reset']}`,
            ])
        }

    }

    addTest = (testData) => {
        this.tests.push(testData);
        return this;
    };

    addTestCase = (testCase) => {
        this.testCases.push(testCase);
        return this;
    }
    addTestCases = (newTestCases = []) => {
        this.testCases = this.testCases.concat(newTestCases);
        return this;
    }

}


async function runStuff() {

    console.log('Using the SDK version', convoInstance.version);

    let testCases = [
        "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // Test Vitalik - vb2
        "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", // vb
        "0xBAcb58a5BD0e2dF0B3d3e82A1c75aD565A417Cd6", // Test Aave, Bird
        "0x000440f08436a7b866d1ae42db5e0be801da722a", // Test Alchemy
        "0xcf0949bf6d2adf8032260fd08039c879cf71c128", // Foundation, known origin, forta
        "0xD665afb9A4019a8c482352aaa862567257Ed62CF", // Archangel - Foundation Superrare, async
        "0x8d07D225a769b7Af3A923481E1FdF49180e6A265", // monetsupply.eth - Boardroom
        "0xB53b0255895c4F9E3a185E484e5B674bCCfbc076", // peth.eth - metagame
        "0x00002034c56833c91a8453b3b7b087c8694b7c67", // celo - Attestations.
        "0xa28992A6744e36f398DFe1b9407474e1D7A3066b", // tester
        "0x707aC3937A9B31C225D8C240F5917Be97cab9F20", // quadrata
        "0x8df737904ab678B99717EF553b4eFdA6E3f94589", // Jenil.eth - coinvise, cyberconnect
        "0x00432996c5cf8200cf208200613aec2329be0e39", // lebanonsdao.eth - Commonsstack
        "0x1786d033d5cbcc235b673e872c7613c2f83da583", // Nirbhik.eth - dapplist, debank
        "0x03787a359fed91366c8414538f17883caeaa8661", // Goldfinch
        "0x12b2398405f49dec00d7ceef9c0925e6fc96c51f", // Klima
        "0x4d85e4F760fb58E380f02657AE5Aafb8bd010601", // Layer3
        "0xaf116bab0c55b2ef2b4386a213334b8fd31c0303", // LearnWeb3DAO
        "0x09750ad360fdb7a2ee23669c4503c974d86d8694", // Phishing
        "0xfe82080625edca65f30d41ab141c819d109616d1", // poh
        "0xd30dd83132f2227f114db8b90f565bca2832afbd", // Questbook
        "0xd3e9d60e4e4de615124d5239219f32946d10151d", // alexmasmej
        "0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C", // sdn - OFAC sanction
        "0x416365993481e52e0472e7417656276d4e147a00", // rocifi
        "0x166C7Ae68dc800De903f891a3bb2c9258d797CcA", // chainabuse
        "0x627a22ff70cb84e74c9c70e2d5b0b75af5a1dcb9", // Omni Expoilt
        "0x3faad8f2776dd17fa20d4d9707e7ab76b808adde", // Parallel Identity
        "0x854ce16536cc41a0593a754f88a3eaf14eee9938", // violet hbt
        "0x26071a19c8d5ecA20AB5C959F578095e1a776E18", // 101
        "0x0c12522fCDa861460BF1BC223eCa108144EE5Df4", // Mazury
        "0xf7287d45e290d11858d113fd0250b1c2c6aab044", // Ethrank
        // "0x225b11096e5aec644bf1a0f09358d9534ce20903",
        // "0xbCEaA0040764009fdCFf407e82Ad1f06465fd2C4",
        // "0x2fdc5ec86B1744F8884D08FE404AC2F8612d3528",
        // "0x28b4de9c45af6cb1a5a46c19909108f2bb74a2be",
        // "0x597D1747256304d5d47eCE999A8e5bAdE6d41845",
        // "0x7F01611a10dFd14B425Dd61A2ed1fCc8420D9443",
    ].map(ethers.utils.getAddress)


    let bench = new Benchmark("Omnid Adaptors", config);
    bench.addTestCases(testCases);

    bench
        .addTest({ fn: convoInstance.omnid.adaptors.get101badgesData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getAaveData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getAlchemyData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getArcxData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getAsyncartData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getBabtData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getBirdData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getBoardroomData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.checkBrightId, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCeloData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getChainabuseData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCoinviseData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getCommonsstackData, withConfig: false })
        // .addTest({ fn: convoInstance.omnid.adaptors.getCoordinapeData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCredProtocolData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCryptoreliefData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getCryptoscamdbData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getCyberconnectData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDapplistData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDebankData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDeepDaoData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.addressToEns, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getEtherscanData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getFortaData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getFoundationData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getGitcoinData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getGivethData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getGoldenData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getGoldfinchData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getGoplusData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getGovernordaoData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getHbtData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getHiveOneData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.checkIdena, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getKarmaData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getKlimaData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getKnownOriginData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getLayer3Data, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getLearnWeb3Data, withConfig: false, })
        .addTest({ fn: convoInstance.omnid.adaptors.getLensData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getMazuryData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getETHRankData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getMetagameData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getMewData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getMirrorData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getParallelData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPoapData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getRabbitholeData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getRaribleData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getRocifiData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getRss3Data, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getSdnData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getShowtimeData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getSuperrareData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getTokenBlacklistData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getTxnData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getUnipassData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getSybilData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.resolveUnstoppableDomains, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPolygonData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getProjectGalaxyData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.checkPoH, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPopData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getQuadrataData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getQuestbookData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getUpalaData, withConfig: false })
        // .addTest({ fn: convoInstance.omnid.adaptors.getUpshotData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getYupData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getZapperData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getZoraData, withConfig: true })

    let bench2 = new Benchmark("Omnid Complete", config);

    bench2.addTestCases(testCases);

    bench2.addTest({
        fn: computeTrustScore = async (address, withConfig) => {
            return await convoInstance.omnid.computeTrustScore(address, config, ['coordinape', 'upshot', 'arcx'])
        }, withConfig: true, verbose: false,
    })

    let bench3 = new Benchmark("Omnid Kits", config);

    bench3.addTestCases(testCases);

    bench3.addTest({
        fn: isMalicious = async (address, withConfig) => {
            return await convoInstance.omnid.kits.isMalicious(address, config)
        }, withConfig: true, verbose: false,
    })

    let bench4 = new Benchmark("Auth", config);

    bench4.addTestCases(testCases);

    bench4.addTest({
        fn: genAuth = async (address, withConfig) => {
            return convoInstance.auth.getSignatureDataV2('https://convosdk-examples-nextjs.vercel.app', address, '1');
        }, withConfig: true, verbose: false,
    })

    let bench5 = new Benchmark("Temp Bench", config);

    bench5.addTestCases(testCases);

    bench5.addTest({
        fn: check = async (address, withConfig) => {
            return convoInstance.omnid.adaptors.getETHRankData(address);
        }, withConfig: false, verbose: true,
    })

    await bench.run();
    await bench2.run();
    // await bench3.run();
    // await bench4.run();
    // await bench5.run();
}

runStuff();

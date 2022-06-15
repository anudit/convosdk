require('dotenv').config({ path: '.env.local' })
const { createStream } = require('table');
const { Convo } = require('../packages/sdk/lib/index');

const { BITQUERY_API_KEY, ETHERSCAN_API_KEY, CNVSEC_ID, POLYGONSCAN_API_KEY } = process.env;

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
    maticPriceInUsd: 1.4,
    etherumPriceInUsd: 3200,
    etherscanApiKey: ETHERSCAN_API_KEY,
    polygonscanApiKey: POLYGONSCAN_API_KEY,
    bitqueryApiKey: BITQUERY_API_KEY,
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

}


async function runStuff() {

    let bench = new Benchmark("Omnid Adaptors", config);

    bench.addTestCase("0xcf0949bf6d2adf8032260fd08039c879cf71c128")
        .addTestCase("0xD665afb9A4019a8c482352aaa862567257Ed62CF")
        .addTestCase("0xB53b0255895c4F9E3a185E484e5B674bCCfbc076")
        .addTestCase("0xa28992A6744e36f398DFe1b9407474e1D7A3066b")
        .addTestCase("0x707aC3937A9B31C225D8C240F5917Be97cab9F20")
        .addTestCase("0x225b11096e5aec644bf1a0f09358d9534ce20903")
        .addTestCase("0x09750ad360fdb7a2ee23669c4503c974d86d8694")
        .addTestCase("0xbCEaA0040764009fdCFf407e82Ad1f06465fd2C4")
        .addTestCase("0x8d07D225a769b7Af3A923481E1FdF49180e6A265")
        .addTestCase("0x2fdc5ec86B1744F8884D08FE404AC2F8612d3528")
        .addTestCase("0x28b4de9c45af6cb1a5a46c19909108f2bb74a2be")
        .addTestCase("0x597D1747256304d5d47eCE999A8e5bAdE6d41845")
        .addTestCase("0x7F01611a10dFd14B425Dd61A2ed1fCc8420D9443");

    bench
        .addTest({ fn: convoInstance.omnid.adaptors.getAaveData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getArcxData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getAsyncartData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getBirdData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getBoardroomData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.checkBrightId, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCeloData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCoinviseData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getCommonsstackData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getContextData, withConfig: false })
        // .addTest({ fn: convoInstance.omnid.adaptors.getCoordinapeData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCryptoreliefData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getCryptoscamdbData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getCyberconnectData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDapplistData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDebankData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getDeepDaoData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.addressToEns, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getEmblemData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getEtherscanData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getFortaData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getFoundationData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getGitcoinData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getGoldfinchData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getGovernordaoData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getHiveOneData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.checkIdena, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getKarmaData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getKlimaData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getKnownOriginData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getLayer3Data, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getLearnWeb3Data, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getLensData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getMetagameData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getMewData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getMirrorData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPoapData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPolygonData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getProjectGalaxyData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.checkPoH, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getPopData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getQuadrataData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getQuestbookData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getRabbitholeData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getRaribleData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getRss3Data, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getSdnData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getShowtimeData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getSuperrareData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getTokenBlacklistData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getTxnData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getUnipassData, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getSybilData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.resolveUnstoppableDomains, withConfig: false })
        .addTest({ fn: convoInstance.omnid.adaptors.getYupData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getZapperData, withConfig: true })
        .addTest({ fn: convoInstance.omnid.adaptors.getZoraData, withConfig: true })

    await bench.run();

    let bench2 = new Benchmark("Omnid Complete", config);

    bench2.addTestCase("0xcf0949bf6d2adf8032260fd08039c879cf71c128")
        .addTestCase("0xD665afb9A4019a8c482352aaa862567257Ed62CF")
        .addTestCase("0xB53b0255895c4F9E3a185E484e5B674bCCfbc076")
        .addTestCase("0xa28992A6744e36f398DFe1b9407474e1D7A3066b")
        .addTestCase("0x707aC3937A9B31C225D8C240F5917Be97cab9F20")
        .addTestCase("0x225b11096e5aec644bf1a0f09358d9534ce20903")
        .addTestCase("0x09750ad360fdb7a2ee23669c4503c974d86d8694")
        .addTestCase("0xbCEaA0040764009fdCFf407e82Ad1f06465fd2C4")
        .addTestCase("0x8d07D225a769b7Af3A923481E1FdF49180e6A265")
        .addTestCase("0x2fdc5ec86B1744F8884D08FE404AC2F8612d3528")
        .addTestCase("0x28b4de9c45af6cb1a5a46c19909108f2bb74a2be")
        .addTestCase("0x597D1747256304d5d47eCE999A8e5bAdE6d41845")
        .addTestCase("0x7F01611a10dFd14B425Dd61A2ed1fCc8420D9443");

    bench2.addTest({
        fn: computeTrustScore = async (address, withConfig) => {
            return await convoInstance.omnid.computeTrustScore(address, config, ['coordinape', 'arcx', 'cryptoscamdb'])
        }, withConfig: true, verbose: false,
    })

    await bench2.run();

}

runStuff();

const { default: fetch } = require("cross-fetch");
const { getAddress } = require("ethers/lib/utils");
const fs = require('fs');

const ethAddressMatcher = /0x[a-fA-F0-9]{40}/gm;

async function getSdnData() {
    let req = await fetch('https://www.treasury.gov/ofac/downloads/sdnlist.txt');
    let resp = await req.text();
    let flags = resp.split('\n\n').slice(2);

    let stats = {
        ethAddresses: 0,
        reports: 0,
    }
    let ethReports = {};

    for (let index = 0; index < flags.length; index++) {
        const flag = flags[index].replaceAll('\n', ' ').replaceAll('; ', ' ');

        let matches = flag.match(ethAddressMatcher);

        if (Boolean(matches) === true) {

            stats.reports += 1
            stats.ethAddresses += matches.length;

            matches = matches.map(getAddress);
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];
                const newReport = {
                    report: flag,
                    linked: matches.filter(e => { return e != match }),
                };

                if (Object.keys(ethReports).includes(match)) {
                    ethReports[match].reports.push(newReport)
                }
                else {
                    ethReports[match] = {
                        reports: [newReport],
                    };
                }
            }

        }
    }

    let reports = [];
    let keys = Object.keys(ethReports);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        reports.push({
            _id: key,
            ...ethReports[key]
        })

    }

    await fs.promises.writeFile("sdnList.json", JSON.stringify(reports), 'utf8');
    console.log(stats);
}

getSdnData().then(() => {
    process.exit(0);
});

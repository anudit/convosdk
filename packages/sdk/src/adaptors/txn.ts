import { AdaptorDeets, ComputeConfig, Dictionary, txnResp } from '../types';
import { checkComputeConfig, fetcher } from '../utils';
import { BigNumber } from 'ethers';
import { formatEther, getAddress, isAddress } from 'ethers/lib/utils';

interface TxnData {
  timeStamp: string;
  gasPrice: string;
  gasUsed: string;
  contractAddress: string;
  from: string;
  to: string;
  isError: '0' | '1';
  input: string;
}

interface ScanResp {
  status: string;
  message: string;
  result: Array<TxnData>;
}

const tornadoAdds = [
  '0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b',
  '0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc',
  '0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936',
  '0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF',
  '0xA160cdAB225685dA1d56aa342Ad8841c3b53f291',
  '0xD4B88Df4D29F5CedD6857912842cff3b20C8Cfa3',
  '0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144',
  '0x07687e702b410Fa43f4cB4Af7FA097918ffD2730',
  '0x23773E65ed146A459791799d01336DB287f25334',
  '0x22aaA7720ddd5388A3c0A3333430953C68f1849b',
  '0x03893a7c7463AE47D46bc7f091665f1893656003',
  '0x2717c5e28cf931547B621a5dddb772Ab6A35B701',
  '0xD21be7248e0197Ee08E0c20D4a96DEBdaC3D20Af',
  '0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D',
  '0xd96f2B1c14Db8458374d9Aca76E26c3D18364307',
  '0x169AD27A470D064DEDE56a2D3ff727986b15D52B',
  '0x0836222F2B2B24A3F36f98668Ed8F0B38D1a872f',
  '0x178169B423a011fff22B9e3F3abeA13414dDD0F1',
  '0x610B717796ad172B316836AC95a2ffad065CeaB4',
  '0xbB93e510BbCD0B7beb5A853875f9eC60275CF498',
  '0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD',
  '0xdf231d99Ff8b6c6CBF4E9B9a945CBAcEF9339178',
  '0xaf4c0B70B2Ea9FB7487C7CbB37aDa259579fe040',
  '0xa5C2254e4253490C54cef0a4347fddb8f75A4998',
  '0x84443CFd09A48AF6eF360C6976C5392aC5023a1F',
  '0xd47438C816c9E7f2E2888E060936a499Af9582b3',
  '0x330bdFADE01eE9bF63C209Ee33102DD334618e0a',
  '0x1E34A77868E19A6647b1f2F47B51ed72dEDE95DD',
];

function txnDataToTotalGasUsed(data: TxnData) {
  return BigNumber.from(data.gasPrice).mul(BigNumber.from(data.gasUsed));
}

function txnDataAge(data: TxnData) {
  const now = new Date();

  const past = new Date(parseInt(data.timeStamp) * 1000);
  const days: number = Math.floor(
    (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
  );
  return days;
}

function parseEtherscanResp(txlist: Array<TxnData>): txnResp {
  const age = txnDataAge(txlist[0]);
  const txnCount = txlist.length;
  let contractsDeployed = 0;
  let gasSpent = BigNumber.from(0);
  let failedTxnCount = 0;
  let failedGasSpent = BigNumber.from(0);
  for (let index = 0; index < txlist.length; index++) {
    const event = txlist[index];
    gasSpent = gasSpent.add(txnDataToTotalGasUsed(event));
    if (
      event.input.startsWith('0x60806040') &&
      isAddress(event.contractAddress)
    )
      contractsDeployed++;
    if (event.isError === '1') {
      failedTxnCount++;
      failedGasSpent = failedGasSpent.add(txnDataToTotalGasUsed(event));
    }
  }
  return {
    age,
    txnCount,
    gasSpent: formatEther(gasSpent),
    contractsDeployed,
    failedTxnCount,
    failedGasSpent: formatEther(failedGasSpent),
  };
}

export default async function getTxnData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getTxnData', computeConfig, [
    'etherscanApiKey',
    'polygonscanApiKey',
    'optimismscanApiKey',
  ]);

  const chains = {
    ethereum: {
      endpoint: 'https://api.etherscan.io',
      apikey: computeConfig.etherscanApiKey,
    },
    polygon: {
      endpoint: 'https://api.polygonscan.com',
      apikey: computeConfig.polygonscanApiKey,
    },
    optimism: {
      endpoint: 'https://api-optimistic.etherscan.io',
      apikey: computeConfig.optimismscanApiKey,
    },
  };

  const promiseArray = Object.values(chains)
    .map((chainData) => {
      return fetcher(
        'GET',
        `${chainData.endpoint}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${chainData.apikey}`
      );
    })
    .concat(
      Object.values(chains).map((chainData) => {
        return fetcher(
          'GET',
          `${chainData.endpoint}/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${chainData.apikey}`
        );
      })
    );

  const data = await Promise.allSettled<ScanResp>(promiseArray);

  const resp: Dictionary<txnResp> = {};

  const chainNames = Object.keys(chains);
  for (let index = 0; index < chainNames.length; index++) {
    const name = chainNames[index];
    resp[name] = {
      age: 0,
      txnCount: 0,
      gasSpent: '0',
      contractsDeployed: 0,
      failedTxnCount: 0,
      failedGasSpent: '0',
      fundedByTornadoCash: false,
      tornadoInteractions: 0,
    };

    if (data[index].status === 'fulfilled') {
      const respData = (data[index] as PromiseFulfilledResult<ScanResp>).value;

      if (Boolean(respData?.result) === true && respData.result.length > 0) {
        resp[name] = parseEtherscanResp(respData.result);
        resp[name].tornadoInteractions = respData.result.filter((e) => {
          return (
            (isAddress(e.from) && tornadoAdds.includes(getAddress(e.from))) ||
            (isAddress(e.to) && tornadoAdds.includes(getAddress(e.to))) ||
            (isAddress(e.contractAddress) &&
              tornadoAdds.includes(getAddress(e.contractAddress)))
          );
        }).length;
      }
    }
  }

  for (let index = 0; index < chainNames.length; index++) {
    const name = chainNames[index];
    if (data[3 + index].status === 'fulfilled') {
      const respData = (data[3 + index] as PromiseFulfilledResult<ScanResp>)
        .value;
      if (Boolean(respData?.result) === true && respData.result.length > 0) {
        resp[name].fundedByTornadoCash = respData?.result
          .map((e) => {
            return tornadoAdds.includes(getAddress(e.from));
          })
          .includes(true);
      }
    }
  }

  return resp;
}

export const TxnAdaptorDeets: AdaptorDeets = {
  id: 'txn',
  name: 'Transaction Stats - Omnid',
  projectThumbnail:
    'ipfs://bafybeif655asxj6dh437nvnz3aap7gomxgni2nfsotxi3y33xbveroc75u/omnid.webp',
  projectUrl: 'https://omnid.space/',
  requiredConfigKeys: [
    'etherscanApiKey',
    'polygonscanApiKey',
    'optimismscanApiKey',
  ],
};

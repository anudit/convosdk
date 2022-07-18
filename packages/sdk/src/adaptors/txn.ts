import { AdaptorDeets, ComputeConfig, Dictionary } from '../types';
import { checkComputeConfig, fetcher } from '../utils';
import { BigNumber } from 'ethers';
import { formatEther, isAddress } from 'ethers/lib/utils';

interface TxnData {
  timeStamp: string;
  gasPrice: string;
  gasUsed: string;
  contractAddress: string;
  isError: '0' | '1';
  input: string;
}

interface ScanResp {
  status: string;
  message: string;
  result: Array<TxnData>;
}

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

function parseEtherscanResp(txlist: Array<TxnData>) {
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

  const promiseArray = Object.values(chains).map((chainData) => {
    return fetcher(
      'GET',
      `${chainData.endpoint}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${chainData.apikey}`
    );
  });

  const data = await Promise.allSettled<ScanResp>(promiseArray);

  const resp: Dictionary<any> = {};

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
    };

    if (data[index].status === 'fulfilled') {
      const respData = (data[index] as PromiseFulfilledResult<ScanResp>).value;

      if (Boolean(respData?.result) === true && respData.result.length > 0) {
        resp[name] = parseEtherscanResp(respData.result);
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

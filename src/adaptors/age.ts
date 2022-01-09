import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface ScanResp {
  status: string;
  message: string;
  result: Array<{ timeStamp: string }>;
}

export default async function getAge(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.etherscanApiKey) === false) {
    throw new Error(
      'getAaveData: computeConfig does not contain etherscanApiKey'
    );
  }
  if (Boolean(computeConfig?.polygonscanApiKey) === false) {
    throw new Error(
      'getAaveData: computeConfig does not contain polygonscanApiKey'
    );
  }

  const promiseArray = [
    fetcher(
      'GET',
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${computeConfig.etherscanApiKey}`
    ),
    fetcher(
      'GET',
      `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${computeConfig.polygonscanApiKey}`
    ),
  ];

  const data = await Promise.allSettled(promiseArray);
  const now = new Date();
  let ethereumAge = 0;
  let polygonAge = 0;

  if (data[0].status === 'fulfilled') {
    const respData = data[0].value as ScanResp;
    const past = new Date(parseInt(respData.result[0].timeStamp) * 1000);
    const days: number = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
    );
    ethereumAge = days;
  }

  if (data[1].status === 'fulfilled') {
    const respData2 = data[1].value as ScanResp;
    const past = new Date(parseInt(respData2.result[0].timeStamp) * 1000);
    const days2: number = Math.floor(
      (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
    );
    polygonAge = days2;
  }

  return {
    polygon: polygonAge,
    ethereum: ethereumAge,
  };
}

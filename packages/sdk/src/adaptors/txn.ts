import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

interface TxnData {
  timeStamp: string;
  gasPrice: string;
  gasUsed: string;
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

export default async function getTxnData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getTxnData', computeConfig, [
    'etherscanApiKey',
    'polygonscanApiKey',
    'optimismscanApiKey',
  ]);

  const promiseArray = [
    fetcher(
      'GET',
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${computeConfig.etherscanApiKey}`
    ),
    fetcher(
      'GET',
      `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${computeConfig.polygonscanApiKey}`
    ),
    fetcher(
      'GET',
      `https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${computeConfig.polygonscanApiKey}`
    ),
  ];

  const data = await Promise.allSettled(promiseArray);

  let ethereumAge = 0;
  let polygonAge = 0;
  let optimismAge = 0;
  let ethereumGasSpend = BigNumber.from(0);
  let polygonGasSpend = BigNumber.from(0);
  let optimismGasSpend = BigNumber.from(0);

  if (data[0].status === 'fulfilled') {
    const respData = data[0].value as ScanResp;
    if (Boolean(respData?.result) === true && respData.result.length > 0) {
      ethereumAge = txnDataAge(respData.result[0]);

      for (let index = 0; index < respData.result.length; index++) {
        const event = respData.result[index];
        ethereumGasSpend = ethereumGasSpend.add(txnDataToTotalGasUsed(event));
      }
    }
  }

  if (data[1].status === 'fulfilled') {
    const respData1 = data[1].value as ScanResp;
    if (Boolean(respData1?.result) === true && respData1.result.length > 0) {
      polygonAge = txnDataAge(respData1.result[0]);

      for (let index = 0; index < respData1.result.length; index++) {
        const event = respData1.result[index];
        polygonGasSpend = polygonGasSpend.add(txnDataToTotalGasUsed(event));
      }
    }
  }

  if (data[2].status === 'fulfilled') {
    const respData2 = data[2].value as ScanResp;
    if (Boolean(respData2?.result) === true && respData2.result.length > 0) {
      optimismAge = txnDataAge(respData2.result[0]);

      for (let index = 0; index < respData2.result.length; index++) {
        const event = respData2.result[index];
        optimismGasSpend = optimismGasSpend.add(txnDataToTotalGasUsed(event));
      }
    }
  }

  return {
    ethereumAge,
    ethereumGasSpend: formatEther(ethereumGasSpend),
    polygonAge,
    polygonGasSpend: formatEther(polygonGasSpend),
    optimismAge,
    optimismGasSpend: formatEther(optimismGasSpend),
  };
}

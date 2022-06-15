import { ComputeConfig } from '../types';
import { fetcher, gqlFetcher } from '../utils';

interface ScanResp {
  status: string;
  message: string;
  result: Array<{ timeStamp: string }>;
}

interface BitQueryResp {
  data: {
    ethereum: {
      transactions: Array<{
        gasValue: number;
      }>;
    };
  };
}

export default async function getTxnData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.etherscanApiKey) === false) {
    throw new Error(
      'getTxnData: computeConfig does not contain etherscanApiKey'
    );
  }
  if (Boolean(computeConfig?.polygonscanApiKey) === false) {
    throw new Error(
      'getTxnData: computeConfig does not contain polygonscanApiKey'
    );
  }
  if (Boolean(computeConfig?.bitqueryApiKey) === false) {
    throw new Error(
      'getTxnData: computeConfig does not contain bitqueryApiKey'
    );
  }

  const promiseArray = [
    fetcher(
      'GET',
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=10&sort=asc&apikey=${computeConfig.etherscanApiKey}`
    ),
    fetcher(
      'GET',
      `https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&page=1&offset=10&sort=asc&apikey=${computeConfig.polygonscanApiKey}`
    ),
    gqlFetcher(
      'https://graphql.bitquery.io',
      `{
        ethereum {
          transactions(
            success: true
            txSender: {is: "${address}"}
          ) {
            gasValue
          }
        }
      }`,
      {},
      5000,
      {
        'X-API-KEY': computeConfig.bitqueryApiKey,
      }
    ),
    gqlFetcher(
      'https://graphql.bitquery.io',
      `{
        ethereum(network: matic) {
          transactions(
            success: true
            txSender: {is: "${address}"}
          ) {
            gasValue
          }
        }
      }`,
      {},
      5000,
      {
        'X-API-KEY': computeConfig.bitqueryApiKey,
      }
    ),
  ];

  const data = await Promise.allSettled(promiseArray);
  const now = new Date();
  let ethereumAge = 0;
  let polygonAge = 0;
  let ethereumGasSpend = 0;
  let polygonGasSpend = 0;

  if (data[0].status === 'fulfilled') {
    const respData = data[0].value as ScanResp;
    if (Boolean(respData?.result) === true && respData.result.length > 0) {
      const past = new Date(parseInt(respData.result[0].timeStamp) * 1000);
      const days: number = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
      );
      ethereumAge = days;
    }
  }

  if (data[1].status === 'fulfilled') {
    const respData1 = data[1].value as ScanResp;
    if (Boolean(respData1?.result) === true && respData1.result.length > 0) {
      const past = new Date(parseInt(respData1.result[0].timeStamp) * 1000);
      const days2: number = Math.floor(
        (now.getTime() - past.getTime()) / (1000 * 3600 * 24)
      );
      polygonAge = days2;
    }
  }

  if (data[2].status === 'fulfilled') {
    const respData2 = data[2].value as BitQueryResp;
    if (
      Boolean(respData2?.data?.ethereum?.transactions[0]?.gasValue) === true
    ) {
      ethereumGasSpend = respData2?.data?.ethereum?.transactions[0]?.gasValue;
    }
  }

  if (data[3].status === 'fulfilled') {
    const respData3 = data[3].value as BitQueryResp;
    if (
      Boolean(respData3?.data?.ethereum?.transactions[0]?.gasValue) === true
    ) {
      polygonGasSpend = respData3?.data?.ethereum?.transactions[0]?.gasValue;
    }
  }

  return {
    polygonAge,
    ethereumAge,
    ethereumGasSpend,
    polygonGasSpend,
  };
}

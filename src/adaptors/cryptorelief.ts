import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface CryptoReliefResult {
  amount: number;
}

export default async function getCryptoreliefData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error(
      'getCryptoreliefData: computeConfig does not contain CNVSEC_ID'
    );
  }
  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/etherscan?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as CryptoReliefResult;
  return {
    amount: 'amount' in json ? json?.amount : 0,
  };
}

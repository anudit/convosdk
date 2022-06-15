import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface GitcoinResult {
  success: boolean;
  error: string;
}

export default async function getGitcoinData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error('getGitcoinData: computeConfig does not contain CNVSEC_ID');
  }
  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/gitcoin?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as GitcoinResult;
  return {
    funder: Boolean(json.success) === false ? false : true,
  };
}

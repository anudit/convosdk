import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface EtherscanResult {
  success: boolean;
  error?: string;
  labels?: Array<string>;
}

export default async function getEtherscanData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error(
      'getEtherscanData: computeConfig does not contain CNVSEC_ID'
    );
  }
  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/get?id=${computeConfig.CNVSEC_ID}&slug=etherscan&address=${address}`
  )) as EtherscanResult;
  return {
    labels: Boolean(json.success) === false ? [] : json.labels,
  };
}

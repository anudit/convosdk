import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface EtherscanResult {
  success: boolean;
  error?: string;
  labels?: Array<string>;
}

export default async function getEtherscanData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getEtherscanData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/etherscan?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as EtherscanResult;
  return {
    labels: Boolean(json.success) === false ? [] : json.labels,
  };
}

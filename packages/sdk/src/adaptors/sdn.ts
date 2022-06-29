import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface SdnResult {
  error?: string;
  reports: Array<string>;
}

export default async function getSdnData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getSdnData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/sdn?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as SdnResult;

  if ('error' in json == true) return false;
  else return json?.reports;
}

import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface HiveoneResult {
  success: boolean;
  error?: string;
}

export default async function getHiveOneData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getHiveOneData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/hiveone?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as HiveoneResult;

  const { success, ...data } = json;

  if (success === true) {
    return data;
  } else {
    return false;
  }
}

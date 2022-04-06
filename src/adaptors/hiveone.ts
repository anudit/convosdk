import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface HiveoneResult {
  success: boolean;
  error?: string;
}

export default async function getHiveOneData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error('getHiveOneData: computeConfig does not contain CNVSEC_ID');
  }
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

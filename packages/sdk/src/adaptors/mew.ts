import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface MewResult {
  success: boolean;
  comment: string;
  date: string;
}

export default async function getMewData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error('getMewData: computeConfig does not contain CNVSEC_ID');
  }
  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/mew?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as MewResult;

  const { success, ...data } = json;
  if (success == true) {
    return data;
  } else {
    return {};
  }
}

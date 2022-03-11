import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

export default async function getYupData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error('getYupData: computeConfig does not contain CNVSEC_ID');
  }
  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/yup?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

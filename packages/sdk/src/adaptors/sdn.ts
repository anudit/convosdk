import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

export default async function getSdnData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error('getSdnData: computeConfig does not contain CNVSEC_ID');
  }
  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/sdn?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

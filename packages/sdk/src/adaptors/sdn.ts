import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getSdnData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getSdnData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/sdn?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

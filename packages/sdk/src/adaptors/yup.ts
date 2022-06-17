import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getYupData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getYupData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/yup?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

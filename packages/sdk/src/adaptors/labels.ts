import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getLabelData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getLabelData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/labels?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

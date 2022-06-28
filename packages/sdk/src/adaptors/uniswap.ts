import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getSybilData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getSybilData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/uniswap?id=${computeConfig.CNVSEC_ID}&&address=${address}`
  );
  return json;
}

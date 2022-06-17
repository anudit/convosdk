import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getShowtimeData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getShowtimeData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/showtime?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

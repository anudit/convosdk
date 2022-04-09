import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

export default async function getShowtimeData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.CNVSEC_ID) === false) {
    throw new Error(
      'getShowtimeData: computeConfig does not contain CNVSEC_ID'
    );
  }
  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/showtime?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

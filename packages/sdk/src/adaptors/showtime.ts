import { AdaptorDeets, ComputeConfig } from '../types';
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

export const ShowtimeAdaptorDeets: AdaptorDeets = {
  id: 'showtime',
  name: 'Showtime',
  projectThumbnail:
    'ipfs://bafybeib4kjcl73cartizz53nxqiqlueoujout7ohw73y7cx6ealn7khiia/showtime.webp',
  projectUrl: 'https://showtime.xyz/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

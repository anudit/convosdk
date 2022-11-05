import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface MazuryResult {
  result: Array<any>;
}

export default async function getMazuryBadges(address: string) {
  const resp = (await fetcher(
    'GET',
    `https://mazury-production.herokuapp.com/badges/?issuer=mazury&limit=1000&offset=0&owner=${address}`
  )) as MazuryResult;

  return resp?.result.length > 0 ? resp?.result : false;
}

export const MazuryAdaptorDeets: AdaptorDeets = {
  id: 'mazury',
  name: 'Mazury',
  projectThumbnail:
    'ipfs://bafybeigerxd5odzwlnyq3rszz2blzathysb5pdp4lxqjfxnisebfdtppwy/mazury.webp',
  projectUrl: 'https://mazury.xyz/',
  requiredConfigKeys: [],
};

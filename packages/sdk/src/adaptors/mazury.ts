import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface MazuryResult {
  results: Array<any>;
}

export default async function getMazuryBadges(address: string) {
  const resp = (await fetcher(
    'GET',
    `https://mazury-production.herokuapp.com/badges/?issuer=mazury&limit=1000&offset=0&owner=${address}`
  )) as MazuryResult;

  return resp?.results.length > 0 ? resp?.results : false;
}

export const MazuryAdaptorDeets: AdaptorDeets = {
  id: 'mazury',
  name: 'Mazury',
  projectThumbnail:
    'ipfs://bafybeigerxd5odzwlnyq3rszz2blzathysb5pdp4lxqjfxnisebfdtppwy/mazury.webp',
  projectUrl: 'https://mazury.xyz/',
  requiredConfigKeys: [],
};

import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

export default async function getPoapData(address: string): Promise<number> {
  const data = (await fetcher(
    'GET',
    `https://api.poap.xyz/actions/scan/${address}`
  )) as Array<string>;

  return data.length;
}

export const PoapAdaptorDeets: AdaptorDeets = {
  id: 'poap',
  name: 'POAP',
  projectThumbnail:
    'ipfs://bafybeigvjsmjlv7rcut44ner6skg5z2jxft2svjvvntawvelp7vquni52m/poap.webp',
  projectUrl: 'https://poap.xyz/',
  requiredConfigKeys: [],
};

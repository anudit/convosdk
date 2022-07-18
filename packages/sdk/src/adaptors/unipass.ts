import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface UnipassResult {
  message: string;
  code: number;
  data: {
    id: string;
    score: number;
    level: number;
    details: {
      basic: number;
      defi: number;
      nft: number;
      governance: number;
      social: number;
      activity: number;
    };
    verified: {
      email: false;
      twitter: false;
      discord: false;
    };
    addresses: Array<string>;
  };
}

export default async function getUnipassData(address: string) {
  const data = (await fetcher(
    'GET',
    `https://api.unipass.id/user/${address}`
  )) as UnipassResult;

  if (data?.message === 'success' && data?.code === 2000) {
    return data.data;
  } else {
    return false;
  }
}

export const UnipassAdaptorDeets: AdaptorDeets = {
  id: 'unipass',
  name: 'Unipass',
  projectThumbnail:
    'ipfs://bafybeid64xg7kk7vatqfrfbhxalqw3bkrv4tgapf6molnnc24un6qpea2i/unipass.webp',
  projectUrl: 'https://unipass.id/',
  requiredConfigKeys: [],
};

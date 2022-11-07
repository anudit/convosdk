import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface ETHRankResult {
  score: number;
  rank: number;
}

export default async function getETHRankData(address: string) {
  try {
    const data = (await fetcher(
      'GET',
      `https://www.ethrank.io/api/address/${address}`
    )) as ETHRankResult;
    return data;
  } catch (error) {
    return {
      score: 0,
      rank: 0,
    };
  }
}

export const ETHRankAdaptorDeets: AdaptorDeets = {
  id: 'ethrank',
  name: 'ETHRank',
  projectThumbnail:
    'ipfs://bafybeifeexiq5ra5hbmgwgqybncboz7mhaxrvyusn5z6svtml23dl4xpau/arcx.webp',
  projectUrl: 'https://ethrank.io',
  requiredConfigKeys: [],
};

import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface DebankResult {
  data: {
    base_score: number;
    rank: number;
    social_coefficient: number;
    social_score: number;
    total_score: number;
  };
}

export default async function getDebankData(address: string) {
  try {
    const { data } = (await fetcher(
      'GET',
      `https://api.debank.com/social_ranking?id=${address}`
    )) as DebankResult;
    if ('base_score' in data) {
      return {
        base_score: data.base_score,
        rank: data.rank,
        social_coefficient: data.social_coefficient,
        social_score: data.social_score,
        total_score: data.total_score,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false
  }
}

export const DebankAdaptorDeets: AdaptorDeets = {
  id: 'debank',
  name: 'DeBank',
  projectThumbnail:
    'ipfs://bafybeifnz5iao33j3ntmz5pdbxoq7uiupmgh2dxxlhsy46ucwkbvr2zwy4/debank.webp',
  projectUrl: 'https://thedebank.com/',
  requiredConfigKeys: [],
};

import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

interface ArcxResult {
  total: string;
  data: Array<{
    account: string;
    protocol: string;
    score: string;
    metadata: Dictionary<string>;
  }>;
}

export default async function getArcxData(address: string) {
  try {
    const { data } = (await fetcher(
      'GET',
      `https://api.arcx.money/v1/scores?account=${address}&format=full`
    )) as ArcxResult;

    let totalScore = 0;

    for (let index = 0; index < data.length; index++) {
      const scoreData = data[index];
      if (scoreData['score'] !== null) {
        totalScore += parseFloat(scoreData['score']) / 10;
      }
    }
    return {
      totalScore,
      details: data,
    };
  } catch (error) {
    return {
      totalScore: 0,
      details: [],
    };
  }
}

export const ArcxAdaptorDeets: AdaptorDeets = {
  id: 'arcx',
  name: 'ArcX',
  projectThumbnail:
    'ipfs://bafybeifeexiq5ra5hbmgwgqybncboz7mhaxrvyusn5z6svtml23dl4xpau/arcx.webp',
  projectUrl: 'https://arcx.money',
  requiredConfigKeys: [],
};

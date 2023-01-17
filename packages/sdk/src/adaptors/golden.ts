import { getAddress } from 'ethers/lib/utils';
import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface GoldenResult {
  data: {
    leaderboardStats: {
      nodes: Array<{
        userId: string;
        points: number;
        pointsWithoutReward: number;
      }>;
    };
  };
}

export default async function getGoldenData(address: string) {
  try {
    const jsonData = (await gqlFetcher(
      'https://dapp.golden.xyz/graphql',
      `{
          leaderboardStats(
            condition: {userId: "${getAddress(address)}"}
          ) {
            nodes {
              userId
              points
              pointsWithoutReward
            }
          }
        }
        `
    )) as GoldenResult;

    if (jsonData['data']?.leaderboardStats?.nodes.length > 0) {
      return jsonData['data'].leaderboardStats.nodes;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const GoldenAdaptorDeets: AdaptorDeets = {
  id: 'golden',
  name: 'Golden',
  projectThumbnail:
    'ipfs://bafybeid62bau6sfbo3xodvom2he6nbhmw4j64qsaiv4l73yv2cncorgqmu/golden.webp',
  projectUrl: 'https://golden.xyz',
  requiredConfigKeys: [],
};

import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface KarmaResult {
  statusCode?: number;
  data: {
    delegates: Array<{
      score: number;
      name: string;
    }>;
  };
}

export default async function getKarmaData(address: string) {
  try {
    const json = (await fetcher(
      'GET',
      `https://api.showkarma.xyz/api/user/${address.toLowerCase()}`
    )) as KarmaResult;

    if (Object.keys(json).includes('statusCode') === true) {
      return false;
    } else {
      let score = 0;
      const daos = [];
      for (let index = 0; index < json.data.delegates.length; index++) {
        const daodata = json.data.delegates[index];
        score += daodata['score'] / 1000;
        daos.push(daodata['name']);
      }
      return {
        score,
        daos,
      };
    }
  } catch (error) {
    return false;
  }
}

export const KarmaAdaptorDeets: AdaptorDeets = {
  id: 'karma',
  name: 'Karma',
  projectThumbnail:
    'ipfs://bafybeifdnm2g6t5yvsfa4yune7wgrvbymeallrzh572opnskecg6xex4vu/karma.webp',
  projectUrl: 'https://www.showkarma.xyz',
  requiredConfigKeys: [],
};

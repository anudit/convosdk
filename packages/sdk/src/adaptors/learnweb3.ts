import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface LearnWeb3Resp {
  data: {
    badges: Array<{
      tokenId: string;
    }>;
  };
}

export default async function getLearnWeb3Data(address: string) {
  // TODO: Migrate to Subgraph Studio, requires Polygon support.
  try {
    const response = (await gqlFetcher(
      'https://api.thegraph.com/subgraphs/name/anudit/learnweb3',
      `{
        badges(where: {userAddress: "${address.toLowerCase()}"}) {
          tokenId
        }
      }`
    )) as LearnWeb3Resp;

    if (response['data']['badges'].length > 0) {
      const badges = [];
      for (let index = 0; index < response['data']['badges'].length; index++) {
        const badge = response['data']['badges'][index];
        if (badge.tokenId === '0') badges.push('Freshman Graduate 🎓');
        if (badge.tokenId === '1') badges.push('Sophomore Graduate 🎓');
        if (badge.tokenId === '2') badges.push('Junior Graduate 🎓');
      }
      return {
        badges,
      };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const Learnweb3AdaptorDeets: AdaptorDeets = {
  id: 'learnweb3',
  name: 'LearnWeb3',
  projectThumbnail:
    'ipfs://bafybeiaa6qesfta3tyl74se33rph7sanpbypffuohwxxsuxl5mycheftam/learnweb3.webp',
  projectUrl: 'https://www.learnweb3.io/',
  requiredConfigKeys: [],
};

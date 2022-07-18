import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface HuddlnResult {
  data: {
    scoreboards: null | Array<string>;
  };
}

export default async function getHuddlnData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/bcaklovi/huddln-xp-system',
    `{
        scoreboards(where:{address:"${address.toLowerCase()}"}) {
          scores {
            scoreType
            points
            project {
              name
            }
          }
          totalScore
        }
    }`
  )) as HuddlnResult;

  if (data.scoreboards != null) {
    return data.scoreboards[0];
  } else {
    return false;
  }
}

export const HuddlnAdaptorDeets: AdaptorDeets = {
  id: 'huddln',
  name: 'Huddln',
  projectThumbnail:
    'ipfs://bafybeidnn2ds4ojl7zm4amtbaqoeucj7t42zw2bsfgq4cxuaa33v7adilu/huddln.webp',
  projectUrl: 'https://www.huddln.io/',
  requiredConfigKeys: [],
};

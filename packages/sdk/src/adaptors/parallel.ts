import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface ParallelResult {
  data: {
    parallelIDs: Array<any>;
  };
}

export default async function getParallelData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/parallel-identity',
    `{
        parallelIDs(where: {owner: "${address.toLowerCase()}" }) {
            owner
            tokenId
            traits
            subjectType
            isSanctionSafe
            metadata{
                description
                name
                attributes
                background_color
                animation_url
            }
        }
    }`
  )) as ParallelResult;

  return jsonData?.data?.parallelIDs.length > 0
    ? jsonData.data.parallelIDs
    : false;
}

export const ParallelAdaptorDeets: AdaptorDeets = {
  id: 'parallel',
  name: 'Parallel Identity',
  projectThumbnail:
    'ipfs://bafybeicatpthjnieqrezua5naoeh3yyvboc4z5mirtwtztywvcgi6tsha4/projectgalaxy.webp',
  projectUrl: 'https://parallelid.com/',
  requiredConfigKeys: [],
};

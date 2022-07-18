import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface EmblemResult {
  data: {
    allRankings: {
      nodes: Array<{
        soulScore: number;
        rank: number;
      }>;
    };
  };
}

/**
 * @deprecated
 */
export default async function getEmblemData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://emblem-api.onrender.com/graphql',
    `{
        allRankings(condition: {winnerId: "${address.toLowerCase()}", roleId: null}){
          nodes{
            soulScore
            rank
          }
        }
    }`
  )) as EmblemResult;

  return Boolean(jsonData['data']['allRankings']['nodes'][0]) === true
    ? jsonData['data']['allRankings']['nodes'][0]
    : false;
}

export const EmblemAdaptorDeets: AdaptorDeets = {
  id: 'emblem',
  name: 'Emblem',
  projectThumbnail:
    'ipfs://bafybeifxtzelu7z4m5g5w2ads5xb3e7lqtiv6ulmqaewl73kiv46pgr2rq/emblem.webp',
  projectUrl: 'https://emblemdao.com/',
  requiredConfigKeys: [],
};

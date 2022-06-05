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

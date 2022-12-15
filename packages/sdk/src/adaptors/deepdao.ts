import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';
interface DeepdaoResp {
  totalDaos: number;
  totalProposals: number;
  totalVotes: number;
  participationScore: number;
  relativeScore: number;
  participationScoreRank: number;
}

export default async function getDeepDaoData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://deepdao-server.deepdao.io/user/${address.toLowerCase()}`
  )) as DeepdaoResp;
  if ('message' in json) {
    return false;
  } else {
    return {
      score: json.participationScore,
      rank: json.participationScoreRank,
      relativeScore: json.relativeScore,
      daos: json.totalDaos,
      proposals: json.totalProposals,
      votes: json.totalVotes,
    };
  }
}

export const DeepdaodaptorDeets: AdaptorDeets = {
  id: 'deepdao',
  name: 'DeepDAO',
  projectThumbnail:
    'ipfs://bafybeie3ae7x22g4gew436khmacyi76nnfh65t46pmzemnerutj5titbqi/deepdao.webp',
  projectUrl: 'https://deepdao.io/',
  requiredConfigKeys: [],
};

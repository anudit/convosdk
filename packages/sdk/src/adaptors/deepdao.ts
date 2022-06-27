import { fetcher } from '../utils';

interface DeepdaoResp {
  totalDaos: number;
  totalOrgs: number;
  totalProposals: number;
  totalVotes: number;
  participationScore: number;
  relativeScore: number;
  participationScoreRank: number;
  daos: Array<string>;
}

export default async function getDeepDaoData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://golden-gate-server.deepdao.io/user/2/${address.toLowerCase()}`
  )) as DeepdaoResp;

  if ('message' in json) {
    return false;
  } else {
    return {
      score: json.relativeScore,
      rank: json.participationScoreRank,
      relativeScore: json.relativeScore,
      proposals: json.totalProposals,
      votes: json.totalVotes,
      daos: json.daos,
    };
  }
}

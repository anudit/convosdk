import { fetcher } from '../utils';

interface DeepdaoResp {
  name: string;
  description: string;
  website: string;
  avatar: string;
  aum: string;
  personalInfo: string;
  totalAum: string;
  createdAt: string;
  github: string;
  twitter: string;
  totalDaos: number;
  totalOrgs: number;
  totalProposals: string;
  totalVotes: string;
  proposalsAmount: string;
  participationScore: number | string;
  relativeScore: number;
  daos: Array<any>;
}

export default async function getDeepDaoData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://golden-gate-server.deepdao.io/user/2/${address}`
  )) as DeepdaoResp;

  const resp = {
    score: json?.participationScore === 'N/A' ? 0 : json.participationScore,
    daos: json?.totalDaos,
    orgs: json?.totalOrgs,
    proposals: parseInt(json?.totalProposals),
    votes: parseInt(json?.totalVotes),
    relativeScore: json?.relativeScore,
  };

  return resp;
}

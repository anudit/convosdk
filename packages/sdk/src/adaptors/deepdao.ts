import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';
interface DeepdaoResp {
  message: string;
  data: {
    score: number;
    rank: number;
  relativeScore: number;
    daos: number;
    proposals: number;
    votes: number;
  };
}
export default async function getDeepDaoData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://api.deepdao.io/v0.1/people/participation_score/${address.toLowerCase()}`,
    '',
    {},
    {
      'x-api-key': 'mAWyZ3pG2m8tGnrNgRrEw4b0UheQYE9d5yWGEK0H',
    }
  )) as DeepdaoResp;
  if ('message' in json) {
    return false;
  } else {
    return {
      score: json.data?.score,
      rank: json.data?.rank,
      relativeScore: json.data?.relativeScore,
      daos: json.data?.daos,
      proposals: json.data?.proposals,
      votes: json.data?.votes,
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

import { ComputeConfig, Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function getDeepDaoData(
  address: string,
  computeConfig: ComputeConfig
) {
  const json: Dictionary<Dictionary<any>> = await fetcher(
    'GET',
    `https://api.deepdao.io/v0.1/participation-score/address/${address}`,
    '',
    {},
    {
      'x-api-key': computeConfig.deepdaoApiKey,
    }
  );

  let resp = {
    score: 0,
    rank: 0,
    relativeScore: 0,
    daos: 0,
    proposals: 0,
    votes: 0,
  };

  resp = {
    ...resp,
    ...json['data'],
  };

  return resp;
}

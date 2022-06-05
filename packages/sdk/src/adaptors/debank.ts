import { fetcher } from '../utils';

interface DebankResult {
  data: {
    base_score: number;
    rank: number;
    social_coefficient: number;
    social_score: number;
    total_score: number;
  };
}

export default async function getDebankData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://api.debank.com/social_ranking?id=${address}`
  )) as DebankResult;
  if ('base_score' in json) {
    return {
      base_score: json.data.base_score,
      rank: json.data.rank,
      social_coefficient: json.data.social_coefficient,
      social_score: json.data.social_score,
      total_score: json.data.total_score,
    };
  } else {
    return false;
  }

  return json.data;
}

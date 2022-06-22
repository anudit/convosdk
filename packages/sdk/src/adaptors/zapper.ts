import { ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface ZapperResult {
  address: string;
  followedCount: number;
  followerCount: number;
  level: number;
  levelUpXpRequired: number;
  pendingZp: number;
  xp: number;
  zp: number;
}

export default async function getZapperData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getZapperData', computeConfig, ['zapperApiKey']);

  const jsonData = (await fetcher(
    'GET',
    `https://api.zapper.fi/v1/gamification/users/${address.toLowerCase()}?api_key=${
      computeConfig.zapperApiKey
    }`
  )) as ZapperResult;

  return {
    followers: jsonData?.followerCount,
    following: jsonData?.followedCount,
    xp: jsonData?.address,
    zp: jsonData?.zp,
  };
}

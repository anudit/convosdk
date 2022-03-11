import { fetcher } from '../utils';

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

export default async function getZapperData(address: string) {
  const jsonData = (await fetcher(
    'GET',
    `https://api.zapper.fi/v1/gamification/users/${address.toLowerCase()}?api_key=cbaadb5b-92d2-4479-9a96-ee804989e27a`
  )) as ZapperResult;

  return {
    followers: jsonData?.followerCount,
    following: jsonData?.followedCount,
    xp: jsonData?.address,
    zp: jsonData?.zp,
  };
}

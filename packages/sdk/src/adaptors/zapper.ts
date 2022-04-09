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
    `https://api.zapper.fi/v1/gamification/users/${address.toLowerCase()}?api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241`
  )) as ZapperResult;

  return {
    followers: jsonData?.followerCount,
    following: jsonData?.followedCount,
    xp: jsonData?.address,
    zp: jsonData?.zp,
  };
}

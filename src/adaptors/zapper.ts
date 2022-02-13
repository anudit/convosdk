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

export default async function geZapperData(address: string) {
  const jsonData = (await fetcher(
    'GET',
    `https://api.zapper.fi/v1/gamification/users/${address.toLowerCase()}?api_key=562eee97-e90e-42ac-8e7b-363cdff5cdaa`
  )) as ZapperResult;

  return {
    followers: jsonData?.followerCount,
    following: jsonData?.followedCount,
    xp: jsonData?.address,
    zp: jsonData?.zp,
  };
}

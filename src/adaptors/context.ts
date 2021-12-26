import { fetcher } from '../utils';

interface ContextResult {
  followerCount: number;
  followingCount: number;
}

export default async function getContextData(address: string) {
  const data = (await fetcher(
    'GET',
    'https://context.app/api/profile/' + address
  )) as ContextResult;

  return {
    followerCount: data.followerCount,
    followingCount: data.followingCount,
  };
}

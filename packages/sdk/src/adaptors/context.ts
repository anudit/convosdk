import { fetcher } from '../utils';

interface ContextResult {
  error?: boolean;
  followerCount: number;
  followingCount: number;
}

export default async function getContextData(address: string) {
  const data = (await fetcher(
    'GET',
    'https://context.app/api/profile/' + address
  )) as ContextResult;

  if (data?.error === true) return false;
  else if (Object.keys(data).includes('followerCount') === false) return false;
  else
    return {
      followerCount: data.followerCount,
      followingCount: data.followingCount,
    };
}

import { fetcher } from '../utils';

export default async function getCryptoscamdbData(address: string) {
  const data = await fetcher(
    'GET',
    `https://api.cryptoscamdb.org/v1/check/${address}`
  );

  return data;
}

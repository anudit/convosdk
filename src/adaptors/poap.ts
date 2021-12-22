import { fetcher } from '../utils';

export default async function getPoapData(address: string): Promise<boolean> {
  const data = await fetcher(
    'GET',
    `https://api.poap.xyz/actions/scan/${address}`
  );

  return data;
}

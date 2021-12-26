import { fetcher } from '../utils';

export default async function getPoapData(address: string): Promise<number> {
  const data = (await fetcher(
    'GET',
    `https://api.poap.xyz/actions/scan/${address}`
  )) as Array<string>;

  return data.length;
}

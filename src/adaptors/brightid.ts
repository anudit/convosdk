import { Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function checkBrightId(address: string): Promise<boolean> {
  const data: Dictionary<Dictionary<string>> = await fetcher(
    'GET',
    `https://app.brightid.org/node/v5/verifications/Convo/${address.toLowerCase()}`
  );

  return Boolean(data['data']?.unique);
}

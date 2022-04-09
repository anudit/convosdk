import { fetcher } from '../utils';

interface CryptoscamdbResult {
  input: string;
  success: boolean;
  message: string;
}

export default async function getCryptoscamdbData(address: string) {
  const data = (await fetcher(
    'GET',
    `https://api.cryptoscamdb.org/v1/check/${address}`
  )) as CryptoscamdbResult;

  return data.success;
}

import { getAddress } from 'ethers/lib/utils';
import { fetcher } from '../utils';

interface CryptoscamdbResult {
  input: string;
  success: boolean;
  message?: string;
  result?: {
    status: string;
    type: string;
    coin: string;
  };
}

export default async function getCryptoscamdbData(address: string) {
  const data = (await fetcher(
    'GET',
    `https://api.cryptoscamdb.org/v1/check/${getAddress(address)}`
  )) as CryptoscamdbResult;

  if (data.success === true && Object.keys(data).includes('result') === true) {
    return data.result;
  } else {
    return false;
  }
}

import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface UserResult {
  code: number;
  message: string;
  user: any;
}

export default async function getCoinviseData(
  address: string
): Promise<boolean> {
  try {
    const data: UserResult = await fetcher(
      'GET',
      `https://api.coinvise.co/user?slug=${address.toLowerCase()}`
    );

    if (Boolean(data?.code) === false && Boolean(data?.user) === true)
      return data['user'];
    else return false;
  } catch (error) {
    return false;
  }
}

export const CoinviseAdaptorDeets: AdaptorDeets = {
  id: 'coinvise',
  name: 'Coinvise',
  projectThumbnail:
    'ipfs://bafybeifuqglx7eqjd7fvvaljpsb4tn3focgaqvylqocu6bwekynqjxh6h4/coinvise.webp',
  projectUrl: 'https://www.coinvise.co',
  requiredConfigKeys: [],
};

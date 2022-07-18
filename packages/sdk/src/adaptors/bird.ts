import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface BirdResult {
  bird_rating: string;
  eth_balance: string;
  nbr_account_age_days: string;
  nbr_transaction_count: string;
}

export default async function getBirdData(address: string) {
  try {
    const data = (await fetcher(
      'GET',
      `https://www.bird.money/analytics/address/${address}`,
      '',
      {},
      {},
      10000
    )) as Array<BirdResult>;

    return 'error' in data ? false : data;
  } catch (error) {
    return false;
  }
}

export const BirdAdaptorDeets: AdaptorDeets = {
  id: 'bird',
  name: 'Bird',
  projectThumbnail:
    'ipfs://bafybeih4dwjzinkhtznwllfnb2xybakfigaiqsejaeik4mcy2gip7wr7t4/bird.webp',
  projectUrl: 'https://bird.money/',
  requiredConfigKeys: [],
};

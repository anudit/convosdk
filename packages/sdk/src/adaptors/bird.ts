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

    return data;
  } catch (error) {
    return {};
  }
}

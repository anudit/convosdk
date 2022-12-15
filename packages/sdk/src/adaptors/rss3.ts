import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface Rss3QueryResult {
  total: number,
  result: Array<string>
}

export default async function getRss3Data(address: string) {
  const jsonData = (await fetcher(
    'GET',
    `https://pregod.rss3.dev/v1/profiles/${address}`
  )) as Rss3QueryResult;

  return jsonData?.result?.length > 0 ? jsonData?.result : false
}

export const Rss3AdaptorDeets: AdaptorDeets = {
  id: 'rss3',
  name: 'Rss3',
  projectThumbnail:
    'ipfs://bafybeidgse3grhvqzcp23ndji4hxtnd4x3bjt7r5jel3zwdqcghyhc2oim/rss3.webp',
  projectUrl: 'https://rss3.io/',
  requiredConfigKeys: [],
};

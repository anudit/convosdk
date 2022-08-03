import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface ScanblocksResult {
  address_id: string;
  address: string;
  blockchain: string;
  reason: 'hacker' | 'phisher' | 'scammer' | 'fraudster' | '';
  describe_report: string;
  url: string;
}

export default async function getScanblocksData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://scanblocks.io/api/get?apikey=b4db18b757294ba9&blockchain=eth&address=${address.toLowerCase()}`
  )) as Array<ScanblocksResult>;

  if (json.length > 0) return json;
  else return false;
}

export const ScanblocksAdaptorDeets: AdaptorDeets = {
  id: 'scanblocks',
  name: 'ScanBlocks',
  projectThumbnail:
    'ipfs://bafybeidv3bh24wn6if7gxuyoq7nsydwytrhnvfefcdqkpigshq7zu3niru/scanblocks.webp',
  projectUrl: 'https://scanblocks.io/',
  requiredConfigKeys: [],
};

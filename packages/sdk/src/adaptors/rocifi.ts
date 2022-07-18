import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface Rocifi {
  data: {
    nfcss: Array<{
      id: string;
      score: number;
      lastUpdated: string;
    }>;
  };
}

export default async function getRocifiData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/sudeepb02/rocifi-lending-matic',
    `{
        nfcss(where: {owner: "${address.toLowerCase()}"}){
          id
          score
          lastUpdated
        }
    }`
  )) as Rocifi;

  if (jsonData['data'].nfcss.length > 0) {
    return jsonData['data'].nfcss[0];
  } else {
    return false;
  }
}

export const RocifiAdaptorDeets: AdaptorDeets = {
  id: 'rocifi',
  name: 'RociFi',
  projectThumbnail:
    'ipfs://bafybeih5shvxtmzxrblufp4ea2ewbvvfmifsosx6pwxej2fksngnl4zumm/rocifi.webp',
  projectUrl: 'https://roci.fi/',
  requiredConfigKeys: [],
};

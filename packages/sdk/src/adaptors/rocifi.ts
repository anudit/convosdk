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

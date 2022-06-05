import { gqlFetcher } from '../utils';

interface TokenBlacklistResult {
  data: {
    blacklists: Array<{
      id: string;
      usdt: boolean;
      usdc: boolean;
      busd: boolean;
    }>;
  };
}

export default async function getTokenBlacklistData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/tokenblacklists',
    `{
        blacklists(where: {id: "${address.toLowerCase()}"}) {
          id
          usdc
          usdt
          busd
        }
    }`
  )) as TokenBlacklistResult;

  return Boolean(jsonData.data.blacklists[0]) === true
    ? jsonData.data.blacklists[0]
    : false;
}

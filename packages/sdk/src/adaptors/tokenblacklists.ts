import { gqlFetcher } from '../utils';

interface TokenBlacklistResult {
  data: {
    blacklist: null | string;
  };
}

export default async function getTokenBlacklistData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.studio.thegraph.com/query/1649/token-blacklists/v1.2',
    `{
        blacklist(id: "${address.toLowerCase()}") {
          usdc
          usdt
          busd
          tusd
          euroc
          eurt
        }
    }`
  )) as TokenBlacklistResult;

  if (data.blacklist === null) return false;
  else return data.blacklist;
}

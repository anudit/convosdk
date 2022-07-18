import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface TokenBlacklistResult {
  data: {
    blacklist: null | string;
  };
}

export default async function getTokenBlacklistData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.studio.thegraph.com/query/1649/token-blacklists/v1.5',
    `{
        blacklist(id: "${address.toLowerCase()}") {
          usdc
          usdt
          busd
          tusd
          euroc
          eurt
          usdp
          lastUpdated
        }
    }`
  )) as TokenBlacklistResult;

  if (data.blacklist === null) return false;
  else return data.blacklist;
}

export const TokenblacklistsAdaptorDeets: AdaptorDeets = {
  id: 'tokenblacklists',
  name: 'Token Blacklists - Omnid',
  projectThumbnail:
    'ipfs://bafybeif655asxj6dh437nvnz3aap7gomxgni2nfsotxi3y33xbveroc75u/omnid.webp',
  projectUrl: 'https://omnid.space/',
  requiredConfigKeys: [],
};

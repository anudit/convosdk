import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface SeedchainResult {
  data: {
    transfers: Array<{
      id: string;
      to: {
        id: string;
      };
      value: string;
      tokenId: string;
    }>;
  };
}

export default async function getSeedchainData(address: string) {
  try {
    const { data } = (await gqlFetcher(
      'https://api.studio.thegraph.com/query/1649/seedchain/v1',
      `{
        transfers(where: {to:"${address.toLowerCase()}"}) {
          id
          to{
            id
          }
          value
        }
      }`
    )) as SeedchainResult;

    if (data?.transfers.length === 0) return false;
    else
      return data?.transfers.map((e) => {
        return {
          value: parseInt(e?.value),
          tokenId: parseInt(e?.tokenId),
        };
      });
  } catch (error) {
    return false;
  }
}

export const SeedchainAdaptorDeets: AdaptorDeets = {
  id: 'seedchain',
  name: 'Seedchain',
  projectThumbnail:
    'ipfs://bafybeif655asxj6dh437nvnz3aap7gomxgni2nfsotxi3y33xbveroc75u/omnid.webp',
  projectUrl: 'https://goerli.seedchain.org/',
  requiredConfigKeys: [],
};

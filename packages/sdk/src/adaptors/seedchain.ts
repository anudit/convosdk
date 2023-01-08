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

function sum(arr: Array<number> = []): number{
  let s = 0;
  for (let index = 0; index < arr.length; index++) {
    s+=arr[index];
  }
  return s;
}

export default async function getSeedchainData(address: string) {
  try {
    const { data } = (await gqlFetcher(
      'https://api.studio.thegraph.com/query/1649/seedchain/v1.1',
      `{
        transfers(where: {to:"${address.toLowerCase()}", tokenId: "100"}) {
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
      return sum(data?.transfers.map((e) => {
        return parseInt(e?.value)
      }));
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

import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

interface DapplistResult {
  dapps: Dictionary<object>;
  points: number;
  total: number;
}

export default async function getDapplistData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://apis.thedapplist.com/api/hunter-data/${address}?limit=1&offset=0`
  )) as DapplistResult;

  let resp = {
    score: 0,
    dapps: [] as Array<string>,
  };

  resp = {
    ...resp,
    score: json.total,
    dapps: Object.keys(json.dapps),
  };

  return resp;
}

export const DapplistAdaptorDeets: AdaptorDeets = {
  id: 'dapplist',
  name: 'The Dapp List',
  projectThumbnail:
    'ipfs://bafybeienmsbuquxbc7za5jgaa2gxm6fir4eorpujcwqkvzhefofsvhefde/dapplist.webp',
  projectUrl: 'https://thedapplist.com/',
  requiredConfigKeys: [],
};

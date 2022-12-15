import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface DapplistResult {
  statusCode: number;
  message: string;
  data?: any;
}

export default async function getDapplistData(address: string) {
  const json = (await fetcher(
    'GET',
    `https://api2.thedapplist.com/api/v2/users/${address}`
  )) as DapplistResult;

  if (json?.statusCode == 404) {
    return false;
  } else if (json?.message === 'user profile details') {
    return json?.data;
  } else {
    return false;
  }
}

export const DapplistAdaptorDeets: AdaptorDeets = {
  id: 'dapplist',
  name: 'The Dapp List',
  projectThumbnail:
    'ipfs://bafybeienmsbuquxbc7za5jgaa2gxm6fir4eorpujcwqkvzhefofsvhefde/dapplist.webp',
  projectUrl: 'https://thedapplist.com/',
  requiredConfigKeys: [],
};

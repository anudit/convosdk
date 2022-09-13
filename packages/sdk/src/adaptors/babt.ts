import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface BabtResult {
  data: {
    sbts: Array<any>;
  };
}

export default async function getBabtData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/binance-account-bound-token',
    `{
        sbts(where: {owner: "${address.toLowerCase()}"}) {
          id
          tokenId
          owner
          tokenURI
        }
    }`
  )) as BabtResult;

  if (jsonData['data'].sbts.length > 0) {
    return jsonData['data'].sbts[0];
  } else {
    return false;
  }
}

export const BabtAdaptorDeets: AdaptorDeets = {
  id: 'babt',
  name: 'Binance Account Bound Token',
  projectThumbnail:
    'ipfs://bafybeidqff4pbexxlyfd5v3cevcscjtrcryuvr3ov656djv4hm27ozrawu/commonsstack.webp',
  projectUrl:
    'https://www.binance.com/en/support/faq/bacaf9595b52440ea2b023195ba4a09c',
  requiredConfigKeys: [],
};

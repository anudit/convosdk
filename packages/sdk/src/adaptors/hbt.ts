import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface HbtResult {
  data: {
    hbts: Array<any>;
  };
}

export default async function getHbtData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/violet-hbt',
    `{
        hbts(where: {owner: "${address.toLowerCase()}"}) {
            id
            tokenId
            owner
            tokenURI
            metadata {
                name
                description
                image
                external_url
                animation_url
            }
        }
    }`
  )) as HbtResult;

  if (jsonData['data'].hbts.length > 0) {
    return jsonData['data'].hbts[0];
  } else {
    return false;
  }
}

export const HbtAdaptorDeets: AdaptorDeets = {
  id: 'hbt',
  name: 'HumanBound Token',
  projectThumbnail:
    'ipfs://bafybeifkxxcuo22gcvksokud23wcybcteq6kzzx5m2okdjhyzcu6ouzwhi/hbt.webp',
  projectUrl: 'https://humannound.xyz',
  requiredConfigKeys: [],
};

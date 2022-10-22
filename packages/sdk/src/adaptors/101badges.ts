import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface QueryResult {
  data: {
    user: {
      badgesCnt: number;
      badges: Array<any>;
    };
  };
}

export default async function get101badgesData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/101badges',
    `{
        user(id: "${address.toLowerCase()}"){
          badgesCnt
          badges {
            owner {
              id
            }
            tokenId
            badgeId
            mintedOn
            tokenURI
            metadata {
              name
              description
              image
              tags
              external_id
            }
          }
        }
      }`
  )) as QueryResult;

  if (jsonData?.data?.user?.badges.length > 0) {
    return jsonData['data'].user;
  } else {
    return false;
  }
}

export const OneZeroOneBadgesAdaptorDeets: AdaptorDeets = {
  id: '101badges',
  name: '101.xyz',
  projectThumbnail:
    'ipfs://bafybeicmfioz5ius5vmjeds3adsrizhhamrpgg6rbmminvijmf3z4c7cs4/101badges.webp',
  projectUrl: 'https://101.xyz',
  requiredConfigKeys: [],
};

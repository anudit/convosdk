import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface CommonsStackResult {
  data: {
    members: Array<{
      balance: number;
    }>;
  };
}

export default async function getCommonsstackData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/commons-stack/commons-stack-membership',
    `{
        members (where: {id: "${address.toLowerCase()}"}){
          balance
        }
    }`
  )) as CommonsStackResult;

  if (jsonData['data'].members.length > 0) {
    return jsonData['data'].members[0].balance;
  } else {
    return false;
  }
}

export const CommonsstackAdaptorDeets: AdaptorDeets = {
  id: 'commonsstack',
  name: 'Common Stack',
  projectThumbnail:
    'ipfs://bafybeidqff4pbexxlyfd5v3cevcscjtrcryuvr3ov656djv4hm27ozrawu/commonsstack.webp',
  projectUrl: 'https://commonsstack.org',
  requiredConfigKeys: [],
};

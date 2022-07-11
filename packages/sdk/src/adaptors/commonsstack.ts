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

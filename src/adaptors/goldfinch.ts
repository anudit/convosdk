import { gqlFetcher } from '../utils';

interface GoldfinchResult {
  data: Array<{
    goListed: boolean;
    type: string;
  }>;
}

export default async function getGoldfinchData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/goldfinch-eng/goldfinch',
    `{
      users(where: {id: "${address.toLowerCase()}"}) {
        goListed
        type
      }
    }`
  )) as GoldfinchResult;

  if (jsonData.data.length > 0) {
    return jsonData['data'][0];
  } else {
    return {};
  }
}

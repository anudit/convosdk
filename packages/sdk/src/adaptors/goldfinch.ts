import { gqlFetcher } from '../utils';

interface GoldfinchResult {
  data: {
    user: null | {
      goListed: boolean;
      type: string;
    };
  };
}

export default async function getGoldfinchData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/goldfinch-eng/goldfinch',
    `{
      user(id:"${address.toLowerCase()}"}) {
        goListed
        type
      }
    }`
  )) as GoldfinchResult;

  if (data?.user == null) return false;
  else return data?.user;
}

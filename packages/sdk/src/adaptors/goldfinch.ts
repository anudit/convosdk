import { gqlFetcher } from '../utils';

interface GoldfinchResult {
  data: {
    user: null | {
      isGoListed: boolean;
      type: 'BACKER' | 'CAPITAL_PROVIDER' | 'BORROWER';
    };
  };
}

export default async function getGoldfinchData(address: string) {
  const { data } = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/goldfinch-eng/goldfinch-v2',
    `{
      user(id:"${address.toLowerCase()}"}) {
        id
        type
        isNonUsIndividual
        isUsAccreditedIndividual
        isUsNonAccreditedIndividual
        isUsEntity
        isNonUsEntity
        isGoListed
      }
    }`
  )) as GoldfinchResult;

  if (data?.user == null) return false;
  else return data?.user;
}

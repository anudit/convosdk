import { AdaptorDeets } from '../types';
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

export const GoldfinchAdaptorDeets: AdaptorDeets = {
  id: 'goldfinch',
  name: 'Goldfinch',
  projectThumbnail:
    'ipfs://bafybeibp2nid2m3at33tetayvpvwf2selirppnyakpibnjaa2ba6hik74y/goldfinch.webp',
  projectUrl: 'https://goldfinch.finance',
  requiredConfigKeys: [],
};

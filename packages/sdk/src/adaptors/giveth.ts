import { AdaptorDeets, Dictionary } from '../types';
import { gqlFetcher } from '../utils';

interface GivethResult {
  data: {
    userByAddress: null | Dictionary<string>;
  };
}

export default async function getGivethData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://mainnet.serve.giveth.io/graphql',
    `query UserByAddress($address: String!) {
        userByAddress(address: $address) {
            id
            firstName
            lastName
            name
            email
            avatar
            walletAddress
            url
            location
            totalDonated
            totalReceived
            likedProjectsCount
            projectsCount
            donationsCount
        }
    }`,
    {
      address: address,
    }
  )) as GivethResult;

  if (jsonData['data'].userByAddress != null) {
    return jsonData['data'].userByAddress;
  } else {
    return false;
  }
}

export const GivethAdaptorDeets: AdaptorDeets = {
  id: 'giveth',
  name: 'Giveth',
  projectThumbnail:
    'ipfs://bafybeihuu32boog5z7hosphx6frhwje3zauot3ojmx5sc2dlqfxx6xd66m/giveth.webp',
  projectUrl: 'https://giveth.io',
  requiredConfigKeys: [],
};

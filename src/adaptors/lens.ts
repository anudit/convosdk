import { gqlFetcher } from '../utils';

interface LensQueryResult {
  data: {
    profiles: Array<{
      profileId: string;
      pubCount: string;
      followModule: string;
      followNFT: string;
      handle: string;
      imageURI: string;
      followNFTURI: string;
    }>;
  };
}

export default async function getLensData(address: string) {
  try {
    const response = (await gqlFetcher(
      'https://api.thegraph.com/subgraphs/id/QmcDcCZFv2SSEwsW82CfzLvDwiLEmQj7AnPhY9N7GxZLcR',
      `{
        profiles(where: {id: "${address.toLowerCase()}"}) {
          id
          profileId
          pubCount
          handle
          imageURI
        }
      }`
    )) as LensQueryResult;

    if (response['data']['profiles'].length > 0) {
      return {
        profileId: parseInt(response['data']['profiles'][0].profileId),
        pubCount: parseInt(response['data']['profiles'][0].pubCount),
        handle: response['data']['profiles'][0].handle,
        imageURI: response['data']['profiles'][0].imageURI,
      };
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

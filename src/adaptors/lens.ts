import { gqlFetcher } from '../utils';

type Profile = Array<{
  profileId: string;
  pubCount: string;
  followModule: string;
  followNFT: string;
  handle: string;
  imageURI: string;
  followNFTURI: string;
}>;

interface LensQueryResult {
  data: {
    profiles: Profile;
    socialGraphs: Array<{
      following: Profile;
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
        socialGraphs(where: {id: "${address.toLowerCase()}"}) {
          following {
            handle
          }
        }
      }`
    )) as LensQueryResult;

    if (response['data']['profiles'].length > 0) {
      return {
        profileId: parseInt(response['data']['profiles'][0].profileId),
        pubCount: parseInt(response['data']['profiles'][0].pubCount),
        handle: response['data']['profiles'][0].handle,
        imageURI: response['data']['profiles'][0].imageURI,
        following:
          response['data']['socialGraphs'].length > 0
            ? response['data']['socialGraphs'][0].following.length
            : 0,
      };
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

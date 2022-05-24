import { gqlFetcher } from '../utils';

type Profile = {
  id: string;
  name: string;
  bio: string;
  attributes: Array<string>;
  metadata: string;
  isDefault: boolean;
  picture: {
    original: {
      url: string;
      mimeType: string;
    };
  };
  handle: string;
  coverPicture: string;
  ownedBy: string;
  dispatcher: string;
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    totalPosts: number;
    totalComments: number;
    totalMirrors: number;
    totalPublications: number;
    totalCollects: number;
  };
  followModule: {
    type: string;
  };
};

interface LensQueryResult {
  data: {
    profiles: {
      items: Array<Profile>;
    };
  };
}

export default async function getLensData(address: string) {
  try {
    const response = (await gqlFetcher(
      'https://api.lens.dev/',
      `query Profiles {
        profiles(request: { ownedBy: ["${address}"], limit: 10 }) {
          items {
            id
            name
            bio
            attributes {
              displayType
              traitType
              key
              value
            }
            metadata
            isDefault
            picture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
            }
            handle
            coverPicture {
              ... on NftImage {
                contractAddress
                tokenId
                uri
                verified
              }
              ... on MediaSet {
                original {
                  url
                  mimeType
                }
              }
            }
            ownedBy
            dispatcher {
              address
              canUseRelay
            }
            stats {
              totalFollowers
              totalFollowing
              totalPosts
              totalComments
              totalMirrors
              totalPublications
              totalCollects
            }
            followModule {
              ... on FeeFollowModuleSettings {
                type
                amount {
                  asset {
                    symbol
                    name
                    decimals
                    address
                  }
                  value
                }
                recipient
              }
              ... on ProfileFollowModuleSettings {
               type
              }
              ... on RevertFollowModuleSettings {
               type
              }
            }
          }
        }
      }`
    )) as LensQueryResult;

    if (response?.data?.profiles?.items.length > 0) {
      return response?.data?.profiles?.items[0];
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
}

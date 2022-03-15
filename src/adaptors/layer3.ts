import { gqlFetcher } from '../utils';

interface Layer3Result {
  data: {
    user: {
      address: string;
      contributions: Array<string>;
      gmStreak: number;
      id: number;
      level: number;
      submissionStats: Array<string>;
      twitterUsername: string;
      username: string;
      xp: number;
      xpRequiredForNextLevel: number;
    };
  };
}

export default async function getLayer3Data(address: string) {
  const jsonData = (await gqlFetcher(
    'https://beta.layer3.xyz/api/graphql',
    `query GetUserFromAddress($address: String!) {
        user(address: $address) {
          ...ProfilePageFields
          __typename
        }
      }

      fragment ProfilePageFields on User {
        coverCid
        ...UserCardFields
        contributions {
          numberOfContributions
          Dao {
            id
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        submissionStats {
          numberOfSubmissions
          Dao {
            id
            namespace
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        __typename
      }

      fragment UserCardFields on User {
        id
        username
        avatarCid
        address
        twitterUsername
        level
        xp
        xpRequiredForNextLevel
        gmStreak
        contributions {
          numberOfContributions
          Dao {
            id
            ...DaoLogoFields
            __typename
          }
          __typename
        }
        __typename
      }

      fragment DaoLogoFields on Dao {
        name
        logoCid
        __typename
    }`,
    { address: address }
  )) as Layer3Result;

  return jsonData['data'];
}

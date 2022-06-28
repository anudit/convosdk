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
  const { data } = (await gqlFetcher(
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
      discordDiscriminator
      discordId
      discordUsername
      githubId
      githubUsername
      websiteUrl
      numberOfContestSubmissions
      numberOfBountyClaims
      numberOfProjectApplications
      contributions {
        numberOfContributions
        Dao {
          id
          ...DaoLogoFields
          __typename
        }
        __typename
      }
      UserSkills {
        Skill {
          ...SkillFields
          __typename
        }
        __typename
      }
      __typename
    }

    fragment UserCardFields on User {
      ...UserAvatarFields
      twitterUsername
      twitterId
      level
      xp
      xpRequiredForNextLevel
      gmStreak
      discordId
      discordUsername
      discordDiscriminator
      websiteUrl
      githubId
      githubUsername
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

    fragment UserAvatarFields on User {
      id
      username
      address
      avatarCid
      __typename
    }

    fragment DaoLogoFields on Dao {
      name
      logoCid
      __typename
    }

    fragment SkillFields on Skill {
      id
      name
      emoji
      __typename
    }
    `,
    { address: address }
  )) as Layer3Result;

  return Boolean(data) === true ? data : false;
}

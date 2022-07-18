import { AdaptorDeets, Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function getMetagameData(address: string) {
  try {
    const data = (await gqlFetcher(
      'https://api.metagame.wtf/v1/graphql',
      `query GetPlayers($orderBy: player_order_by!, $offset: Int, $limit: Int, $where: player_bool_exp, $forLoginDisplay: Boolean! = false) {
        player(
          order_by: [$orderBy, {ethereumAddress: desc}]
          offset: $offset
          limit: $limit
          where: $where
        ) {
          ...PlayerFragment
          __typename
        }
      }

      fragment PlayerFragment on player {
        totalXP
        seasonXP
        ethereumAddress
        rank
        skills  {
          Skill {
            category
            id
            name
            __typename
          }
          __typename
        }
        accounts(where: {type: {_in: [TWITTER, GITHUB]}}) @skip(if: $forLoginDisplay) {
          identifier
          type
          __typename
        }
        profile {
          name
          username
          description
          emoji
          profileImageURL
          bannerImageURL
          backgroundImageURL
          location
          countryCode
          website
          pronouns
          availableHours
          timeZone
          colorMask
          explorerTypeTitle
          __typename
        }
        daohausMemberships @skip(if: $forLoginDisplay) {
          id
          shares
          molochAddress
          moloch {
            id
            title
            version
            totalShares
            chain
            avatarURL
            __typename
          }
          __typename
        }
        brightid_status @skip(if: $forLoginDisplay) {
          unique
          contextIds
          __typename
        }
      }`,
      {
        orderBy: {
          seasonXP: 'desc',
        },
        offset: 0,
        limit: 9,
        forLoginDisplay: false,
        where: {
          _or: [
            {
              profile: {
                username: {
                  _ilike: `%${address.toLowerCase()}%`,
                },
              },
            },
            {
              ethereumAddress: {
                _ilike: `%${address.toLowerCase()}%`,
              },
            },
          ],
        },
      }
    )) as Dictionary<Dictionary<Array<string>>>;

    if (data['data']['player'].length > 0) {
      return data['data']['player'][0];
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const MetagameAdaptorDeets: AdaptorDeets = {
  id: 'metagame',
  name: 'Metagame',
  projectThumbnail:
    'ipfs://bafybeihncsbzollj6dqyuacipy7ehoo6bo362idnsuzzpqbx7v2fgmgrvq/metagame.webp',
  projectUrl: 'https://metagame.wtf/',
  requiredConfigKeys: [],
};

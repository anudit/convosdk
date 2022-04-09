import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function getMetagameData(address: string) {
  const data = (await gqlFetcher(
    'https://hasura-7s6e.onrender.com/v1/graphql',
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
      player_aggregate(where: $where) {
        aggregate {
          count
          __typename
        }
        __typename
      }
    }

    fragment PlayerFragment on player {
      id @skip(if: $forLoginDisplay)
      totalXP @skip(if: $forLoginDisplay)
      seasonXP @skip(if: $forLoginDisplay)
      rank @skip(if: $forLoginDisplay)
      ethereumAddress
      profileLayout @skip(if: $forLoginDisplay)
      skills @skip(if: $forLoginDisplay) {
        Skill {
          category
          id
          name
          __typename
        }
        __typename
      }
      roles(order_by: {rank: asc}) @skip(if: $forLoginDisplay) {
        role
        rank
        PlayerRole {
          label
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
    }
    `,
    {
      orderBy: {
        seasonXP: 'desc',
      },
      offset: 0,
      limit: 9,
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
    return {};
  }
}

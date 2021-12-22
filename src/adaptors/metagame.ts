import { Dictionary } from '../types';
import { gqlFetcher } from '../utils';

export default async function getMetagameData(address: string) {
  const data = (await gqlFetcher(
    'https://hasura-7s6e.onrender.com/v1/graphql',
    `
  {
    player(where:{ ethereum_address: {_eq: "${address.toLowerCase()}"}}){
      box_profile {
        name
        job
        location
        website
        emoji
        coverImageURL
      }
      total_xp
      username
      season_xp
      role
      rank
    }
  }
  `
  )) as Dictionary<Dictionary<Array<string>>>;

  if (data['data']['player'].length > 0) {
    return data['data']['player'][0];
  } else {
    return {};
  }
}

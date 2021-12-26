import { Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function getCoordinapeData(address: string) {
  try {
    const json = (await fetcher(
      'GET',
      `https://api.coordinape.com/api/v2/profile/${address}`,
      '',
      {},
      {
        authorization: 'Bearer 1693|Ku84NovTfLAyhjvWAIlTdwH0PBuGHwTWHRhtcsww',
      }
    )) as Dictionary<Array<Dictionary<Array<string>>>>;
    let teammates = 0;

    if (Boolean(json?.users) === true) {
      json['users'].forEach((user) => {
        teammates += user.teammates.length;
      });
    }

    return {
      teammates,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

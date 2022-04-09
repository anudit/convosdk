import { fetcher } from '../utils';

export default async function getPolygonData(address = '') {
  try {
    const json = (await fetcher(
      'POST',
      `https://analytics.polygon.technology/score/user-latest?address=${address}`
    )) as Array<any>;

    if (json.length > 0) {
      return json[0];
    } else {
      return {
        Score100: 0,
      };
    }
  } catch (error) {
    return {
      Score100: 0,
    };
  }
}

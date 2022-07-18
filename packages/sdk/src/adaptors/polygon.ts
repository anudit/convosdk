import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

export default async function getPolygonData(address = '') {
  try {
    const json = (await fetcher(
      'POST',
      `https://analytics.polygon.technology/score/user-latest?address=${address}`
    )) as Array<any>;

    if (json.length > 0) return json[0];
    else return false;
  } catch (error) {
    return false;
  }
}

export const PolygonAdaptorDeets: AdaptorDeets = {
  id: 'polygon',
  name: 'Polygon Analytics',
  projectThumbnail:
    'ipfs://bafybeiafif2n3pjw5k6zsvojxjkqp5gmtnathev5xdvrfpp2q5zkg4evkq/polygon.webp',
  projectUrl: 'https://polygon.technology/',
  requiredConfigKeys: [],
};

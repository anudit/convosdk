import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

/**
 * @deprecated
 */
export default async function getCoordinapeData(address: string) {
  try {
    const json = (await fetcher(
      'GET',
      `https://api.coordinape.com/api/v2/profile/${address}`,
      '',
      {},
      {
        authorization: '',
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
    return false;
  }
}

export const CoordinapeAdaptorDeets: AdaptorDeets = {
  id: 'coordinape',
  name: 'Coordinape',
  projectThumbnail:
    'ipfs://bafybeibqjjtpcymqzs4ha7542nitglifxfwcbdhmggiwtembqfuroaxzmq/coordinape.webp',
  projectUrl: 'https://coordinape.com',
  requiredConfigKeys: [],
};

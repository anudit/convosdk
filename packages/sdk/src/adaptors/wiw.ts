import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

export default async function getWiwData(
  address: string
) {
  const json = await fetcher(
    'GET',
    `https://advanced-api.wiw.io/badges/address/${address}`,
    '',
    {},
    {
        'Authorization': 'SiTjGCHbdACja4fzxFXGwebpZAaydJQT'
    }
  );
  return json;
}

export const WiwAdaptorDeets: AdaptorDeets = {
  id: 'wiw',
  name: 'WIW',
  projectThumbnail:
    'ipfs://bafybeigzrduey2lvi7fz6lbv567rxlynjww6khv24w4duwqgnjtkcjlthe/wiw.webp',
  projectUrl: 'https://wiw.io/',
  requiredConfigKeys: [],
};

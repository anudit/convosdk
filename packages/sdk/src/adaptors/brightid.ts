import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function checkBrightId(address: string): Promise<boolean> {
  try {
    const data: Dictionary<Dictionary<string>> = await fetcher(
      'GET',
      `https://app.brightid.org/node/v5/verifications/Convo/${address.toLowerCase()}`
    );

    return Boolean(data['data']?.unique);
  } catch (error) {
    return false;
  }
}

export const BrightidAdaptorDeets: AdaptorDeets = {
  id: 'brightid',
  name: 'Brightid',
  projectThumbnail:
    'ipfs://bafybeicuxydcmozemzvih35nfk7wfizkvbqlrwfrbht3j25qsbwayhuoaa/brightid.webp',
  projectUrl: 'https://brightid.org/',
  requiredConfigKeys: [],
};

import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface IdenaResult {
  error?: {
    message: string;
  };
  result?: {
    state: string;
  };
}

export default async function checkIdena(address: string) {
  try {
    const json = (await fetcher(
      'GET',
      `https://api.idena.io/api/identity/${address}`
    )) as IdenaResult;

    if (Boolean(json?.error) === true) {
      return false;
    } else {
      return json?.result;
    }
  } catch (error) {
    return false;
  }
}

export const IdenaAdaptorDeets: AdaptorDeets = {
  id: 'idena',
  name: 'Idena',
  projectThumbnail:
    'ipfs://bafybeidygte5t5nvm5tjmeiplo7zletlc7om4fyb7464okumpocy5tjm3e/idena.webp',
  projectUrl: 'https://idena.io',
  requiredConfigKeys: [],
};

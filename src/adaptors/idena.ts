import { fetcher } from '../utils';

interface IdenaResult {
  error?: {
    message: string;
  };
  value?: {
    result: boolean;
  };
}

export default async function checkIdena(address: string) {
  try {
    const json = (await fetcher(
      'GET',
      `https://api.idena.io/api/Address/${address}`
    )) as IdenaResult;

    if (Boolean(json.error) === true) {
      return false;
    } else {
      return Boolean(json?.value?.result);
    }
  } catch (error) {
    return false;
  }
}

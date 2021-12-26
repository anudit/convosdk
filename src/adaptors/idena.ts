import { fetcher } from '../utils';

interface IdenaResult {
  value: {
    result: boolean;
  };
}

export default async function checkIdena(address: string) {
  const json = (await fetcher(
    'GET',
    `https://api.idena.io/api/Address/${address}`
  )) as IdenaResult;

  return json.value.result;
}

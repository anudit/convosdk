import { fetcher } from '../utils';

interface EnsResp {
  name: string | null;
}

export default async function addressToEns(address: string) {
  const resp = (await fetcher(
    'GET',
    `https://api.ensideas.com/ens/resolve/${address}`
  )) as EnsResp;

  if (resp.name === null) return false;
  else return resp.name;
}

import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

interface CredResult {
  account: string;
  report: Dictionary<any>;
  status_code: number;
  error?: any;
}

export default async function getCredProtocolData(
  address: string
): Promise<CredResult | false> {
  try {
    const data: CredResult = await fetcher(
      'GET',
      `https://beta.credprotocol.com/api/report/address/${address}`,
      '',
      {},
      {
        Authorization: 'Token 2222a65907941abafc360e03e7ffd80aeb5ce75f',
      }
    );

    if (data?.status_code || Boolean(data?.error)) return false;
    else return data;
  } catch (error) {
    return false;
  }
}

export const CredprotocolAdaptorDeets: AdaptorDeets = {
  id: 'credprotocol',
  name: 'Cred Protocol',
  projectThumbnail:
    'ipfs://bafybeigvespcfammsvpt7vizeohwdjyyolacppgmm4jchuqtn36v62cnxm/credprotocol.webp',
  projectUrl: 'https://credprotocol.com/',
  requiredConfigKeys: [],
};

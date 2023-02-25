import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface KycdaoResult {
  data: {
    kycValidities: Array<{
      user: string;
      validity: boolean;
      tokenId: string;
      expiry: string;
    }>;
  };
}

export default async function getKycdaoData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/anudit/kycdao',
    `{
        kycValidities(where: {user: "${address.toLowerCase()}"}) {
          user
          validity
          verifiedOn
          tokenId
          txnHash
          expiry
        }
    }`
  )) as KycdaoResult;

  if (jsonData['data'].kycValidities.length > 0) {
    return jsonData['data'].kycValidities[0].validity;
  } else {
    return false;
  }
}

export const KycdaoAdaptorDeets: AdaptorDeets = {
  id: 'kycdao',
  name: 'Kycdao',
  projectThumbnail:
    'ipfs://bafybeia6eljohjv3uwz2ebetyc5lmgnwl5uzkkekfwskwqp6ub7men4i6e/kycdao.webp',
  projectUrl: 'https://kycdao.xyz/',
  requiredConfigKeys: [],
};

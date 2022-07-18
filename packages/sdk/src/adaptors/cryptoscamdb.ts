import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface CryptoscamdbResult {
  reports: Array<any>;
}

export default async function getCryptoscamdbData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getCryptoscamdbData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/cryptoscamdb?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as CryptoscamdbResult;

  return {
    reports: 'reports' in json ? json.reports : false,
  };
}

export const CryptoscamdbAdaptorDeets: AdaptorDeets = {
  id: 'cryptoscamdb',
  name: 'Cryptoscamdb',
  projectThumbnail:
    'ipfs://bafybeievhwdlwhpw2ubtm5syddgco2armvs3kzjyv43oktlqq2f4rwqut4/cryptoscamdb.webp',
  projectUrl: 'https://cryptoscamdb.org/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

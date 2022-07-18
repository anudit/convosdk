import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface SdnResult {
  error?: string;
  reports: Array<string>;
}

export default async function getSdnData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getSdnData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/sdn?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as SdnResult;

  if ('error' in json == true) return false;
  else return json?.reports;
}

export const SdnAdaptorDeets: AdaptorDeets = {
  id: 'sdn',
  name: 'OFAC - Specially Designated Nationals',
  projectThumbnail:
    'ipfs://bafybeigxqpkbpgrhy5x3rcbvvtsv6sifq34h2am5lgq3xs6t3kcwkmrzpu/sdn.webp',
  projectUrl:
    'https://home.treasury.gov/policy-issues/financial-sanctions/specially-designated-nationals-and-blocked-persons-list-sdn-human-readable-lists',
  requiredConfigKeys: ['CNVSEC_ID'],
};

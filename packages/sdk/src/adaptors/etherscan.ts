import { AdaptorDeets, ComputeConfig, EtherscanResult } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getEtherscanData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getEtherscanData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/etherscan?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as EtherscanResult;
  return Object.keys(json).includes('error') === true
    ? false
    : { label: json.label, tags: json.tags };
}

export const EtherscanAdaptorDeets: AdaptorDeets = {
  id: 'etherscan',
  name: 'Etherscan',
  projectThumbnail:
    'ipfs://bafybeifieqqhcrljyfkztqethmnc2tfgcdfod6oakdzmv6h4ph5y7gef44/etherscan.webp',
  projectUrl: 'https://etherscan.io/',
  requiredConfigKeys: [],
};

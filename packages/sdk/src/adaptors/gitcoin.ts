import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface GitcoinResult {
  success: boolean;
  error: string;
}

export default async function getGitcoinData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getGitcoinData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/gitcoin?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as GitcoinResult;
  return {
    funder: Object.keys(json).includes('error') === true ? false : true,
  };
}

export const GitcoinAdaptorDeets: AdaptorDeets = {
  id: 'gitcoin',
  name: 'Gitcoin',
  projectThumbnail:
    'ipfs://bafybeigtfotbr3ubenlavqr5z6rihxhfgp525cjsmlbg3x27uzefy2htmq/gitcoin.webp',
  projectUrl: 'https://gitcoin.co/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getLabelData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getLabelData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/labels?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

export const LabelAdaptorDeets: AdaptorDeets = {
  id: 'labels',
  name: 'Labels - Omnid',
  projectThumbnail:
    'ipfs://bafybeif655asxj6dh437nvnz3aap7gomxgni2nfsotxi3y33xbveroc75u/omnid.webp',
  projectUrl: 'https://omnid.space/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

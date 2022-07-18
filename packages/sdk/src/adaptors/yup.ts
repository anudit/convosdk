import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getYupData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getYupData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/yup?id=${computeConfig.CNVSEC_ID}&address=${address}`
  );
  return json;
}

export const YupAdaptorDeets: AdaptorDeets = {
  id: 'yup',
  name: 'Yup',
  projectThumbnail:
    'ipfs://bafybeiatgk7643pvu5gsjrmsikgisj44tw652bh7d5iokhknwvs3twcki4/yup.webp',
  projectUrl: 'https://yup.io/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

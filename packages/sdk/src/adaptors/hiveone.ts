import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface HiveoneResult {
  success: boolean;
  error?: string;
}

export default async function getHiveOneData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getHiveOneData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/hiveone?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as HiveoneResult;

  const { error, ...data } = json;

  if (Boolean(error) === true) return false;
  else return data;
}

export const HiveoneAdaptorDeets: AdaptorDeets = {
  id: 'hiveone',
  name: 'Hive.one',
  projectThumbnail:
    'ipfs://bafybeibckyh7v7r7y3ys5nm75vsklltohrlbqtuor3k4r7xntwmqy4bvie/hiveone.webp',
  projectUrl: 'https://hive.one',
  requiredConfigKeys: ['CNVSEC_ID'],
};

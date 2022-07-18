import { getAddress } from 'ethers/lib/utils';
import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export default async function getAlchemyData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getAlchemyData', computeConfig, ['alchemyApiKey']);

  try {
    const isSpam = (await fetcher(
      'GET',
      `https://eth-mainnet.alchemyapi.io/nft/v2/${
        computeConfig.alchemyApiKey
      }/isSpamContract?contractAddress=${getAddress(address)}`
    )) as boolean;

    return isSpam;
  } catch (error) {
    return false;
  }
}

export const AlchemyAdaptorDeets: AdaptorDeets = {
  id: 'alchemy',
  name: 'Alchemy',
  projectThumbnail:
    'ipfs://bafybeibbpdaccux3g3njdv57mndmvor5bds4sllrdnigupsb7fex6gnv4a/alchemy.webp',
  projectUrl: 'https://alchemy.com',
  requiredConfigKeys: ['alchemyApiKey'],
};

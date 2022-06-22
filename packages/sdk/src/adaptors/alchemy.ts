import { getAddress } from 'ethers/lib/utils';
import { ComputeConfig } from '../types';
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

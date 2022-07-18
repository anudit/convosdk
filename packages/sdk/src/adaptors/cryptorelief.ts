import { AdaptorDeets, ComputeConfig } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface CryptoReliefResult {
  amount: number;
}

export default async function getCryptoreliefData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getCryptoreliefData', computeConfig, ['CNVSEC_ID']);

  const json = (await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/cryptorelief?id=${computeConfig.CNVSEC_ID}&address=${address}`
  )) as CryptoReliefResult;
  return {
    amount: 'amount' in json ? json?.amount : 0,
  };
}

export const CryptoreliefAdaptorDeets: AdaptorDeets = {
  id: 'cryptorelief',
  name: 'Cryptorelief',
  projectThumbnail:
    'ipfs://bafybeignln4gwzsypz2ejlkcltw34ziyejuajptdfdwq3gn3hokokjs7wi/cryptorelief.webp',
  projectUrl: 'https://cryptorelief.in/',
  requiredConfigKeys: ['CNVSEC_ID'],
};

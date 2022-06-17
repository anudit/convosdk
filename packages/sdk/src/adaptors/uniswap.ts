import { isAddress } from 'ethers/lib/utils';
import { ComputeConfig, Dictionary } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

export async function getAllSybilData() {
  const data = (await fetcher(
    'GET',
    'https://theconvo.space/gitcoindata.json'
  )) as Dictionary<string>;

  const addDb = [];
  for (let index = 0; index < data['addresses'].length; index++) {
    if (isAddress(data['addresses'][index][0]) === true) {
      addDb.push(data['addresses'][index][0]);
    }
  }

  return addDb;
}

export async function getSybilData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getSybilData', computeConfig, ['CNVSEC_ID']);

  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/omnid/uniswap?id=${computeConfig.CNVSEC_ID}&&address=${address}`
  );
  return json;
}

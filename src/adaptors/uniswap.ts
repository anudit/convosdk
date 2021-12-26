import { isAddress } from 'ethers/lib/utils';
import { ComputeConfig, Dictionary } from '../types';
import { fetcher } from '../utils';

export async function getAllGitcoinData() {
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

export async function getGitcoinData(
  address: string,
  computeConfig: ComputeConfig
) {
  const json = await fetcher(
    'GET',
    `https://cnvsec.vercel.app/api/get?id=${computeConfig.CNVSEC_ID}&slug=uniswap&address=${address}`
  );
  return json;
}

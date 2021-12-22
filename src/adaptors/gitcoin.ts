import { isAddress } from 'ethers/lib/utils';
import { Dictionary } from '../types';
import { fetcher } from '../utils';

export default async function getAllGitcoinData() {
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

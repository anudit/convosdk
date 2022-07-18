import { AdaptorDeets, Dictionary } from '../types';
import { fetcher } from '../utils';

interface Rss3QueryResult {
  profile: Dictionary<string>;
  '@backlinks': Array<Dictionary<string>>;
  accounts: Array<Dictionary<string>>;
  links: Array<Dictionary<string>>;
}

export default async function getRss3Data(address: string) {
  const jsonData = (await fetcher(
    'GET',
    `https://hub.pass3.me/${address}`
  )) as Rss3QueryResult;

  return {
    profile: Boolean(jsonData['profile']) === true ? jsonData['profile'] : {},
    backlinks:
      Boolean(jsonData['@backlinks']) === true ? jsonData['@backlinks'] : [],
    accounts:
      Boolean(jsonData['accounts']) === true ? jsonData['accounts'] : [],
    links: Boolean(jsonData['links']) === true ? jsonData['links'] : [],
  };
}

export const Rss3AdaptorDeets: AdaptorDeets = {
  id: 'rss3',
  name: 'Rss3',
  projectThumbnail:
    'ipfs://bafybeidgse3grhvqzcp23ndji4hxtnd4x3bjt7r5jel3zwdqcghyhc2oim/rss3.webp',
  projectUrl: 'https://roci.io/',
  requiredConfigKeys: [],
};

import { AdaptorDeets } from '../types';
import { gqlFetcher } from '../utils';

interface ProjectGalaxyResult {
  data: {
    addressInfo: {
      id: string;
      username: string;
      eligibleCredentials: {
        list: Array<{
          id: string;
          name: string;
        }>;
      };
    };
  };
}

export default async function getProjectGalaxyData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://graphigo.prd.galaxy.eco/query',
    `{
      addressInfo(address: "${address.toLowerCase()}") {
        id
        username
        eligibleCredentials {
            list {
                id
                name
            }
        }
      }
    }`
  )) as ProjectGalaxyResult;

  return Object.keys(jsonData['data']).includes('addressInfo')
    ? jsonData['data']['addressInfo']
    : {};
}

export const ProjectgalaxyAdaptorDeets: AdaptorDeets = {
  id: 'projectgalaxy',
  name: 'Project Galaxy',
  projectThumbnail:
    'ipfs://bafybeicatpthjnieqrezua5naoeh3yyvboc4z5mirtwtztywvcgi6tsha4/projectgalaxy.webp',
  projectUrl: 'https://galaxy.eco/',
  requiredConfigKeys: [],
};

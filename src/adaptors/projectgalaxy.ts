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

  return jsonData['data']['addressInfo'];
}

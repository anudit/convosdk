import { gqlFetcher } from '../utils';

interface MirrorResult {
  data: {
    addressInfo: {
      ens: string;
      writeTokens: string;
      hasOnboarded: boolean;
    };
    userProfile: {
      displayName: string;
      ens: string;
      domain: string;
      contributor: {
        publications: Array<{
          ensLabel: string;
          displayName: string;
        }>;
      };
    };
  };
}

export default async function getMirrorData(address = '') {
  const jsonData = (await gqlFetcher(
    'https://mirror-api.com/graphql',
    `{
      addressInfo(address: "${address}") {
        ens
        writeTokens
        hasOnboarded
      }
      userProfile(address: "${address}") {
        displayName
        ens
        domain
        contributor {
          publications {
            ensLabel
            displayName
          }
        }
      }
    }`
  )) as MirrorResult;

  return jsonData['data'];
}

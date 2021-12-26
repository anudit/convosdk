import { gqlFetcher } from '../utils';

interface MirrorResult {
  data: {
    addressInfo: {
      hasOnboarded: boolean;
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
    }`
  )) as MirrorResult;

  return jsonData['data']['addressInfo']['hasOnboarded'];
}

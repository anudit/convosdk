import { gqlFetcher } from '../utils';

interface UpshotResult {
  data: {
    getUser: {
      addresses: Array<{
        address: string;
        ens: string;
        gmi: number;
        volume: string;
        startAt: number;
        numTxs: number;
        unrealizedGain: string;
        realizedGain: string;
        numAssetsOwned: number;
        numBlueChipsOwned: number;
        numCollectionsOwned: number;
        totalGainPercent: number;
        gmiPercentile: number;
      }>;
    };
  };
}

export default async function getUpshotData(address: string) {
  const jsonData = (await gqlFetcher(
    'https://v2.client.upshot.io/graphql',
    `{
        getUser(address: "${address.toLowerCase()}") {
          addresses {
            address
            ens
            gmi
            volume
            startAt
            numTxs
            unrealizedGain
            realizedGain
            numAssetsOwned
            numBlueChipsOwned
            numCollectionsOwned
            totalGainPercent
            gmiPercentile
          }
        }
      }`
  )) as UpshotResult;

  return jsonData.data.getUser === null
    ? false
    : jsonData.data.getUser.addresses[0];
}

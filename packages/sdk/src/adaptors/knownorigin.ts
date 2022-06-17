import { formatEther } from 'ethers/lib/utils';
import { ComputeConfig } from '../types';
import { checkComputeConfig, gqlFetcher } from '../utils';

interface QueryResult {
  data: {
    editions: Array<{
      priceInWei: string;
      totalsold: string;
      totalSold: string;
    }>;
  };
}

export default async function getKnownOriginData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getKnownOriginData', computeConfig, [
    'etherumPriceInUsd',
  ]);

  const jsonData = (await gqlFetcher(
    'https://api.thegraph.com/subgraphs/name/knownorigin/known-origin',
    `
        {
            editions(orderBy: "createdTimestamp", orderDirection: "desc", where: {collaborators_contains: ["${address.toLowerCase()}"], active: true, remainingSupply_lte: 10000, remainingSupply_gte: 0}) {
                id
                version
                salesType
                startDate
                artistAccount
                totalSupply
                totalAvailable
                totalSold
                priceInWei
                remainingSupply
                optionalCommissionAccount
                offersOnly
                startDate
                stepSaleStepPrice
                totalEthSpentOnEdition
                metadata {
                    id
                    name
                    image
                    artist
                    image_type
                    image_sphere
                    __typename
                }
                reservePrice
                reserveAuctionBid
                reserveAuctionStartDate
                previousReserveAuctionEndTimestamp
                reserveAuctionEndTimestamp
                __typename
            }
        }
    `
  )) as QueryResult;

  const artworks = jsonData['data']['editions'];

  let totalAmountSold = 0;
  for (let index = 0; index < artworks.length; index++) {
    const artwork = artworks[index];
    if (parseInt(artwork['totalSold']) >= 1) {
      totalAmountSold +=
        parseFloat(formatEther(artwork['priceInWei'])) *
        computeConfig.etherumPriceInUsd;
    }
  }
  return {
    totalCountSold: artworks.length,
    totalAmountSold,
  };
}

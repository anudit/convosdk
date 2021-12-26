import { formatEther } from 'ethers/lib/utils';
import { gqlFetcher } from '../utils';

interface ZoraResult {
  data: {
    Token: Array<{
      minter: string;
      owner: string;
      auctions: Array<{
        winner: string;
        lastBidAmount: string;
      }>;
    }>;
  };
}

export default async function getZoraData(address: string) {
  const data = (await gqlFetcher(
    'https://indexer-prod-mainnet.zora.co/v1/graphql',
    `query Tokens {
        Token(limit: 10000, where:{minter:{_eq:"${address.toLowerCase()}"}}){
          minter
          owner
          auctions{
            winner
            lastBidAmount
          }
        }
      }`
  )) as ZoraResult;

  const artworks = data.data?.Token;

  let totalCountSold = 0;
  let totalAmountSold = 0;

  for (let index = 0; index < artworks.length; index++) {
    // console.log(artworks[index]['ownership']);
    if (
      artworks[index]['auctions'].length > 0 &&
      artworks[index]['owner'] ===
        artworks[index]['auctions'][artworks[index]['auctions'].length - 1][
          'winner'
        ]
    ) {
      totalCountSold += 1;
      totalAmountSold += parseFloat(
        formatEther(
          artworks[index]['auctions'][artworks[index]['auctions'].length - 1][
            'lastBidAmount'
          ]
        )
      );
    }
  }

  return {
    totalCountSold,
    totalAmountSold,
  };
}

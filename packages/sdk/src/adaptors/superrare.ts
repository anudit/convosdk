import { AdaptorDeets } from '../types';
import { fetcher } from '../utils';

interface SuperrareResult {
  status: string;
  result: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
    totalCount: number;
    collectibles: Array<{
      nftEvents: {
        nodes: Array<{
          sale: {
            amount: number;
            usdAmount: number;
          };
          auctionSettled: {
            amount: string;
            usdAmount: number;
          };
          acceptBid: {
            amount: number;
            usdAmount: number;
          };
        }>;
      };
      creator: {
        username: string;
      };
    }>;
  };
}

// interface SuperrareResult2 {
//   status: string;
//   result: {
//     followers: {
//       totalCount: number;
//     };
//     following: {
//       totalCount: number;
//     };
//   };
// }

export default async function getSuperrareData(address: string) {
  try {
    const jsonData = (await fetcher(
      'POST',
      'https://superrare.com/api/v2/nft/get-by-market-details',
      '',
      {
        contractAddresses: [
          '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
          '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
        ],
        hasBidWithAuctionAddressses: null,
        ownedByCreator: false,
        creatorAddress: address.toLowerCase(),
        includeBurned: false,
        orderBy: 'TOKEN_ID_DESC',
        hasSold: true,
      }
    )) as SuperrareResult;

    const artworks = jsonData['result']['collectibles'];

    // let followers = 0;
    // let following = 0;
    // let username = null;
    // if (artworks.length > 0) {
    //   username = artworks[0].creator.username;
    //   const metadata = (await fetcher(
    //     'GET',
    //     `https://superrare.com/api/v2/user?username=${username}`
    //   )) as SuperrareResult2;
    //   followers = metadata.result.followers.totalCount;
    //   following = metadata.result.following.totalCount;
    // }

    const totalCountSold = jsonData['result']['totalCount'];

    const totalCreated = artworks.length;
    let totalAmountSold = 0;

    for (let index = 0; index < artworks.length; index++) {
      const amtData = artworks[index]['nftEvents']['nodes'][0];
      if (Boolean(amtData?.sale) === true) {
        totalAmountSold += amtData['sale']['usdAmount'];
      } else if (Boolean(amtData?.auctionSettled) === true) {
        totalAmountSold += amtData['auctionSettled']['usdAmount'];
      } else if (Boolean(amtData?.acceptBid) === true) {
        totalAmountSold += amtData['acceptBid']['usdAmount'];
      }
    }

    return {
      // username,
      // followers,
      // following,
      totalCreated,
      totalCountSold,
      totalAmountSold,
    };
  } catch (error) {
    return false;
  }
}

export const SuperrareAdaptorDeets: AdaptorDeets = {
  id: 'superrare',
  name: 'SuperRare',
  projectThumbnail:
    'ipfs://bafybeifbpzre5wua6ddjw6hdik7b7cit6s7j7it52fbsoodgprbejsxbv4/superrare.webp',
  projectUrl: 'https://superrare.com/',
  requiredConfigKeys: [],
};

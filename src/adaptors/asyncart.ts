import { ComputeConfig } from '../types';
import { fetcher } from '../utils';

interface AsyncResult {
  arts: Array<{
    auction: {
      reservePrice: number;
      hasReserve: boolean;
      endTime: number;
    };
    lastSale: {
      buyer: {
        amount: number;
      };
      sale: {
        amount: number;
      };
    };
  }>;
}

export default async function getAsyncartData(
  address: string,
  computeConfig: ComputeConfig
) {
  if (Boolean(computeConfig?.etherumPriceInUsd) === false) {
    throw new Error(
      'getAsyncartData: computeConfig does not contain etherumPriceInUsd'
    );
  }
  try {
    const response = (await fetcher(
      'GET',
      'https://async-2.appspot.com/users/' +
        address.toLowerCase() +
        '/arts?rel=artist&type=masters&artType=visual'
    )) as AsyncResult;

    const artworks = response['arts'];
    // console.log(artworks);
    let totalCountSold = artworks.length;

    let totalAmountSold = 0;
    for (let index = 0; index < artworks.length; index++) {
      if (Boolean(artworks[index]['lastSale']?.buyer) === true) {
        totalAmountSold += artworks[index]['lastSale']['sale']['amount'];
      } else if (
        artworks[index]['auction'].hasReserve === true &&
        Boolean(artworks[index]['auction']?.endTime) === true
      ) {
        totalAmountSold += artworks[index]['auction']['reservePrice'];
      } else {
        totalCountSold -= 1;
      }
    }
    return {
      totalCountSold,
      totalAmountSold: totalAmountSold * computeConfig.etherumPriceInUsd,
    };
  } catch (error) {
    return {
      totalCountSold: 0,
      totalAmountSold: 0,
    };
  }
}

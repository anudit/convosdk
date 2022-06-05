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

interface AsyncUser {
  address: string;
  bio: string;
  instagram: string;
  location: string;
  name: string;
  picURL: string;
  twitter: string;
  userType: string;
  username: string;
  website: string;
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
    const promiseArray = [
      fetcher(
        'GET',
        'https://async-api.com/users/' +
          address.toLowerCase() +
          '/arts?page=1&count=1000&rel=owner&type=masters'
      ),
      fetcher('GET', 'https://async-api.com/users/' + address.toLowerCase()),
    ];

    const responses = await Promise.allSettled(promiseArray);

    let response1 = {};
    let response2 = {};

    if (responses[0].status === 'fulfilled') {
      const respData1 = responses[0].value as AsyncResult;
      const artworks = respData1['arts'];
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
      response1 = {
        totalCountSold,
        totalAmountSold: totalAmountSold * computeConfig.etherumPriceInUsd,
      };
    }

    if (responses[1].status === 'fulfilled') {
      const respData2 = responses[1].value as AsyncUser;
      response2 = respData2;
    }

    return {
      ...response1,
      ...response2,
    };
  } catch (error) {
    return false;
  }
}

import { ComputeConfig, Dictionary } from '../types';
import { checkComputeConfig, fetcher } from '../utils';

interface AaveResp {
  [key: string]: {
    products: Array<{
      meta: Array<{
        value: number;
      }>;
    }>;
  };
}

export default async function getAaveData(
  address: string,
  computeConfig: ComputeConfig
) {
  checkComputeConfig('getAaveData', computeConfig, ['zapperApiKey']);

  const reqArray = [];
  const networks = ['ethereum', 'polygon', 'avalanche'];
  for (let index = 0; index < networks.length; index++) {
    reqArray.push(
      fetcher(
        'GET',
        `https://api.zapper.fi/v1/protocols/aave-v2/balances?addresses%5B%5D=${address}&network=${networks[index]}&api_key=${computeConfig.zapperApiKey}`
      )
    );
  }
  const respArray = await Promise.allSettled<AaveResp>(reqArray);

  const retData: Dictionary<number> = {};
  for (let index2 = 0; index2 < respArray.length; index2++) {
    if (respArray[index2].status === 'fulfilled') {
      const data = respArray[index2] as PromiseFulfilledResult<AaveResp>;
      if (
        data.value[address.toLowerCase()].products.length > 0 &&
        data.value[address.toLowerCase()].products[0].meta.length > 0
      ) {
        retData[`${networks[index2]}Market`] =
          data.value[address.toLowerCase()].products[0].meta[0].value;
      }
    }
  }
  return retData;
}

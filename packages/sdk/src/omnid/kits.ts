import { ComputeConfig, Dictionary, EtherscanResult } from '../types';
import { checkComputeConfig } from '../utils';
import {
  getEtherscanData,
  getSdnData,
  getTokenBlacklistData,
  getCryptoscamdbData,
  getMewData,
  getAlchemyData,
} from '../adaptors';

class Kits {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  isMalicious = async (
    address: string,
    computeConfig: ComputeConfig
  ): Promise<Dictionary<any>> => {
    checkComputeConfig('isMalicious', computeConfig, [
      'CNVSEC_ID',
      'alchemyApiKey',
    ]);

    const promiseArray = [
      getAlchemyData(address, computeConfig),
      getCryptoscamdbData(address),
      getEtherscanData(address, computeConfig),
      getMewData(address, computeConfig),
      getSdnData(address, computeConfig),
      getTokenBlacklistData(address),
    ];

    const adaptors = [
      'alchemy',
      'cryptoscamdb',
      'etherscan',
      'mew',
      'sdn',
      'tokenblacklist',
    ];
    const returnData: Dictionary<any> = {};
    const responses = await Promise.allSettled(promiseArray);

    for (let index = 0; index < adaptors.length; index++) {
      const response = responses[index];
      if (response.status === 'fulfilled') {
        if (adaptors[index] === 'etherscan') {
          const etData = response.value as EtherscanResult;
          if (etData?.label) {
            if (['phish', 'hack', 'heist'].includes(etData.label) === false) {
              returnData[adaptors[index]] = response.value;
            } else {
              returnData[adaptors[index]] = false;
            }
          } else returnData[adaptors[index]] = false;
        } else {
          returnData[adaptors[index]] = response.value;
        }
      }
    }

    return returnData;
  };
}

export default Kits;

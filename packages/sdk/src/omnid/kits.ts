import {
  AdaptorKeys,
  ComputeConfig,
  Dictionary,
  EtherscanResult,
  txnResp,
} from '../types';
import { checkComputeConfig } from '../utils';
import {
  getEtherscanData,
  getSdnData,
  getTokenBlacklistData,
  getCryptoscamdbData,
  getMewData,
  getAlchemyData,
  getChainabuseData,
  getTxnData,
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
      'etherscanApiKey',
      'polygonscanApiKey',
      'optimismscanApiKey',
    ]);

    const promiseArray = [
      getAlchemyData(address, computeConfig),
      getChainabuseData(address),
      getCryptoscamdbData(address, computeConfig),
      getEtherscanData(address, computeConfig),
      getMewData(address, computeConfig),
      getSdnData(address, computeConfig),
      getTokenBlacklistData(address),
      getTxnData(address, computeConfig),
    ];

    const adaptors: Array<AdaptorKeys> = [
      'alchemy',
      'chainabuse',
      'cryptoscamdb',
      'etherscan',
      'mew',
      'sdn',
      'tokenblacklists',
      'txn',
    ];
    const returnData: Dictionary<any> = {};
    const responses = await Promise.allSettled(promiseArray);

    for (let index = 0; index < adaptors.length; index++) {
      const response = responses[index];
      if (response.status === 'fulfilled') {
        if (adaptors[index] === 'etherscan') {
          const etData = response.value as EtherscanResult;
          if (etData?.label) {
            if (
              ['phish', 'hack', 'heist', 'exploit'].includes(etData.label) ===
              false
            ) {
              returnData[adaptors[index]] = response.value;
            } else {
              returnData[adaptors[index]] = false;
            }
          } else returnData[adaptors[index]] = false;
        } else if (adaptors[index] === 'txn') {
          const txnData = response.value as Dictionary<txnResp>;
          const res = Object.keys(txnData)
            .map((k) => {
              return txnData[k].fundedByTornadoCash;
            })
            .includes(true);
          returnData[adaptors[index]] = res === true ? txnData : false;
        } else {
          returnData[adaptors[index]] = response.value;
        }
      }
    }

    return returnData;
  };
}

export default Kits;

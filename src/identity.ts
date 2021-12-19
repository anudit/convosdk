import { fetcher } from './utils';
import { ComputeConfig, ErrorType } from './types';
import * as adaptors from './adaptors';

class Identity {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  getTrustScore = async (address: string): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/identity?address=${address}`,
      this.apikey,
      {}
    );
  };

  computeTrustScore = async (
    address: string,
    computeConfig: ComputeConfig
  ): Promise<any | ErrorType> => {
    const promiseArray = [
      adaptors.checkPoH(address),
      adaptors.getAge(address),
      adaptors.getAaveData(address, computeConfig),
    ];
    const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
      promiseArray
    );
    return resp;
  };
}
export default Identity;

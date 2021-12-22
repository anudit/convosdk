import { fetcher } from './utils';
import { ComputeConfig, ErrorType } from './types';
import * as adaptors from './adaptors';
import { isAddress } from 'ethers/lib/utils';

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
    if (isAddress(address) === true) {
      const promiseArray = [
        adaptors.getAaveData(address, computeConfig),
        adaptors.getAge(address),
        adaptors.checkBrightId(address),
        adaptors.getCoordinapeData(address),
        adaptors.getDeepDaoData(address, computeConfig),
        adaptors.addressToEns(address),
        adaptors.getMetagameData(address),
        adaptors.getPoapData(address),
        adaptors.checkPoH(address),
        adaptors.getPolygonData(address),
        adaptors.getRabbitholeData(address),
        adaptors.getShowtimeData(address, computeConfig),
      ];
      const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
        promiseArray
      );
      return resp;
    } else {
      throw new Error('Not a Valid Ethereum Address');
    }
  };
}
export default Identity;

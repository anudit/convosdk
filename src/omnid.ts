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
        adaptors.getArcxData(address),
        adaptors.getAsyncartData(address),
        adaptors.getBoardroomData(address),
        adaptors.checkBrightId(address),
        adaptors.getCeloData(address),
        adaptors.getContextData(address),
        // adaptors.getCoordinapeData(address),
        adaptors.getCryptoscamdbData(address),
        adaptors.getCyberconnectData(address),
        adaptors.getDeepDaoData(address, computeConfig),
        adaptors.addressToEns(address),
        adaptors.getFoundationData(address),
        adaptors.getGitcoinData(address, computeConfig),
        adaptors.checkIdena(address),
        adaptors.getKnownOriginData(address),
        adaptors.getMetagameData(address),
        adaptors.getMirrorData(address),
        adaptors.getPoapData(address),
        adaptors.getPolygonData(address),
        adaptors.getProjectGalaxyData(address),
        adaptors.checkPoH(address),
        adaptors.getRabbitholeData(address),
        adaptors.getRss3Data(address),
        adaptors.getShowtimeData(address, computeConfig),
        adaptors.resolveUnstoppableDomains(address),
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
export * from './adaptors';

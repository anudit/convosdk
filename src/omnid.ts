import { fetcher } from './utils';
import { ComputeConfig, ErrorType } from './types';
import * as adaptorList from './adaptors';
import { isAddress } from 'ethers/lib/utils';

class Identity {
  apikey: string;
  node: string;
  adaptors = adaptorList;

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
        adaptorList.getAaveData(address, computeConfig),
        adaptorList.getAge(address),
        adaptorList.getArcxData(address),
        adaptorList.getAsyncartData(address),
        adaptorList.getBoardroomData(address),
        adaptorList.checkBrightId(address),
        adaptorList.getCeloData(address),
        adaptorList.getCoinviseData(address, computeConfig),
        adaptorList.getContextData(address),
        // adaptorList.getCoordinapeData(address),
        adaptorList.getCryptoscamdbData(address),
        adaptorList.getCyberconnectData(address),
        adaptorList.getDeepDaoData(address, computeConfig),
        adaptorList.addressToEns(address),
        adaptorList.getFoundationData(address),
        adaptorList.getGitcoinData(address, computeConfig),
        adaptorList.checkIdena(address),
        adaptorList.getKnownOriginData(address),
        adaptorList.getMetagameData(address),
        adaptorList.getMirrorData(address),
        adaptorList.getPoapData(address),
        adaptorList.getPolygonData(address),
        adaptorList.getProjectGalaxyData(address),
        adaptorList.checkPoH(address),
        adaptorList.getRabbitholeData(address),
        adaptorList.getRaribleData(address),
        adaptorList.getRss3Data(address),
        adaptorList.getShowtimeData(address, computeConfig),
        adaptorList.getSuperrareData(address),
        adaptorList.getSybilData(address, computeConfig),
        adaptorList.resolveUnstoppableDomains(address),
        adaptorList.getZoraData(address),
      ];
      if (Boolean(computeConfig?.DEBUG) === true) console.time('computeTime');
      const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
        promiseArray
      );
      if (Boolean(computeConfig?.DEBUG) === true)
        console.timeEnd('computeTime');
      return resp;
    } else {
      throw new Error('Not a Valid Ethereum Address');
    }
  };
}

export default Identity;

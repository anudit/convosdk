import { fetcher } from './utils';
import {
  ComputeConfig,
  ErrorType,
  AdaptorFunctionType,
  AdaptorFunctionWithConfigType,
} from './types';
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

  timeit = async (
    callback: AdaptorFunctionType,
    params: [address: string],
    debug = false
  ) => {
    if (Boolean(debug) == true) console.time(callback.name);
    const resp = await callback.apply(this, params);
    if (Boolean(debug) == true) console.timeEnd(callback.name);
    return resp;
  };

  timeitWithConfig = async (
    callback: AdaptorFunctionWithConfigType,
    params: [address: string, computeConfig: ComputeConfig],
    debug = false
  ) => {
    if (Boolean(debug) == true) console.time(callback.name);
    const resp = await callback.apply(this, params);
    if (Boolean(debug) == true) console.timeEnd(callback.name);
    return resp;
  };

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
        this.timeitWithConfig(
          adaptorList.getAaveData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getAge,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        // this.timeit(adaptorList.getArcxData, [address], computeConfig?.DEBUG),
        this.timeitWithConfig(
          adaptorList.getAsyncartData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getBoardroomData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.checkBrightId, [address], computeConfig?.DEBUG),
        this.timeit(adaptorList.getCeloData, [address], computeConfig?.DEBUG),
        this.timeitWithConfig(
          adaptorList.getCoinviseData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getContextData,
          [address],
          computeConfig?.DEBUG
        ),
        // timeit[adaptorList.getCoordinapeData(address)],
        this.timeit(
          adaptorList.getCryptoscamdbData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getCyberconnectData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getDeepDaoData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.addressToEns, [address], computeConfig?.DEBUG),
        this.timeit(adaptorList.getFortaData, [address], computeConfig?.DEBUG),
        this.timeitWithConfig(
          adaptorList.getFoundationData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getGitcoinData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getHiveOneData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.checkIdena, [address], computeConfig?.DEBUG),
        this.timeitWithConfig(
          adaptorList.getKnownOriginData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getMetagameData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.getMirrorData, [address], computeConfig?.DEBUG),
        this.timeit(adaptorList.getPoapData, [address], computeConfig?.DEBUG),
        this.timeit(
          adaptorList.getPolygonData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getProjectGalaxyData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.checkPoH, [address], computeConfig?.DEBUG),
        this.timeit(
          adaptorList.getRabbitholeData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getRaribleData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(adaptorList.getRss3Data, [address], computeConfig?.DEBUG),
        this.timeitWithConfig(
          adaptorList.getShowtimeData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.getSuperrareData,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getSybilData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
        this.timeit(
          adaptorList.resolveUnstoppableDomains,
          [address],
          computeConfig?.DEBUG
        ),
        this.timeitWithConfig(
          adaptorList.getZoraData,
          [address, computeConfig],
          computeConfig?.DEBUG
        ),
      ];
      if (Boolean(computeConfig?.DEBUG) === true) console.time('computeTime');
      const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
        promiseArray
      );
      const respDict = {
        aave: resp[0],
        age: resp[1],
        // arcx: resp[2],
        asyncart: resp[2],
        boardroom: resp[3],
        brightid: resp[4],
        celo: resp[5],
        coinvise: resp[6],
        context: resp[7],
        // coordinape: resp[7],
        cryptoscamdb: resp[8],
        cyberconnect: resp[9],
        deepdao: resp[10],
        ens: resp[11],
        forta: resp[12],
        foundation: resp[13],
        gitcoin: resp[14],
        hiveone: resp[15],
        idena: resp[16],
        knownorigin: resp[17],
        metagame: resp[18],
        mirror: resp[19],
        poap: resp[20],
        polygon: resp[21],
        projectgalaxy: resp[22],
        poh: resp[23],
        rabbithole: resp[24],
        rarible: resp[25],
        rss3: resp[26],
        showtime: resp[27],
        superrare: resp[28],
        uniswap: resp[29],
        unstoppable: resp[30],
        zora: resp[31],
      };
      if (Boolean(computeConfig?.DEBUG) === true)
        console.timeEnd('computeTime');
      return respDict;
    } else {
      throw new Error('Not a Valid Ethereum Address');
    }
  };
}

export default Identity;

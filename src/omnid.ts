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
        adaptorList.getAge(address, computeConfig),
        adaptorList.getArcxData(address),
        adaptorList.getAsyncartData(address, computeConfig),
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
        adaptorList.getFoundationData(address, computeConfig),
        adaptorList.getGitcoinData(address, computeConfig),
        adaptorList.getHiveOneData(address, computeConfig),
        adaptorList.checkIdena(address),
        adaptorList.getKnownOriginData(address, computeConfig),
        adaptorList.getMetagameData(address),
        adaptorList.getMirrorData(address),
        adaptorList.getPoapData(address),
        adaptorList.getPolygonData(address),
        adaptorList.getProjectGalaxyData(address),
        adaptorList.checkPoH(address),
        adaptorList.getRabbitholeData(address),
        adaptorList.getRaribleData(address, computeConfig),
        adaptorList.getRss3Data(address),
        adaptorList.getShowtimeData(address, computeConfig),
        adaptorList.getSuperrareData(address),
        adaptorList.getSybilData(address, computeConfig),
        adaptorList.resolveUnstoppableDomains(address),
        adaptorList.getZoraData(address, computeConfig),
      ];
      if (Boolean(computeConfig?.DEBUG) === true) console.time('computeTime');
      const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
        promiseArray
      );
      const respDict = {
        aave: resp[0],
        age: resp[1],
        arcx: resp[2],
        asyncart: resp[3],
        boardroom: resp[4],
        brightid: resp[5],
        celo: resp[6],
        coinvise: resp[7],
        context: resp[8],
        cryptoscamdb: resp[9],
        cyberconnect: resp[10],
        deepdao: resp[11],
        ens: resp[12],
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

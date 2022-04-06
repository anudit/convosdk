import { fetcher } from './utils';
import {
  ComputeConfig,
  ErrorType,
  AdaptorFunctionType,
  AdaptorFunctionWithConfigType,
} from './types';
import * as adaptorList from './adaptors';
import { isAddress } from 'ethers/lib/utils';

class Omnid {
  apikey: string;
  node: string;
  adaptors = adaptorList;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  #timeit = async (
    callback: AdaptorFunctionType,
    params: [address: string],
    debug = false
  ) => {
    if (Boolean(debug) == true) console.time(callback.name);
    const resp = await callback.apply(this, params);
    if (Boolean(debug) == true) console.timeEnd(callback.name);
    return resp;
  };

  #timeitWithConfig = async (
    callback: AdaptorFunctionWithConfigType,
    params: [address: string, computeConfig: ComputeConfig],
    debug = false
  ) => {
    if (Boolean(debug) == true) console.time(callback.name);
    const resp = await callback.apply(this, params);
    if (Boolean(debug) == true) console.timeEnd(callback.name);
    return resp;
  };

  #disabledPromise = async () => {
    const resp = new Promise((res) =>
      setTimeout(() => {
        res({ disabled: true });
      }, 0)
    );
    return await resp;
  };

  getTrustScore = async (
    address: string,
    noCache?: boolean
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/identity?address=${address}${
        Boolean(noCache) == true ? '&noCache=true' : ''
      }`,
      this.apikey,
      {}
    );
  };

  getTrustScoreWithProof = async (
    address: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/zkidentity?address=${address}`,
      this.apikey,
      {}
    );
  };

  computeTrustScore = async (
    address: string,
    computeConfig: ComputeConfig,
    disabledAdaptors: Array<string> = []
  ): Promise<any | ErrorType> => {
    if (isAddress(address) === true) {
      const promiseArray = [
        disabledAdaptors.includes('aave')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getAaveData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('age')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getAge,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('arcx')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getArcxData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('asyncart')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getAsyncartData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('boardroom')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getBoardroomData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('brightid')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.checkBrightId,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('celo')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getCeloData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('coinvise')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getCoinviseData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('context')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getContextData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('coordinape')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getCoordinapeData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('cryptorelief')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getCryptoreliefData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('cryptoscamdb')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getCryptoscamdbData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('cyberconnect')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getCyberconnectData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('dapplist')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getDapplistData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('debank')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getDebankData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('deepdao')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getDeepDaoData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('ens')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.addressToEns,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('etherscan')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getEtherscanData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('forta')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getFortaData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('foundation')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getFoundationData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('gitcoin')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getGitcoinData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('goldfinch')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getGoldfinchData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('hiveone')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getHiveOneData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('idena')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.checkIdena,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('karma')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getKarmaData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('knownorigin')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getKnownOriginData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('layer3')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getLayer3Data,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('lens')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getLensData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('metagame')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getMetagameData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('mew')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getMewData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('mirror')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getMirrorData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('poap')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getPoapData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('poh')
          ? this.#disabledPromise()
          : this.#timeit(adaptorList.checkPoH, [address], computeConfig?.DEBUG),
        disabledAdaptors.includes('pop')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getPopData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('polygon')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getPolygonData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('projectgalaxy')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getProjectGalaxyData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('questbook')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getQuestbookData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('rabbithole')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getRabbitholeData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('rarible')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getRaribleData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('rss3')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getRss3Data,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('showtime')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getShowtimeData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('superrare')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getSuperrareData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('unipass')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getUnipassData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('uniswap')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getSybilData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('unstoppable')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.resolveUnstoppableDomains,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('yup')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getYupData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('zapper')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getZapperData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('zora')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
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
        arcx: resp[2],
        asyncart: resp[3],
        boardroom: resp[4],
        brightid: resp[5],
        celo: resp[6],
        coinvise: resp[7],
        context: resp[8],
        coordinape: resp[9],
        cryptorelief: resp[10],
        cryptoscamdb: resp[11],
        cyberconnect: resp[12],
        dapplist: resp[13],
        debank: resp[14],
        deepdao: resp[15],
        ens: resp[16],
        etherscan: resp[17],
        forta: resp[18],
        foundation: resp[19],
        gitcoin: resp[20],
        goldfinch: resp[21],
        hiveone: resp[22],
        idena: resp[23],
        karma: resp[24],
        knownorigin: resp[25],
        layer3: resp[26],
        lens: resp[27],
        metagame: resp[28],
        mew: resp[29],
        mirror: resp[30],
        poap: resp[31],
        poh: resp[32],
        pop: resp[33],
        polygon: resp[34],
        projectgalaxy: resp[35],
        questbook: resp[36],
        rabbithole: resp[37],
        rarible: resp[38],
        rss3: resp[39],
        showtime: resp[40],
        superrare: resp[41],
        unipass: resp[42],
        uniswap: resp[43],
        unstoppable: resp[44],
        yup: resp[45],
        zapper: resp[46],
        zora: resp[47],
      };
      if (Boolean(computeConfig?.DEBUG) === true)
        console.timeEnd('computeTime');
      return respDict;
    } else {
      throw new Error('Not a Valid Ethereum Address');
    }
  };
}

export default Omnid;

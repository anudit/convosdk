import { fetcher, isSolAddress } from './utils';
import {
  ComputeConfig,
  ErrorType,
  AdaptorFunctionType,
  AdaptorFunctionWithConfigType,
  Dictionary,
  AdaptorKeys,
} from './types';
import * as adaptorList from './adaptors';
import { isAddress } from 'ethers/lib/utils';
import Credentials from './omnid/credentials';
import Kits from './omnid/kits';

class Omnid {
  apikey: string;
  node: string;
  kits: Kits;
  credentials: Credentials;
  adaptors = adaptorList;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    this.credentials = new Credentials(apikey, this.node);
    this.kits = new Kits(apikey, this.node);
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

  getAdaptorDataByKey = (key: AdaptorKeys) => {
    return this.adaptors.AdaptorData.filter((d) => d.id === key)[0];
  };

  computeTrustScore = async (
    address: string,
    computeConfig: ComputeConfig,
    disabledAdaptors: Array<AdaptorKeys> = []
  ): Promise<any | ErrorType> => {
    if (isAddress(address)) {
      const promiseArray = [
        disabledAdaptors.includes('aave')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getAaveData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('alchemy')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getAlchemyData,
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
        disabledAdaptors.includes('bird')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getBirdData,
              [address],
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
        disabledAdaptors.includes('chainabuse')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getChainabuseData,
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
        disabledAdaptors.includes('commonsstack')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getCommonsstackData,
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
          : this.#timeitWithConfig(
              adaptorList.getCryptoscamdbData,
              [address, computeConfig],
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
        disabledAdaptors.includes('giveth')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getGivethData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('goldfinch')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getGoldfinchData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('governordao')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getGovernordaoData,
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
        disabledAdaptors.includes('huddln')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getHuddlnData,
              [address],
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
        disabledAdaptors.includes('klima')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getKlimaData,
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
        disabledAdaptors.includes('labels')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getLabelData,
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
        disabledAdaptors.includes('learnweb3')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getLearnWeb3Data,
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
        disabledAdaptors.includes('parallel')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getParallelData,
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
        disabledAdaptors.includes('quadrata')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getQuadrataData,
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
        disabledAdaptors.includes('rocifi')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getRocifiData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('rss3')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getRss3Data,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('sdn')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getSdnData,
              [address, computeConfig],
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
        disabledAdaptors.includes('tokenblacklists')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getTokenBlacklistData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('txn')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getTxnData,
              [address, computeConfig],
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
        disabledAdaptors.includes('upala')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getUpalaData,
              [address],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('upshot')
          ? this.#disabledPromise()
          : this.#timeit(
              adaptorList.getUpshotData,
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
          : this.#timeitWithConfig(
              adaptorList.getZapperData,
              [address, computeConfig],
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

      const keys: Array<AdaptorKeys> = [
        'aave',
        'alchemy',
        'arcx',
        'asyncart',
        'bird',
        'boardroom',
        'brightid',
        'celo',
        'chainabuse',
        'coinvise',
        'commonsstack',
        'coordinape',
        'cryptorelief',
        'cryptoscamdb',
        'cyberconnect',
        'dapplist',
        'debank',
        'deepdao',
        'ens',
        'etherscan',
        'forta',
        'foundation',
        'gitcoin',
        'giveth',
        'goldfinch',
        'governordao',
        'hiveone',
        'huddln',
        'idena',
        'karma',
        'klima',
        'knownorigin',
        'labels',
        'layer3',
        'learnweb3',
        'lens',
        'metagame',
        'mew',
        'mirror',
        'parallel',
        'poap',
        'poh',
        'pop',
        'polygon',
        'projectgalaxy',
        'quadrata',
        'questbook',
        'rabbithole',
        'rarible',
        'rocifi',
        'rss3',
        'sdn',
        'showtime',
        'superrare',
        'tokenblacklists',
        'txn',
        'unipass',
        'uniswap',
        'unstoppable',
        'upala',
        'upshot',
        'yup',
        'zapper',
        'zora',
      ];
      const respDict: Dictionary<any> = {};
      if (promiseArray.length != keys.length)
        throw new Error('promiseArray.length != keys.length');
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        respDict[key] = resp[index];
      }

      if (Boolean(computeConfig?.DEBUG) === true)
        console.timeEnd('computeTime');
      return respDict;
    } else if (isSolAddress(address)) {
      const promiseArray = [
        disabledAdaptors.includes('labels')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getLabelData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
        disabledAdaptors.includes('sdn')
          ? this.#disabledPromise()
          : this.#timeitWithConfig(
              adaptorList.getSdnData,
              [address, computeConfig],
              computeConfig?.DEBUG
            ),
      ];
      if (Boolean(computeConfig?.DEBUG) === true) console.time('computeTime');
      const resp: Array<PromiseSettledResult<any>> = await Promise.allSettled(
        promiseArray
      );

      const keys: Array<AdaptorKeys> = ['labels', 'sdn'];
      const respDict: Dictionary<any> = {};
      if (promiseArray.length != keys.length)
        throw new Error('promiseArray.length != keys.length');
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        respDict[key] = resp[index];
      }

      if (Boolean(computeConfig?.DEBUG) === true)
        console.timeEnd('computeTime');
      return respDict;
    } else {
      throw new Error('Not a Valid Ethereum or Solana Address');
    }
  };
}

export default Omnid;

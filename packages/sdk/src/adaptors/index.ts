import { AdaptorDeets } from '../types';

// Adaptor Details
import { OneZeroOneBadgesAdaptorDeets } from './101badges';
import { AaveAdaptorDeets } from './aave';
import { AlchemyAdaptorDeets } from './alchemy';
import { ArcxAdaptorDeets } from './arcx';
import { AsyncartAdaptorDeets } from './asyncart';
import { BabtAdaptorDeets } from './babt';
import { BirdAdaptorDeets } from './bird';
import { BoardroomAdaptorDeets } from './boardroom';
import { BrightidAdaptorDeets } from './brightid';
import { CeloAdaptorDeets } from './celo';
import { ChainabuseAdaptorDeets } from './chainabuse';
import { CoinviseAdaptorDeets } from './coinvise';
import { CommonsstackAdaptorDeets } from './commonsstack';
import { CoordinapeAdaptorDeets } from './coordinape';
import { CredprotocolAdaptorDeets } from './credprotocol';
import { CryptoreliefAdaptorDeets } from './cryptorelief';
import { CryptoscamdbAdaptorDeets } from './cryptoscamdb';
import { CyberconnectAdaptorDeets } from './cyberconnect';
import { DapplistAdaptorDeets } from './dapplist';
import { DebankAdaptorDeets } from './debank';
import { DeepdaodaptorDeets } from './deepdao';
import { EnsAdaptorDeets } from './ens';
import { EtherscanAdaptorDeets } from './etherscan';
import { FortaAdaptorDeets } from './forta';
import { FoundationQueryResult } from './foundation';
import { GitcoinAdaptorDeets } from './gitcoin';
import { GivethAdaptorDeets } from './giveth';
import { GoldfinchAdaptorDeets } from './goldfinch';
import { GoplusAdaptorDeets } from './goplus';
import { GovernordaoAdaptorDeets } from './governordao';
import { HbtAdaptorDeets } from './hbt';
import { HiveoneAdaptorDeets } from './hiveone';
import { HuddlnAdaptorDeets } from './huddln';
import { IdenaAdaptorDeets } from './idena';
import { KarmaAdaptorDeets } from './karma';
import { KlimaAdaptorDeets } from './klima';
import { KnownoriginAdaptorDeets } from './knownorigin';
import { LabelAdaptorDeets } from './labels';
import { Layer3AdaptorDeets } from './layer3';
import { Learnweb3AdaptorDeets } from './learnweb3';
import { LensAdaptorDeets } from './lens';
import { MazuryAdaptorDeets } from './mazury';
import { MetagameAdaptorDeets } from './metagame';
import { MewAdaptorDeets } from './mew';
import { MirrorAdaptorDeets } from './mirror';
import { ParallelAdaptorDeets } from './parallel';
import { PoapAdaptorDeets } from './poap';
import { PohAdaptorDeets } from './poh';
import { PolygonAdaptorDeets } from './polygon';
import { ProjectgalaxyAdaptorDeets } from './projectgalaxy';
import { PopAdaptorDeets } from './proofofpersonhood';
import { QuadrataAdaptorDeets } from './quadrata';
import { QuestbookAdaptorDeets } from './questbook';
import { RabbitholeAdaptorDeets } from './rabbithole';
import { RaribleAdaptorDeets } from './rarible';
import { RocifiAdaptorDeets } from './rocifi';
import { Rss3AdaptorDeets } from './rss3';
import { ScanblocksAdaptorDeets } from './scanblocks';
import { SdnAdaptorDeets } from './sdn';
import { ShowtimeAdaptorDeets } from './showtime';
import { SuperrareAdaptorDeets } from './superrare';
import { TokenblacklistsAdaptorDeets } from './tokenblacklists';
import { TxnAdaptorDeets } from './txn';
import { UnipassAdaptorDeets } from './unipass';
import { UniswapAdaptorDeets } from './uniswap';
import { UnstoppableAdaptorDeets } from './unstoppable';
import { UpalaAdaptorDeets } from './upala';
import { UpshotAdaptorDeets } from './upshot';
import { YupAdaptorDeets } from './yup';
import { ZapperAdaptorDeets } from './zapper';
import { ZoraAdaptorDeets } from './zora';

// Adaptor Functions
export {
  default as get101badgesData,
  OneZeroOneBadgesAdaptorDeets,
} from './101badges';
export { default as getAaveData, AaveAdaptorDeets } from './aave';
export { default as getAlchemyData, AlchemyAdaptorDeets } from './alchemy';
export { default as getArcxData, ArcxAdaptorDeets } from './arcx';
export { default as getAsyncartData, AsyncartAdaptorDeets } from './asyncart';
export { default as getBabtData, BabtAdaptorDeets } from './babt';
export { default as getBirdData, BirdAdaptorDeets } from './bird';
export {
  default as getBoardroomData,
  BoardroomAdaptorDeets,
} from './boardroom';
export { default as checkBrightId, BrightidAdaptorDeets } from './brightid';
export { default as getCeloData, CeloAdaptorDeets } from './celo';
export {
  default as getChainabuseData,
  ChainabuseAdaptorDeets,
} from './chainabuse';
export { default as getCoinviseData, CoinviseAdaptorDeets } from './coinvise';
export {
  default as getCommonsstackData,
  CommonsstackAdaptorDeets,
} from './commonsstack';
export {
  default as getCoordinapeData,
  CoordinapeAdaptorDeets,
} from './coordinape';
export {
  default as getCredProtocolData,
  CredprotocolAdaptorDeets,
} from './credprotocol';
export {
  default as getCryptoreliefData,
  CryptoreliefAdaptorDeets,
} from './cryptorelief';
export {
  default as getCryptoscamdbData,
  CryptoscamdbAdaptorDeets,
} from './cryptoscamdb';
export {
  default as getCyberconnectData,
  CyberconnectAdaptorDeets,
} from './cyberconnect';
export { default as getDapplistData, DapplistAdaptorDeets } from './dapplist';
export { default as getDebankData, DebankAdaptorDeets } from './debank';
export { default as getDeepDaoData, DeepdaodaptorDeets } from './deepdao';
export { default as addressToEns, EnsAdaptorDeets } from './ens';
export {
  default as getEtherscanData,
  EtherscanAdaptorDeets,
} from './etherscan';
export { default as getFortaData, FortaAdaptorDeets } from './forta';
export {
  default as getFoundationData,
  FoundationQueryResult,
} from './foundation';
export { default as getGitcoinData, GitcoinAdaptorDeets } from './gitcoin';
export { default as getGivethData, GivethAdaptorDeets } from './giveth';
export {
  default as getGoldfinchData,
  GoldfinchAdaptorDeets,
} from './goldfinch';
export { default as getGoplusData, GoplusAdaptorDeets } from './goplus';
export {
  default as getGovernordaoData,
  GovernordaoAdaptorDeets,
} from './governordao';
export { default as getHbtData, HbtAdaptorDeets } from './hbt';
export { default as getHiveOneData, HiveoneAdaptorDeets } from './hiveone';
export { default as getHuddlnData, HuddlnAdaptorDeets } from './huddln';
export { default as checkIdena, IdenaAdaptorDeets } from './idena';
export { default as getKarmaData, KarmaAdaptorDeets } from './karma';
export { default as getKlimaData, KlimaAdaptorDeets } from './klima';
export {
  default as getKnownOriginData,
  KnownoriginAdaptorDeets,
} from './knownorigin';
export { default as getLabelData, LabelAdaptorDeets } from './labels';
export { default as getLayer3Data, Layer3AdaptorDeets } from './layer3';
export {
  default as getLearnWeb3Data,
  Learnweb3AdaptorDeets,
} from './learnweb3';
export { default as getLensData, LensAdaptorDeets } from './lens';
export { default as getMazuryData, MazuryAdaptorDeets } from './mazury';
export { default as getMetagameData, MetagameAdaptorDeets } from './metagame';
export { default as getMewData, MewAdaptorDeets } from './mew';
export { default as getMirrorData, MirrorAdaptorDeets } from './mirror';
export { default as getParallelData, ParallelAdaptorDeets } from './parallel';
export { default as getPoapData, PoapAdaptorDeets } from './poap';
export { default as checkPoH, PohAdaptorDeets } from './poh';
export { default as getPolygonData, PolygonAdaptorDeets } from './polygon';
export {
  default as getProjectGalaxyData,
  ProjectgalaxyAdaptorDeets,
} from './projectgalaxy';
export { default as getPopData, PopAdaptorDeets } from './proofofpersonhood';
export { default as getQuadrataData, QuadrataAdaptorDeets } from './quadrata';
export {
  default as getQuestbookData,
  QuestbookAdaptorDeets,
} from './questbook';
export {
  default as getRabbitholeData,
  RabbitholeAdaptorDeets,
} from './rabbithole';
export { default as getRaribleData, RaribleAdaptorDeets } from './rarible';
export { default as getRocifiData, RocifiAdaptorDeets } from './rocifi';
export { default as getRss3Data, Rss3AdaptorDeets } from './rss3';
export {
  default as getScanblocksData,
  ScanblocksAdaptorDeets,
} from './scanblocks';
export { default as getSdnData, SdnAdaptorDeets } from './sdn';
export { default as getShowtimeData, ShowtimeAdaptorDeets } from './showtime';
export {
  default as getSuperrareData,
  SuperrareAdaptorDeets,
} from './superrare';
export {
  default as getTokenBlacklistData,
  TokenblacklistsAdaptorDeets,
} from './tokenblacklists';
export { default as getTxnData, TxnAdaptorDeets } from './txn';
export { default as getUnipassData, UnipassAdaptorDeets } from './unipass';
export { default as getSybilData, UniswapAdaptorDeets } from './uniswap';
export {
  default as resolveUnstoppableDomains,
  UnstoppableAdaptorDeets,
} from './unstoppable';
export { default as getUpalaData, UpalaAdaptorDeets } from './upala';
export { default as getUpshotData, UpshotAdaptorDeets } from './upshot';
export { default as getYupData, YupAdaptorDeets } from './yup';
export { default as getZapperData, ZapperAdaptorDeets } from './zapper';
export { default as getZoraData, ZoraAdaptorDeets } from './zora';

export const AdaptorData: Array<AdaptorDeets> = [
  OneZeroOneBadgesAdaptorDeets,
  AaveAdaptorDeets,
  AlchemyAdaptorDeets,
  ArcxAdaptorDeets,
  AsyncartAdaptorDeets,
  BabtAdaptorDeets,
  BirdAdaptorDeets,
  BoardroomAdaptorDeets,
  BrightidAdaptorDeets,
  CeloAdaptorDeets,
  ChainabuseAdaptorDeets,
  CoinviseAdaptorDeets,
  CommonsstackAdaptorDeets,
  CoordinapeAdaptorDeets,
  CredprotocolAdaptorDeets,
  CryptoreliefAdaptorDeets,
  CryptoscamdbAdaptorDeets,
  CyberconnectAdaptorDeets,
  DapplistAdaptorDeets,
  DebankAdaptorDeets,
  DeepdaodaptorDeets,
  EnsAdaptorDeets,
  EtherscanAdaptorDeets,
  FortaAdaptorDeets,
  FoundationQueryResult,
  GitcoinAdaptorDeets,
  GivethAdaptorDeets,
  GoldfinchAdaptorDeets,
  GoplusAdaptorDeets,
  GovernordaoAdaptorDeets,
  HbtAdaptorDeets,
  HiveoneAdaptorDeets,
  HuddlnAdaptorDeets,
  IdenaAdaptorDeets,
  KarmaAdaptorDeets,
  KlimaAdaptorDeets,
  KnownoriginAdaptorDeets,
  LabelAdaptorDeets,
  Layer3AdaptorDeets,
  Learnweb3AdaptorDeets,
  LensAdaptorDeets,
  MazuryAdaptorDeets,
  MetagameAdaptorDeets,
  MewAdaptorDeets,
  MirrorAdaptorDeets,
  ParallelAdaptorDeets,
  PoapAdaptorDeets,
  PohAdaptorDeets,
  PolygonAdaptorDeets,
  ProjectgalaxyAdaptorDeets,
  PopAdaptorDeets,
  QuadrataAdaptorDeets,
  QuestbookAdaptorDeets,
  RabbitholeAdaptorDeets,
  RaribleAdaptorDeets,
  RocifiAdaptorDeets,
  Rss3AdaptorDeets,
  ScanblocksAdaptorDeets,
  SdnAdaptorDeets,
  ShowtimeAdaptorDeets,
  SuperrareAdaptorDeets,
  TokenblacklistsAdaptorDeets,
  TxnAdaptorDeets,
  UnipassAdaptorDeets,
  UniswapAdaptorDeets,
  UnstoppableAdaptorDeets,
  UpalaAdaptorDeets,
  UpshotAdaptorDeets,
  YupAdaptorDeets,
  ZapperAdaptorDeets,
  ZoraAdaptorDeets,
];

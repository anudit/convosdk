export interface Dictionary<T> {
  [Key: string]: T;
}

export interface ErrorType {
  error: any;
}

export interface LogConfigType {
  node: string;
  apikey: string;
  pingResult: any | ErrorType;
  latestVersion: string;
  currentVersion: string;
}

export type CommentsQueryType = {
  threadId?: string;
  url?: string;
  author?: string;
  tag1?: string;
  tag2?: string;
  replyTo?: string;
  latestFirst?: string;
  page?: number;
  pageSize?: number;
  airdrop?: boolean;
  airdropMode?: 'csv' | 'json';
  airdropAmount?: number;
};

export type ThreadsQueryType = {
  threadId?: string;
  createdOn?: string;
  creator?: string;
  title?: string;
  url?: string;
  isReadPublic?: string;
  isWritePublic?: string;
  member?: string;
  moderator?: string;
  keyword1?: string;
  keyword2?: string;
  keyword3?: string;
  page?: string;
  pageSize?: string;
  latestFirst?: boolean;
  countOnly?: boolean;
};

export type ComputeConfig = {
  polygonMainnetRpc: string;
  etherumMainnetRpc: string;
  avalancheMainnetRpc: string;
  maticPriceInUsd: number;
  etherumPriceInUsd: number;
  deepdaoApiKey: string;
  etherscanApiKey: string;
  polygonscanApiKey: string;
  optimismscanApiKey: string;
  zapperApiKey: string;
  alchemyApiKey: string;
  CNVSEC_ID: string;
  DEBUG: boolean;
};

export interface AuthResp {
  success: boolean;
  message: string;
}

export type AdaptorFunctionParamsType = {
  address: string;
};
export type AdaptorFunctionParamsWithConfigType = {
  address: string;
  computeConfig: ComputeConfig;
};

export type AdaptorFunctionType = (address: string) => Promise<any>;
export type AdaptorFunctionWithConfigType = (
  address: string,
  computeConfig: ComputeConfig
) => Promise<any>;

export interface EtherscanResult {
  error?: string;
  label?: string;
  tags?: Array<string>;
}

export interface CommentResp {
  author: string;
  authorENS: false | string;
  chain: string;
  createdOn: string;
  downvotes: Array<string>;
  editHistory: Array<string>;
  metadata: Dictionary<string>;
  replyTo: string;
  tag1: string;
  tag2: string;
  text: string;
  tid: string;
  upvotes: Array<string>;
  url: string;
  _id: string;
  _mod: number;
  success?: boolean;
  error?: string;
}

export type AdaptorKeys =
  | '101badges'
  | 'aave'
  | 'alchemy'
  | 'arcx'
  | 'asyncart'
  | 'babt'
  | 'bird'
  | 'boardroom'
  | 'brightid'
  | 'celo'
  | 'chainabuse'
  | 'coinvise'
  | 'commonsstack'
  | 'coordinape'
  | 'credprotocol'
  | 'cryptorelief'
  | 'cryptoscamdb'
  | 'cyberconnect'
  | 'dapplist'
  | 'debank'
  | 'deepdao'
  | 'ens'
  | 'etherscan'
  | 'ethrank'
  | 'forta'
  | 'foundation'
  | 'gitcoin'
  | 'giveth'
  | 'golden'
  | 'goldfinch'
  | 'goplus'
  | 'governordao'
  | 'hbt'
  | 'hiveone'
  | 'huddln'
  | 'idena'
  | 'karma'
  | 'klima'
  | 'knownorigin'
  | 'krebit'
  | 'labels'
  | 'layer3'
  | 'learnweb3'
  | 'lens'
  | 'mazury'
  | 'metagame'
  | 'mew'
  | 'mirror'
  | 'parallel'
  | 'poap'
  | 'poh'
  | 'pop'
  | 'polygon'
  | 'projectgalaxy'
  | 'quadrata'
  | 'questbook'
  | 'rabbithole'
  | 'rarible'
  | 'rocifi'
  | 'rss3'
  | 'scanblocks'
  | 'sdn'
  | 'seedchain'
  | 'showtime'
  | 'superrare'
  | 'tokenblacklists'
  | 'txn'
  | 'unipass'
  | 'uniswap'
  | 'unstoppable'
  | 'upala'
  | 'upshot'
  | 'yup'
  | 'zapper'
  | 'zora';

export interface AdaptorDeets {
  id: AdaptorKeys;
  name: string;
  projectUrl: string;
  projectThumbnail: `ipfs://${string}`;
  requiredConfigKeys: Array<keyof ComputeConfig>;
}

export interface txnResp {
  age: number;
  txnCount: number;
  gasSpent: string;
  contractsDeployed: number;
  failedTxnCount: number;
  failedGasSpent: string;
  fundedByTornadoCash?: boolean;
  tornadoInteractions?: number;
}

export interface ScanblocksResult {
  address_id: string;
  address: string;
  blockchain: string;
  reason: 'hacker' | 'phisher' | 'scammer' | 'fraudster' | '';
  describe_report: string;
  url: string;
}

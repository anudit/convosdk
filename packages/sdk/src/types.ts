export interface Dictionary<T> {
  [Key: string]: T;
}

export interface ErrorType {
  error: any;
}

export type BundlephobiaResp = {
  version: string;
};

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

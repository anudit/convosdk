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
  page?: string;
  pageSize?: string;
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
  maticMainnetRpc?: string;
  etherumMainnetRpc?: string;
  avalancheMainnetRpc?: string;
  ethereumPriceApi?: string;
  maticPriceApi?: string;
  etherumAndMaticPriceApi?: string;
  deepdaoApiKey: string;
  CNVSEC_ID: string;
  DEBUG: boolean;
};

import { Response } from 'cross-fetch';

export interface Dictionary<T> {
  [Key: string]: T;
}
export interface ErrorType {
  error: any;
}
export interface LogConfigType {
  base: string;
  apikey: string;
  version: string;
  pingResult: Response | ErrorType;
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
}

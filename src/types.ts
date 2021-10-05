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
  pingResult: any | ErrorType;
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
  keyword?: string;
  page?: string;
  pageSize?: string;
};

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

export interface Dictionary<T> {
  [Key: string]: T;
}

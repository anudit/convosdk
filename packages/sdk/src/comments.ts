import { CommentsQueryType, Dictionary, ErrorType } from './types';
import { encodeQuery, fetcher } from './utils';

class Comments {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    comment: string,
    threadId: string,
    url: string,
    metadata: Dictionary<any> = {},
    replyTo?: string,
    tag1?: string,
    tag2?: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/comments`, this.apikey, {
      token,
      signerAddress,
      comment,
      threadId,
      url: decodeURIComponent(url),
      metadata,
      replyTo,
      tag1,
      tag2,
    });
  };

  delete = async (
    signerAddress: string,
    token: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('DELETE', `${this.node}/comments`, this.apikey, {
      token,
      signerAddress,
      commentId,
    });
  };

  nuke = async (
    signerAddress: string,
    token: string
  ): Promise<any | ErrorType> => {
    return await fetcher('DELETE', `${this.node}/comments`, this.apikey, {
      token,
      signerAddress,
      deleteAll: true,
    });
  };

  query = async (
    query: CommentsQueryType,
    timeout = 6000
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/comments?${encodeQuery(query)}`,
      this.apikey,
      {},
      {},
      timeout
    );
  };

  getComment = async (commentId: string): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/comment?commentId=${commentId}`,
      this.apikey,
      {}
    );
  };

  multiQuery = async (
    queries: Array<CommentsQueryType>
  ): Promise<any | ErrorType> => {
    return await Promise.allSettled(
      queries.map((q) => {
        return this.query(q);
      })
    );
  };

  update = async (
    signerAddress: string,
    token: string,
    commentId: string,
    comment: string
  ): Promise<any | ErrorType> => {
    return await fetcher('PATCH', `${this.node}/comments`, this.apikey, {
      token,
      signerAddress,
      commentId,
      comment,
    });
  };

  toggleUpvote = async (
    signerAddress: string,
    token: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/vote`, this.apikey, {
      token,
      signerAddress,
      type: 'toggleupvote',
      commentId,
    });
  };

  toggleDownvote = async (
    signerAddress: string,
    token: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/vote`, this.apikey, {
      token,
      signerAddress,
      type: 'toggledownvote',
      commentId,
    });
  };
}
export default Comments;

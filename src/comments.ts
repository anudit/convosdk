import { CommentsQueryType, ErrorType } from './types';
import { encodeQuery, fetcher } from './utils';

class Comments {
  apikey: string;
  base: string;

  constructor(apikey: string, base: string) {
    this.apikey = apikey;
    this.base = base;
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    comment: string,
    threadId: string,
    url: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        comment,
        threadId,
        url: decodeURIComponent(url),
      }
    );
  };

  delete = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'DELETE',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        commentId,
      }
    );
  };

  query = async (query: CommentsQueryType): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.base}/comments?apikey=${this.apikey}&${encodeQuery(query)}`,
      {}
    );
  };

  toggleUpvote = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.base}/vote?apikey=${this.apikey}`, {
      token,
      signerAddress,
      type: 'toggleupvote',
      commentId,
    });
  };

  toggleDownvote = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.base}/vote?apikey=${this.apikey}`, {
      token,
      signerAddress,
      type: 'toggledownvote',
      commentId,
    });
  };
}
export default Comments;

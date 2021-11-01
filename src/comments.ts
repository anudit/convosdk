import { CommentsQueryType, ErrorType } from './types';
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
    url: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.node}/comments?apikey=${this.apikey}`,
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
    signerAddress: string,
    token: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'DELETE',
      `${this.node}/comments?apikey=${this.apikey}`,
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
      `${this.node}/comments?apikey=${this.apikey}&${encodeQuery(query)}`,
      {}
    );
  };

  toggleUpvote = async (
    signerAddress: string,
    token: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/vote?apikey=${this.apikey}`, {
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
    return await fetcher('POST', `${this.node}/vote?apikey=${this.apikey}`, {
      token,
      signerAddress,
      type: 'toggledownvote',
      commentId,
    });
  };
}
export default Comments;

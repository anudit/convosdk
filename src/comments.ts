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
    try {
      return await fetcher(
        'POST',
        `${this.base}/comments?apikey=${this.apikey}`,
        {
          token,
          signerAddress,
          comment,
          threadId,
          url: encodeURIComponent(url),
        }
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  delete = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    try {
      return await fetcher(
        'DELETE',
        `${this.base}/comments?apikey=${this.apikey}`,
        {
          token,
          signerAddress,
          commentId,
        }
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  query = async (query: CommentsQueryType): Promise<any | ErrorType> => {
    try {
      return await fetcher(
        'GET',
        `${this.base}/comments?apikey=${this.apikey}&${encodeQuery(query)}`,
        {}
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  toggleUpvote = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    try {
      return await fetcher('POST', `${this.base}/vote?apikey=${this.apikey}`, {
        token,
        signerAddress,
        type: 'toggleupvote',
        commentId,
      });
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  toggleDownvote = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<any | ErrorType> => {
    try {
      return await fetcher('POST', `${this.base}/vote?apikey=${this.apikey}`, {
        token,
        signerAddress,
        type: 'toggledownvote',
        commentId,
      });
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}
export default Comments;

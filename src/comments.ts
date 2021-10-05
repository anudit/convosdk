import { CommentsQueryType, ErrorType } from './types';
import { fetcher } from './utils';

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
    const params = new URLSearchParams(query);
    params.append('apikey', this.apikey);

    try {
      return await fetcher(
        'GET',
        `${this.base}/comments?${params.toString()}`,
        {}
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  //TODO: upvote
  //TODO: downvote
}
export default Comments;

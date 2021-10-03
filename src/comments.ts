import fetch, { Response } from 'cross-fetch';
import { CommentsQueryType, ErrorType } from './types';

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
  ): Promise<Response | ErrorType> => {
    try {
      let data = await fetch(`${this.base}/comments?apikey=${this.apikey}`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          signerAddress,
          comment,
          threadId,
          url: encodeURIComponent(url),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = await data.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  delete = async (
    token: string,
    signerAddress: string,
    commentId: string
  ): Promise<Response | ErrorType> => {
    try {
      let data = await fetch(`${this.base}/comments?apikey=${this.apikey}`, {
        method: 'DELETE',
        body: JSON.stringify({
          token,
          signerAddress,
          commentId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = await data.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  query = async (query: CommentsQueryType): Promise<Response | ErrorType> => {
    const params = new URLSearchParams(query);
    params.append('apikey', this.apikey);

    // for (const [key, value] of Object.entries(query)) {
    //   params.append(key, value);
    // }

    try {
      let data = await fetch(`${this.base}/comments?${params.toString()}`, {
        method: 'GET',
      });
      data = await data.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}
export default Comments;

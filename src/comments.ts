import axios, { AxiosError } from 'axios';
import { Dictionary, ErrorType } from './types';
import ConvoBase from './base';

class Comments extends ConvoBase {
  constructor(apikey: string) {
    super(apikey);
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    comment: string,
    threadId: string,
    url: string
  ): Promise<AxiosError<never> | Dictionary<string> | ErrorType> => {
    try {
      const { data } = await axios.post(
        `${this.base}/comments?apikey=${this.apikey}`,
        {
          token,
          signerAddress,
          comment,
          threadId,
          url: encodeURIComponent(url),
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return error;
      } else {
        console.log(error);
        return { error };
      }
    }
  };

  delete = async (
    token: string,
    commentId: string
  ): Promise<Dictionary<string> | AxiosError<never> | ErrorType> => {
    try {
      const { data } = await axios.delete(
        `${this.base}/comments?apikey=${this.apikey}`,
        {
          data: {
            token,
            commentId,
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return { error };
      } else {
        console.log(error);
        return { error };
      }
    }
  };

  // query
}
export default Comments;

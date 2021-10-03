import axios, { AxiosError } from 'axios';
import { Dictionary, ErrorType } from './types';
import ConvoBase from './base';

class Identity extends ConvoBase {
  constructor(apikey: string) {
    super(apikey);
    return this;
  }

  getTrustScore = async (
    address: string,
  ): Promise<AxiosError<never> | Dictionary<string> | ErrorType> => {
    try {
      const { data } = await axios.get(
        `${this.base}/identity?address=${address}&apikey=${this.apikey}`
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
}
export default Identity;

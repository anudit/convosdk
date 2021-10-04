import fetch from 'unfetch';
import { ErrorType } from './types';

class Identity {
  apikey: string;
  base: string;

  constructor(apikey: string, base: string) {
    this.apikey = apikey;
    this.base = base;
    return this;
  }

  getTrustScore = async (address: string): Promise<any | ErrorType> => {
    try {
      let data = await fetch(
        `${this.base}/identity?address=${address}&apikey=${this.apikey}`
      );
      data = await data.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}
export default Identity;

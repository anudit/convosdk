import { fetcher } from './utils';
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
      return await fetcher(
        'GET',
        `${this.base}/identity?address=${address}&apikey=${this.apikey}`,
        {}
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}
export default Identity;

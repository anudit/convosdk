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
    return await fetcher(
      'GET',
      `${this.base}/identity?address=${address}&apikey=${this.apikey}`,
      {}
    );
  };
}
export default Identity;

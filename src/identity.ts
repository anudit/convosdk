import { fetcher } from './utils';
import { ErrorType } from './types';

class Identity {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  getTrustScore = async (address: string): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/identity?address=${address}`,
      this.apikey,
      {}
    );
  };
}
export default Identity;

import { fetcher } from './utils.ts';
import Credentials from './omnid/credentials.ts';
import {
  ComputeConfig,
  ErrorType,
  AdaptorFunctionType,
  AdaptorFunctionWithConfigType,
  Dictionary,
} from './types.ts';

class Omnid {
  apikey: string;
  node: string;
  credentials: Credentials;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    this.credentials = new Credentials(apikey, this.node);
    return this;
  }

  getTrustScore = async (
    address: string,
    noCache?: boolean
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/identity?address=${address}${
        Boolean(noCache) == true ? '&noCache=true' : ''
      }`,
      this.apikey,
      {}
    );
  };

  getTrustScoreWithProof = async (
    address: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/zkidentity?address=${address}`,
      this.apikey,
      {}
    );
  };

}

export default Omnid;

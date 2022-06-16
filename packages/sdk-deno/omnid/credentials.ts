import { Dictionary } from '../types.ts';
import { fetcher } from './../utils.ts';

class Credentials {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  issue = async (address: string, adaptor: string): Promise<string> => {
    const resp = await fetcher(
      'POST',
      `${this.node}/omnid/credentials/issue`,
      this.apikey,
      { address, adaptor }
    );
    return resp;
  };

  verify = async (verifiableCredential: Dictionary<any>): Promise<string> => {
    const resp = await fetcher(
      'POST',
      `${this.node}/omnid/credentials/verify`,
      this.apikey,
      { verifiableCredential }
    );
    return resp;
  };
}

export default Credentials;

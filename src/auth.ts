import { ErrorType } from './types';
import { fetcher } from './utils';

class Auth {
  apikey: string;
  base: string;

  constructor(apikey: string, base: string) {
    this.apikey = apikey;
    this.base = base;
    return this;
  }

  validate = async (
    signerAddress: string,
    token: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/validateAuth?apikey=${this.apikey}`,
      {
        signerAddress,
        token,
      }
    );
  };

  authenticate = async (
    signerAddress: string,
    signature: any,
    timestamp: number,
    chain: string,
    accountId: string | undefined
  ): Promise<any | ErrorType> => {
    if (chain === 'ethereum') {
      return await fetcher('POST', `${this.base}/auth?apikey=${this.apikey}`, {
        signerAddress,
        signature,
        timestamp,
        chain: 'ethereum',
      });
    } else if (chain === 'near') {
      return await fetcher('POST', `${this.base}/auth?apikey=${this.apikey}`, {
        signerAddress,
        signature,
        accountId,
        timestamp,
        chain: 'near',
      });
    } else if (chain === 'flow') {
      return await fetcher('POST', `${this.base}/auth?apikey=${this.apikey}`, {
        signerAddress,
        signature,
        timestamp,
        chain: 'flow',
      });
    } else {
      const error = 'Invalid Chain Name';
      console.error(error);
      return { error };
    }
  };

  getSignatureData(signerAddress: string, timestamp: number): string {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }
}
export default Auth;

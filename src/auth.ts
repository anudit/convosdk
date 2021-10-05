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
    try {
      return await fetcher(
        'POST',
        `${this.base}/validateAuth?apikey=${this.apikey}`,
        {
          signerAddress,
          token,
        }
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  authenticate = async (
    signerAddress: string,
    signature: string,
    timestamp: number,
    chain: string,
    accountId: string | undefined
  ): Promise<any | ErrorType> => {
    try {
      if (chain === 'ethereum') {
        return await fetcher(
          'POST',
          `${this.base}/auth?apikey=${this.apikey}`,
          {
            signerAddress,
            signature,
            timestamp,
            chain,
          }
        );
      } else if (chain === 'near') {
        return await fetcher(
          'POST',
          `${this.base}/auth?apikey=${this.apikey}`,
          {
            signerAddress,
            signature,
            accountId,
            timestamp,
            chain,
          }
        );
      } else {
        const error = 'Invalid Chain Name';
        console.error(error);
        return { error };
      }
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  getSignatureData(signerAddress: string, timestamp: number): string {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }
}
export default Auth;

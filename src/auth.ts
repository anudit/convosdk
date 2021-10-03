import fetch, { Response } from 'cross-fetch';
import { ErrorType } from './types';

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
  ): Promise<Response | ErrorType> => {
    try {
      let data = await fetch(
        `${this.base}/validateAuth?apikey=${this.apikey}`,
        {
          method: 'POST',
          body: JSON.stringify({
            signerAddress,
            token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      data = await data.json();
      return data;
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
  ): Promise<Response | ErrorType> => {
    try {
      if (chain === 'ethereum') {
        let data = await fetch(`${this.base}/auth?apikey=${this.apikey}`, {
          method: 'POST',
          body: JSON.stringify({
            signerAddress,
            signature,
            timestamp,
            chain,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        data = await data.json();
        return data;
      } else if (chain === 'near') {
        let data = await fetch(`${this.base}/auth?apikey=${this.apikey}`, {
          method: 'POST',
          body: JSON.stringify({
            signerAddress,
            signature,
            accountId,
            timestamp,
            chain,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        data = await data.json();
        return data;
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

import { ErrorType } from './types.ts';
import { fetcher } from './utils.ts';

class Auth {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  validate = async (
    signerAddress: string,
    token: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/validateAuth`, this.apikey, {
      signerAddress,
      token,
    });
  };

  authenticate = async (
    signerAddress: string,
    signature: any,
    timestamp: number,
    chain: string,
    accountId = ''
  ): Promise<any | ErrorType> => {
    const ep = `${this.node}/auth`;
    if (chain === 'ethereum') {
      return await fetcher('POST', ep, this.apikey, {
        signerAddress,
        signature,
        timestamp,
        chain: 'ethereum',
      });
    } else if (chain === 'near') {
      return await fetcher('POST', ep, this.apikey, {
        signerAddress,
        signature,
        accountId,
        timestamp,
        chain: 'near',
      });
    } else if (chain === 'flow') {
      return await fetcher('POST', ep, this.apikey, {
        signerAddress,
        signature,
        timestamp,
        chain: 'flow',
      });
    } else if (chain === 'solana') {
      return await fetcher('POST', ep, this.apikey, {
        signerAddress,
        signature,
        timestamp,
        chain: 'solana',
      });
    } else {
      const error = 'Invalid Chain Name';
      console.error(error);
      return { error };
    }
  };

  authenticateV2 = async (
    message: string,
    signature: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/authV2`, this.apikey, {
      message,
      signature,
      chain: 'ethereum',
    });
  };

  getSignatureData(signerAddress: string, timestamp: number): string {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }

}
export default Auth;

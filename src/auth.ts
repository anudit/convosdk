import axios, { AxiosError } from 'axios';
import {
  AuthAuthenticateType,
  AuthAuthenticateType2,
  Dictionary,
  ErrorType,
} from './types';
import ConvoBase from './base';

class Auth extends ConvoBase {
  constructor(apikey: string) {
    super(apikey);
    return this;
  }

  validate = async (
    signerAddress: string,
    token: string
  ): Promise<AxiosError<never> | Dictionary<string> | ErrorType> => {
    try {
      const { data } = await axios.post(
        `${this.base}/validateAuth?apikey=${this.apikey}`,
        {
          signerAddress,
          token,
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return error;
      } else {
        console.log(error);
        return { error };
      }
    }
  };

  authenticate = async (
    signerAddress: string,
    signature: string,
    timestamp: number,
    chain: string,
    accountId: string | undefined
  ): Promise<
    | AxiosError<never>
    | ErrorType
    | Dictionary<boolean>
    | AuthAuthenticateType2
    | AuthAuthenticateType
  > => {
    try {
      if (chain === 'ethereum') {
        const { data } = await axios.post(
          `${this.base}/auth?apikey=${this.apikey}`,
          {
            signerAddress,
            signature,
            timestamp,
            chain,
          }
        );
        return data;
      } else if (chain === 'near') {
        const { data } = await axios.post(
          `${this.base}/auth?apikey=${this.apikey}`,
          {
            signerAddress,
            signature,
            accountId,
            timestamp,
            chain,
          }
        );
        return data;
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return error;
      } else {
        console.log(error);
        return { error };
      }
    }
  };

  getSignatureData(signerAddress: string, timestamp: number): string {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }
}
export default Auth;

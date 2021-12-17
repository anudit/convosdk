import { SignatureType, SiweMessage, generateNonce } from 'siwe';
import { ErrorType } from './types';
import { fetcher } from './utils';

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
    token: string,
    version = 1
  ): Promise<any | ErrorType> => {
    let ep = `${this.node}/validateAuth`;
    if (version === 2) ep = `${this.node}/validateAuthV2`;
    return await fetcher('POST', ep, this.apikey, {
      signerAddress,
      token,
    });
  };

  authenticate = async (
    signerAddress: string,
    signature: any,
    timestamp: number,
    chain: string,
    accountId = '',
    version = 1
  ): Promise<any | ErrorType> => {
    let ep = `${this.node}/auth`;
    if (version === 2) ep = `${this.node}/authV2`;
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

  getSignatureData(signerAddress: string, timestamp: number): string {
    return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
  }

  getSignatureDataV2(
    domain: string,
    uri: string,
    signerAddress: string,
    chainId: string,
    resources: Array<string> = []
  ): string {
    const now = new Date();
    const tom = now;
    tom.setDate(now.getDate() + 1);
    resources.push('https://theconvo.space/privacy-policy');
    const message = new SiweMessage({
      domain: domain,
      address: signerAddress,
      chainId: chainId,
      uri: uri,
      version: '1',
      statement: 'I allow this site to access my data on The Convo Space.',
      type: SignatureType.PERSONAL_SIGNATURE,
      nonce: generateNonce(),
      issuedAt: now.toISOString(),
      expirationTime: tom.toISOString(),
      resources: resources,
    });
    return message.toMessage();
  }
}
export default Auth;

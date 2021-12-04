import { ErrorType, LogConfigType } from './types';
import { fetcher } from './utils';

class ConvoBase {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  getApiKey(): string {
    return this.apikey;
  }

  logConfig = async (): Promise<LogConfigType> => {
    const pingResult = await this.ping();
    return {
      node: this.node,
      apikey: this.apikey,
      version: '0.2.2',
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<any | ErrorType> => {
    return await fetcher('GET', `${this.node}/ping`, this.apikey, {});
  };
}

export default ConvoBase;

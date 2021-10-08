import { ErrorType, LogConfigType } from './types';
import { fetcher } from './utils';

class ConvoBase {
  apikey: string;
  base = 'https://theconvo.space/api';

  constructor(apikey: string) {
    this.apikey = apikey;
    return this;
  }

  getApiKey(): string {
    return this.apikey;
  }

  logConfig = async (): Promise<LogConfigType> => {
    const pingResult = await this.ping();
    return {
      base: this.base,
      apikey: this.apikey,
      version: '0.1.7',
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<any | ErrorType> => {
    try {
      return await fetcher('GET', `${this.base}/ping`, {});
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}

export default ConvoBase;

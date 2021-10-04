import fetch from 'unfetch';
import { ErrorType, LogConfigType } from './types';

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
      version: '0.1.5',
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<any | ErrorType> => {
    try {
      let data = await fetch(`${this.base}/ping`);
      data = await data.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}

export default ConvoBase;

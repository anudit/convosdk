import fetch, { Response } from 'cross-fetch';
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
      version: '0.1.3',
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<Response | ErrorType> => {
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

import axios, { AxiosError } from 'axios';
import { Dictionary, ErrorType, LogConfigType } from './types';

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
      version: '0.1.2',
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<
    Dictionary<string> | AxiosError<never> | ErrorType
  > => {
    try {
      const { data } = await axios.get(`${this.base}/ping`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        return { error };
      } else {
        console.log(error);
        return { error };
      }
    }
  };
}

export default ConvoBase;

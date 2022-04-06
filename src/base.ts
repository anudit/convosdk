/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Dictionary, ErrorType, LogConfigType } from './types';
import { fetcher } from './utils';
import fetch from 'cross-fetch';

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
    const pingResult: Dictionary<any> = await this.ping();
    const versionInfo: any = await fetch(
      'https://bundlephobia.com/api/size?package=@theconvospace/sdk@latest&record=true'
    ).then((r) => {
      return r.json();
    });
    return {
      node: this.node,
      apikey: this.apikey,
      currentVersion: '0.3.39',
      latestVersion: versionInfo['version'],
      pingResult: pingResult,
    };
  };

  ping = async (): Promise<any | ErrorType> => {
    return await fetcher('GET', `${this.node}/ping`, this.apikey, {});
  };
}

export default ConvoBase;

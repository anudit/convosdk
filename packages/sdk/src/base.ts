import { Dictionary, ErrorType, LogConfigType } from './types';
import { fetcher } from './utils';
import fetch from 'cross-fetch';
import { version } from '../package.json';

type npmResp = { version: string };

class ConvoBase {
  apikey: string;
  node: string;
  version = version;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  logConfig = async (): Promise<LogConfigType> => {
    const pingResult: Dictionary<any> = await this.pingNode();
    const versionInfo: npmResp = await fetch(
      'https://registry.npmjs.org/@theconvospace/sdk/latest'
    ).then((r) => {
      return r.json() as Promise<npmResp>;
    });
    return {
      node: this.node,
      apikey: this.apikey,
      currentVersion: this.version,
      latestVersion: versionInfo['version'],
      pingResult: pingResult,
    };
  };

  pingNode = async (): Promise<any | ErrorType> => {
    return await fetcher('GET', `${this.node}/ping`, this.apikey, {});
  };

  listNodes = () => {
    return [
      '',
      'backup.',
      'node1.',
      'node2.',
      'node3.',
      'node4.',
      'node5.',
    ].map((e) => `https://${e}theconvo.space/api`);
  };

  switchNode = (newNodeAddress: string) => {
    this.node = newNodeAddress;
  };
}

export default ConvoBase;

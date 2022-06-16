import {
    Dictionary,
    ErrorType,
    LogConfigType,
  } from './types.ts';
import { fetcher } from './utils.ts';

  class ConvoBase {
    apikey: string;
    node: string;
    version = '0.1.1';

    constructor(apikey: string, node: string) {
      this.apikey = apikey;
      this.node = node;
      return this;
    }

    logConfig = async (): Promise<LogConfigType> => {
      const pingResult: Dictionary<any> = await this.pingNode();
      return {
        node: this.node,
        apikey: this.apikey,
        currentVersion: this.version,
        platform: 'deno',
        pingResult: pingResult,
      };
    };

    pingNode = async (): Promise<any | ErrorType> => {
      return await fetcher('GET', `${this.node}/ping`, this.apikey, {});
    };

    listNodes = () => {
      return [
        'https://theconvo.space/api',
        'https://backup.theconvo.space/api',
        'https://node1.theconvo.space/api',
        'https://node2.theconvo.space/api',
        'https://node3.theconvo.space/api',
        'https://node4.theconvo.space/api',
      ];
    };

    switchNode = (newNodeAddress: string) => {
      this.node = newNodeAddress;
    };
  }

  export default ConvoBase;

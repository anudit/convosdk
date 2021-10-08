import { ErrorType, ThreadsQueryType } from './types';
import { encodeQuery, fetcher } from './utils';

class Threads {
  apikey: string;
  base: string;

  constructor(apikey: string, base: string) {
    this.apikey = apikey;
    this.base = base;
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    action: string,
    title: string,
    url: string,
    isReadPublic: boolean,
    isWritePublic: boolean,
    members: Array<string>,
    moderators: Array<string>,
    keywords: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.base}/threads?apikey=${this.apikey}`, {
      signerAddress,
      token,
      action,
      title,
      url: encodeURIComponent(url),
      isReadPublic,
      isWritePublic,
      members,
      moderators,
      keywords,
    });
  };

  delete = async (
    token: string,
    signerAddress: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'DELETE',
      `${this.base}/threads?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        threadId,
      }
    );
  };

  query = async (query: ThreadsQueryType): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.base}/comments?apikey=${this.apikey}&${encodeQuery(query)}`,
      {}
    );
  };

  addMembers = async (
    token: string,
    signerAddress: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'addMembers',
        threadId,
        members,
      }
    );
  };

  removeMembers = async (
    token: string,
    signerAddress: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'removeMembers',
        threadId,
        members,
      }
    );
  };

  addModerators = async (
    token: string,
    signerAddress: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'addModerators',
        threadId,
        moderators,
      }
    );
  };

  removeModerators = async (
    token: string,
    signerAddress: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'removeModerators',
        threadId,
        moderators,
      }
    );
  };

  updateTitle = async (
    token: string,
    signerAddress: string,
    threadId: string,
    title: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'updateTitle',
        threadId,
        title,
      }
    );
  };

  updateDescription = async (
    token: string,
    signerAddress: string,
    threadId: string,
    description: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'updateDescription',
        threadId,
        description,
      }
    );
  };

  togglePublicRead = async (
    token: string,
    signerAddress: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'togglePublicRead',
        threadId,
      }
    );
  };

  togglePublicWrite = async (
    token: string,
    signerAddress: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher(
      'POST',
      `${this.base}/comments?apikey=${this.apikey}`,
      {
        token,
        signerAddress,
        action: 'togglePublicWrite',
        threadId,
      }
    );
  };
}

export default Threads;

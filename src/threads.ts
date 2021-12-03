import { Dictionary, ErrorType, ThreadsQueryType } from './types';
import { encodeQuery, fetcher } from './utils';

class Threads {
  apikey: string;
  node: string;

  constructor(apikey: string, node: string) {
    this.apikey = apikey;
    this.node = node;
    return this;
  }

  create = async (
    signerAddress: string,
    token: string,
    title: string,
    description: string,
    url: string,
    isReadPublic: boolean,
    isWritePublic: boolean,
    members: Array<string>,
    moderators: Array<string>,
    keywords: Array<string>,
    metadata: Dictionary<any> = {},
    threadId: boolean | string = false
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      signerAddress,
      token,
      action: 'create',
      title: encodeURIComponent(title),
      description: encodeURIComponent(description),
      url: encodeURIComponent(url),
      isReadPublic,
      isWritePublic,
      members,
      moderators,
      keywords,
      threadId,
      metadata,
    });
  };

  createPrivate = async (
    signerAddress: string,
    token: string,
    title: string,
    description: string,
    url: string,
    members: Array<string>,
    moderators: Array<string>,
    keywords: Array<string>,
    metadata: Dictionary<any> = {},
    threadId: boolean | string = false
  ): Promise<any | ErrorType> => {
    return await this.create(
      signerAddress,
      token,
      title,
      description,
      url,
      false,
      false,
      members,
      moderators,
      keywords,
      metadata,
      threadId
    );
  };

  delete = async (
    signerAddress: string,
    token: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('DELETE', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      threadId,
    });
  };

  query = async (query: ThreadsQueryType): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/threads?${encodeQuery(query)}`,
      this.apikey,
      {}
    );
  };

  multiQuery = async (
    queries: Array<ThreadsQueryType>
  ): Promise<any | ErrorType> => {
    return await Promise.allSettled(
      queries.map((q) => {
        return this.query(q);
      })
    );
  };

  getThread = async (threadId: string): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/threads/${threadId}`,
      this.apikey
    );
  };

  getUserThreads = async (signerAddress: string): Promise<any | ErrorType> => {
    return await fetcher(
      'GET',
      `${this.node}/threads/user/${signerAddress}`,
      this.apikey
    );
  };

  addMembers = async (
    signerAddress: string,
    token: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'addMembers',
      threadId,
      members,
    });
  };

  removeMembers = async (
    signerAddress: string,
    token: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'removeMembers',
      threadId,
      members,
    });
  };

  addModerators = async (
    signerAddress: string,
    token: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'addModerators',
      threadId,
      moderators,
    });
  };

  removeModerators = async (
    signerAddress: string,
    token: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'removeModerators',
      threadId,
      moderators,
    });
  };

  updateTitle = async (
    signerAddress: string,
    token: string,
    threadId: string,
    title: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'updateTitle',
      threadId,
      title,
    });
  };

  updateDescription = async (
    signerAddress: string,
    token: string,
    threadId: string,
    description: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'updateDescription',
      threadId,
      description,
    });
  };

  togglePublicRead = async (
    signerAddress: string,
    token: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'togglePublicRead',
      threadId,
    });
  };

  togglePublicWrite = async (
    signerAddress: string,
    token: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    return await fetcher('POST', `${this.node}/threads`, this.apikey, {
      token,
      signerAddress,
      action: 'togglePublicWrite',
      threadId,
    });
  };
}

export default Threads;

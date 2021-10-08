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
    try {
      return await fetcher(
        'POST',
        `${this.base}/threads?apikey=${this.apikey}`,
        {
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
        }
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  delete = async (
    token: string,
    signerAddress: string,
    threadId: string
  ): Promise<any | ErrorType> => {
    try {
      return await fetcher(
        'DELETE',
        `${this.base}/threads?apikey=${this.apikey}`,
        {
          token,
          signerAddress,
          threadId,
        }
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  query = async (query: ThreadsQueryType): Promise<any | ErrorType> => {
    try {
      return await fetcher(
        'GET',
        `${this.base}/comments?apikey=${this.apikey}&${encodeQuery(query)}`,
        {}
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  addMembers = async (
    token: string,
    signerAddress: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  removeMembers = async (
    token: string,
    signerAddress: string,
    threadId: string,
    members: Array<string>
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  addModerators = async (
    token: string,
    signerAddress: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  removeModerators = async (
    token: string,
    signerAddress: string,
    threadId: string,
    moderators: Array<string>
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  updateTitle = async (
    token: string,
    signerAddress: string,
    threadId: string,
    title: string
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  updateDescription = async (
    token: string,
    signerAddress: string,
    threadId: string,
    description: string
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  togglePublicRead = async (
    token: string,
    signerAddress: string,
    threadId: string,
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  togglePublicWrite = async (
    token: string,
    signerAddress: string,
    threadId: string,
  ): Promise<any | ErrorType> => {
    try {
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
    } catch (error) {
      console.error(error);
      return { error };
    }
  };
}

export default Threads;

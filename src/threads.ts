import { ErrorType, ThreadsQueryType } from './types';
import { fetcher } from './utils';

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
    const params = new URLSearchParams(query);
    params.append('apikey', this.apikey);

    try {
      return await fetcher(
        'GET',
        `${this.base}/comments?${params.toString()}`,
        {}
      );
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  // TODO: addMembers
  // TODO: removeMembers
  // TODO: addModerators
  // TODO: removeModerators
  // TODO: updateTitle
  // TODO: updateDescription
  // TODO: togglePublicRead
  // TODO: toggleWriteRead

}

export default Threads;

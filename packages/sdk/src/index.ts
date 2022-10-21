import Comments from './comments';
import Auth from './auth';
import ConvoBase from './base';
import Threads from './threads';
import Omnid from './omnid';

class Convo extends ConvoBase {
  comments: Comments;
  auth: Auth;
  threads: Threads;
  omnid: Omnid;

  constructor(apikey: string, node = 'https://theconvo.space/api') {
    super(apikey, node);
    this.comments = new Comments(apikey, this.node);
    this.auth = new Auth(apikey, this.node);
    this.threads = new Threads(apikey, this.node);
    this.omnid = new Omnid(apikey, this.node);
    return this;
  }
}

export { Convo };
export * from './types';

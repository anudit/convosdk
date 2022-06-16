import ConvoBase from './base.ts';
import Auth from './auth.ts';
import Comments from './comments.ts';
import Threads from './threads.ts';

class Convo extends ConvoBase {

  auth: Auth;
  comments: Comments;
  threads: Threads;

  constructor(apikey: string, node = 'https://theconvo.space/api') {
    super(apikey, node);
    this.auth = new Auth(apikey, this.node);
    this.comments = new Comments(apikey, this.node);
    this.threads = new Threads(apikey, this.node);
    return this;
  }
}

export { Convo };

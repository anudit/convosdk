import Comments from './comments';
import Auth from './auth';
import ConvoBase from './base';
import Threads from './threads';
import Identity from './identity';

class Convo extends ConvoBase {
  comments: Comments;
  auth: Auth;
  threads: Threads;
  identity: Identity;

  constructor(apikey: string) {
    super(apikey);
    this.comments = new Comments(apikey, this.base);
    this.auth = new Auth(apikey, this.base);
    this.threads = new Threads(apikey, this.base);
    this.identity = new Identity(apikey, this.base);
    return this;
  }
}

export { Convo };

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

  constructor(apikey: string, node = 'https://theconvo.space/api') {
    super(apikey, node);
    this.comments = new Comments(apikey, this.node);
    this.auth = new Auth(apikey, this.node);
    this.threads = new Threads(apikey, this.node);
    this.identity = new Identity(apikey, this.node);
    return this;
  }
}

export { Convo };

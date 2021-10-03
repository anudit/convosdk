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
    this.comments = new Comments(apikey);
    this.auth = new Auth(apikey);
    this.threads = new Threads(apikey);
    this.identity = new Identity(apikey);
    return this;
  }
}

export default Convo;

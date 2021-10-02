import Comments from './comments';
import Auth from './auth';
import ConvoBase from './base';
import Threads from './threads';

class Convo extends ConvoBase {
  comments: Comments;
  auth: Auth;
  threads: Threads;

  constructor(apikey: string) {
    super(apikey);
    this.comments = new Comments(apikey);
    this.auth = new Auth(apikey);
    this.threads = new Threads(apikey);
    return this;
  }

}

export default Convo;

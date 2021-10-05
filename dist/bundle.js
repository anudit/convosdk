(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Convo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})};


},{}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Auth {
    constructor(apikey, base) {
        this.validate = (signerAddress, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, utils_1.fetcher)('POST', `${this.base}/validateAuth?apikey=${this.apikey}`, {
                    signerAddress,
                    token,
                });
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.authenticate = (signerAddress, signature, timestamp, chain, accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (chain === 'ethereum') {
                    return yield (0, utils_1.fetcher)('POST', `${this.base}/auth?apikey=${this.apikey}`, {
                        signerAddress,
                        signature,
                        timestamp,
                        chain,
                    });
                }
                else if (chain === 'near') {
                    return yield (0, utils_1.fetcher)('POST', `${this.base}/auth?apikey=${this.apikey}`, {
                        signerAddress,
                        signature,
                        accountId,
                        timestamp,
                        chain,
                    });
                }
                else {
                    const error = 'Invalid Chain Name';
                    console.error(error);
                    return { error };
                }
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.apikey = apikey;
        this.base = base;
        return this;
    }
    getSignatureData(signerAddress, timestamp) {
        return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
    }
}
exports.default = Auth;

},{"./utils":8}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class ConvoBase {
    constructor(apikey) {
        this.base = 'https://theconvo.space/api';
        this.logConfig = () => __awaiter(this, void 0, void 0, function* () {
            const pingResult = yield this.ping();
            return {
                base: this.base,
                apikey: this.apikey,
                version: '0.1.5',
                pingResult: pingResult,
            };
        });
        this.ping = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, utils_1.fetcher)('GET', `${this.base}/ping`, {});
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.apikey = apikey;
        return this;
    }
    getApiKey() {
        return this.apikey;
    }
}
exports.default = ConvoBase;

},{"./utils":8}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Comments {
    constructor(apikey, base) {
        this.create = (signerAddress, token, comment, threadId, url) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, utils_1.fetcher)('POST', `${this.base}/comments?apikey=${this.apikey}`, {
                    token,
                    signerAddress,
                    comment,
                    threadId,
                    url: encodeURIComponent(url),
                });
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.delete = (token, signerAddress, commentId) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, utils_1.fetcher)('DELETE', `${this.base}/comments?apikey=${this.apikey}`, {
                    token,
                    signerAddress,
                    commentId,
                });
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.query = (query) => __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams(query);
            params.append('apikey', this.apikey);
            // for (const [key, value] of Object.entries(query)) {
            //   params.append(key, value);
            // }
            try {
                return yield (0, utils_1.fetcher)('GET', `${this.base}/comments?${params.toString()}`, {});
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.apikey = apikey;
        this.base = base;
        return this;
    }
}
exports.default = Comments;

},{"./utils":8}],5:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class Identity {
    constructor(apikey, base) {
        this.getTrustScore = (address) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, utils_1.fetcher)('GET', `${this.base}/identity?address=${address}&apikey=${this.apikey}`, {});
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
        this.apikey = apikey;
        this.base = base;
        return this;
    }
}
exports.default = Identity;

},{"./utils":8}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convo = void 0;
const comments_1 = __importDefault(require("./comments"));
const auth_1 = __importDefault(require("./auth"));
const base_1 = __importDefault(require("./base"));
const threads_1 = __importDefault(require("./threads"));
const identity_1 = __importDefault(require("./identity"));
class Convo extends base_1.default {
    constructor(apikey) {
        super(apikey);
        this.comments = new comments_1.default(apikey, this.base);
        this.auth = new auth_1.default(apikey, this.base);
        this.threads = new threads_1.default(apikey, this.base);
        this.identity = new identity_1.default(apikey, this.base);
        return this;
    }
}
exports.Convo = Convo;

},{"./auth":2,"./base":3,"./comments":4,"./identity":5,"./threads":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Threads {
    constructor(apikey, base) {
        this.apikey = apikey;
        this.base = base;
        return this;
    }
}
exports.default = Threads;

},{}],8:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const unfetch_1 = __importDefault(require("unfetch"));
function fetcher(requestMethod, url, body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (requestMethod === 'GET') {
            let data = yield (0, unfetch_1.default)(url);
            data = yield data.json();
            return data;
        }
        else if (requestMethod === 'POST' ||
            requestMethod === 'UPDATE' ||
            requestMethod === 'DELETE') {
            let data = yield (0, unfetch_1.default)(url, {
                method: requestMethod,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            data = yield data.json();
            return data;
        }
    });
}
exports.fetcher = fetcher;

},{"unfetch":1}]},{},[6])(6)
});

// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

async function fetcher(requestMethod, url, apikey = '', body = {}, customHeaders = {}, timeout = 6000) {
    const controller = new AbortController();
    const timer = setTimeout(()=>{
        controller.abort();
    }, timeout);
    try {
        let reqUrl = url;
        if (apikey != '') {
            reqUrl += (url.includes('?') === true ? '&' : '?') + 'apikey=' + apikey;
        }
        const reqOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...customHeaders
            },
            signal: controller.signal
        };
        if (requestMethod !== 'GET') {
            reqOptions['method'] = requestMethod;
            reqOptions['body'] = JSON.stringify(body);
        }
        const response = await fetch(reqUrl, reqOptions);
        if (response.ok === true && response.status >= 200 && response.status < 300) {
            const data = await response.json();
            return data;
        } else {
            return {
                error: {
                    message: 'Invalid Request',
                    response: response
                }
            };
        }
    } catch (error) {
        console.error(url, error);
        return {
            error
        };
    } finally{
        clearTimeout(timer);
    }
}
function encodeQuery(data) {
    let query = '';
    for(const d in data)query += encodeURIComponent(d) + '=' + encodeURIComponent(data[d]) + '&';
    return query.slice(0, -1);
}
class ConvoBase {
    apikey;
    node;
    version = '0.1.1';
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        return this;
    }
    logConfig = async ()=>{
        const pingResult = await this.pingNode();
        return {
            node: this.node,
            apikey: this.apikey,
            currentVersion: this.version,
            platform: 'deno',
            pingResult: pingResult
        };
    };
    pingNode = async ()=>{
        return await fetcher('GET', `${this.node}/ping`, this.apikey, {});
    };
    listNodes = ()=>{
        return [
            'https://theconvo.space/api',
            'https://backup.theconvo.space/api',
            'https://node1.theconvo.space/api',
            'https://node2.theconvo.space/api',
            'https://node3.theconvo.space/api',
            'https://node4.theconvo.space/api', 
        ];
    };
    switchNode = (newNodeAddress)=>{
        this.node = newNodeAddress;
    };
}
class Auth {
    apikey;
    node;
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        return this;
    }
    validate = async (signerAddress, token)=>{
        return await fetcher('POST', `${this.node}/validateAuth`, this.apikey, {
            signerAddress,
            token
        });
    };
    authenticate = async (signerAddress, signature, timestamp, chain, accountId = '')=>{
        const ep = `${this.node}/auth`;
        if (chain === 'ethereum') {
            return await fetcher('POST', ep, this.apikey, {
                signerAddress,
                signature,
                timestamp,
                chain: 'ethereum'
            });
        } else if (chain === 'near') {
            return await fetcher('POST', ep, this.apikey, {
                signerAddress,
                signature,
                accountId,
                timestamp,
                chain: 'near'
            });
        } else if (chain === 'flow') {
            return await fetcher('POST', ep, this.apikey, {
                signerAddress,
                signature,
                timestamp,
                chain: 'flow'
            });
        } else if (chain === 'solana') {
            return await fetcher('POST', ep, this.apikey, {
                signerAddress,
                signature,
                timestamp,
                chain: 'solana'
            });
        } else {
            const error = 'Invalid Chain Name';
            console.error(error);
            return {
                error
            };
        }
    };
    authenticateV2 = async (message, signature)=>{
        return await fetcher('POST', `${this.node}/authV2`, this.apikey, {
            message,
            signature,
            chain: 'ethereum'
        });
    };
    getSignatureData(signerAddress, timestamp) {
        return `I allow this site to access my data on The Convo Space using the account ${signerAddress}. Timestamp:${timestamp}`;
    }
}
class Comments {
    apikey;
    node;
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        return this;
    }
    create = async (signerAddress, token, comment, threadId, url, metadata = {}, replyTo, tag1, tag2)=>{
        return await fetcher('POST', `${this.node}/comments`, this.apikey, {
            token,
            signerAddress,
            comment,
            threadId,
            url: decodeURIComponent(url),
            metadata,
            replyTo,
            tag1,
            tag2
        });
    };
    delete = async (signerAddress, token, commentId)=>{
        return await fetcher('DELETE', `${this.node}/comments`, this.apikey, {
            token,
            signerAddress,
            commentId
        });
    };
    nuke = async (signerAddress, token)=>{
        return await fetcher('DELETE', `${this.node}/comments`, this.apikey, {
            token,
            signerAddress,
            deleteAll: true
        });
    };
    query = async (query, timeout = 6000)=>{
        return await fetcher('GET', `${this.node}/comments?${encodeQuery(query)}`, this.apikey, {}, {}, timeout);
    };
    getComment = async (commentId)=>{
        return await fetcher('GET', `${this.node}/comment?commentId=${commentId}`, this.apikey, {});
    };
    multiQuery = async (queries)=>{
        return await Promise.allSettled(queries.map((q)=>{
            return this.query(q);
        }));
    };
    update = async (signerAddress, token, commentId, comment)=>{
        return await fetcher('PATCH', `${this.node}/comments`, this.apikey, {
            token,
            signerAddress,
            commentId,
            comment
        });
    };
    toggleUpvote = async (signerAddress, token, commentId)=>{
        return await fetcher('POST', `${this.node}/vote`, this.apikey, {
            token,
            signerAddress,
            type: 'toggleupvote',
            commentId
        });
    };
    toggleDownvote = async (signerAddress, token, commentId)=>{
        return await fetcher('POST', `${this.node}/vote`, this.apikey, {
            token,
            signerAddress,
            type: 'toggledownvote',
            commentId
        });
    };
}
class Threads {
    apikey;
    node;
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        return this;
    }
    create = async (signerAddress, token, title, description, url, isReadPublic, isWritePublic, members, moderators, keywords, metadata = {}, threadId = false)=>{
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
            metadata,
            threadId
        });
    };
    createPrivate = async (signerAddress, token, title, description, url, members, moderators, keywords, metadata = {}, threadId = false)=>{
        return await this.create(signerAddress, token, title, description, url, false, false, members, moderators, keywords, metadata, threadId);
    };
    delete = async (signerAddress, token, threadId)=>{
        return await fetcher('DELETE', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            threadId
        });
    };
    query = async (query, timeout = 6000)=>{
        return await fetcher('GET', `${this.node}/threads?${encodeQuery(query)}`, this.apikey, {}, {}, timeout);
    };
    multiQuery = async (queries, timeout = 6000)=>{
        return await Promise.allSettled(queries.map((q)=>{
            return this.query(q, timeout);
        }));
    };
    getThread = async (threadId)=>{
        return await fetcher('GET', `${this.node}/threads/${threadId}`, this.apikey);
    };
    getThreads = async (threadIds)=>{
        return await fetcher('GET', `${this.node}/threads/${threadIds.toString()}`, this.apikey);
    };
    getUserThreads = async (signerAddress)=>{
        return await fetcher('GET', `${this.node}/threads/user/${signerAddress}`, this.apikey);
    };
    addMembers = async (signerAddress, token, threadId, members)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'addMembers',
            threadId,
            members
        });
    };
    removeMembers = async (signerAddress, token, threadId, members)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'removeMembers',
            threadId,
            members
        });
    };
    addModerators = async (signerAddress, token, threadId, moderators)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'addModerators',
            threadId,
            moderators
        });
    };
    removeModerators = async (signerAddress, token, threadId, moderators)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'removeModerators',
            threadId,
            moderators
        });
    };
    updateTitle = async (signerAddress, token, threadId, title)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'updateTitle',
            threadId,
            title
        });
    };
    updateDescription = async (signerAddress, token, threadId, description)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'updateDescription',
            threadId,
            description
        });
    };
    togglePublicRead = async (signerAddress, token, threadId)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'togglePublicRead',
            threadId
        });
    };
    togglePublicWrite = async (signerAddress, token, threadId)=>{
        return await fetcher('POST', `${this.node}/threads`, this.apikey, {
            token,
            signerAddress,
            action: 'togglePublicWrite',
            threadId
        });
    };
}
class Credentials {
    apikey;
    node;
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        return this;
    }
    issue = async (address, adaptor)=>{
        const resp = await fetcher('POST', `${this.node}/omnid/credentials/issue`, this.apikey, {
            address,
            adaptor
        });
        return resp;
    };
    verify = async (verifiableCredential)=>{
        const resp = await fetcher('POST', `${this.node}/omnid/credentials/verify`, this.apikey, {
            verifiableCredential
        });
        return resp;
    };
}
class Omnid {
    apikey;
    node;
    credentials;
    constructor(apikey, node){
        this.apikey = apikey;
        this.node = node;
        this.credentials = new Credentials(apikey, this.node);
        return this;
    }
    getTrustScore = async (address, noCache)=>{
        return await fetcher('GET', `${this.node}/identity?address=${address}${Boolean(noCache) == true ? '&noCache=true' : ''}`, this.apikey, {});
    };
    getTrustScoreWithProof = async (address)=>{
        return await fetcher('GET', `${this.node}/zkidentity?address=${address}`, this.apikey, {});
    };
}
class Convo extends ConvoBase {
    auth;
    comments;
    threads;
    omnid;
    constructor(apikey, node = 'https://theconvo.space/api'){
        super(apikey, node);
        this.auth = new Auth(apikey, this.node);
        this.comments = new Comments(apikey, this.node);
        this.threads = new Threads(apikey, this.node);
        this.omnid = new Omnid(apikey, this.node);
        return this;
    }
}
export { Convo as Convo };

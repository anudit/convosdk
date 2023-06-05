const { Convo } = require('@theconvospace/sdk');
const { ethers, Wallet } = require('ethers');
require('dotenv').config()

let NODE = "http://127.0.0.1:3000/api";
let APIKEY = "CONVO";
let commentString = "This is a new comment";
let commentString2 = "This is updated comment";
let threadId = "threadTemp";
let threadTitle = "This is temp thread title";
let webUrl = "https://example.com";

let sdk = new Convo(APIKEY, NODE);


async function testGetInfo() {

    let data = await sdk.logConfig();

    if (data.apikey !== APIKEY) console.log('🔴 [testGetInfo]: API key incorrect');
    if (data.node !== NODE) console.log('🔴 [testGetInfo]: API key incorrect');
    if (data.currentVersion !== data.latestVersion) console.log(`🟡 [testGetInfo]: Outdated SDK, Using:${data.currentVersion} Lastest:${data.latestVersion}`);
    if (data.pingResult?.success !== true) console.log('🔴 [testGetInfo]: Ping to Node failed');

    console.log('✅ testGetInfo Complete');

}

async function testAuth() {

    let wallet = Wallet.createRandom();

    let message = sdk.auth.getSignatureDataV2(
        'https://example.com',
        wallet.address,
        1
    );

    let signedMessage = await wallet.signMessage(message);

    let resp = await sdk.auth.authenticateV2(message, signedMessage);

    if (resp?.success === false) console.log('🔴 [testAuth]: success != true');
    if (Boolean(resp?.message) === false) console.log('🔴 [testAuth]: No authtoken received');

    console.log('✅ testAuth Complete');

}

async function testCommentFlow() {

    let wallet = Wallet.createRandom();

    let message = sdk.auth.getSignatureDataV2(
        webUrl,
        wallet.address,
        1
    );

    let signedMessage = await wallet.signMessage(message);

    const { message: token } = await sdk.auth.authenticateV2(message, signedMessage);

    const resp = await sdk.comments.create(
        wallet.address,
        token,
        commentString,
        threadId,
        encodeURIComponent(webUrl)
    );

    if (resp?.success === false) console.log('🔴 [testCommentFlow/create]: Message create failed');
    if (resp?.text !== commentString) console.log('🔴 [testCommentFlow/create]: Message data is incorrect');
    if (resp?.tid !== threadId) console.log('🔴 [testCommentFlow/create]: threadId is incorrect');
    if (resp?.url !== webUrl) console.log('🔴 [testCommentFlow/create]: webUrl is incorrect');

    console.log('ℹ️  Using id', resp._id);
    console.log('✅ testCommentFlow/create Complete');

    const updateResp = await sdk.comments.update(
        wallet.address,
        token,
        resp._id,
        commentString2
    )

    if (updateResp?.success === false) console.log('🔴 [testCommentFlow/update]: Message update failed');

    const commentAfterUpdate = await sdk.comments.getComment(resp._id);

    if (commentAfterUpdate?.text !== commentString2) console.log('🔴 [testCommentFlow/updateCheck]: Updated text does not match.');
    if (commentAfterUpdate?.editHistory.length !== 1) console.log('🔴 [testCommentFlow/updateCheck]: editHistory not updated.');

    console.log('✅ testCommentFlow/update Complete');


    const upvoteResp = await sdk.comments.toggleUpvote(
        wallet.address,
        token,
        resp._id
    )

    if (upvoteResp?.success !== true) console.log('🔴 [testCommentFlow/upvote]: Upvote failed');

    const commentAfterUpvote = await sdk.comments.getComment(resp._id);

    if (commentAfterUpvote?.upvotes.length !== 1) console.log('🔴 [testCommentFlow/upvoteCheck]: Upvote Check failed');

    console.log('✅ testCommentFlow/upvote Complete');


    const downvoteResp = await sdk.comments.toggleDownvote(
        wallet.address,
        token,
        resp._id
    )

    if (downvoteResp?.success !== true) console.log('🔴 [testCommentFlow/downvote]: Downvote failed');

    const commentAfterDownvote = await sdk.comments.getComment(resp._id);

    if (commentAfterDownvote?.downvotes.length !== 1) console.log('🔴 [testCommentFlow/downvoteCheck]: Downvote Check failed');

    console.log('✅ testCommentFlow/downvote Complete');

    const deleteResp = await sdk.comments.delete(
        wallet.address,
        token,
        resp._id
    )

    if (deleteResp.success !== true) console.log('🔴 [testCommentFlow/delete]: Delete Comment failed', deleteResp?.error);

    console.log('✅ testCommentFlow/delete Complete');

}

async function testNukeFlow() {

    let wallet = Wallet.createRandom();

    let message = sdk.auth.getSignatureDataV2(
        webUrl,
        wallet.address,
        1
    );

    let signedMessage = await wallet.signMessage(message);

    const { message: token } = await sdk.auth.authenticateV2(message, signedMessage);

    await sdk.comments.create(
        wallet.address,
        token,
        commentString,
        threadId,
        encodeURIComponent(webUrl)
    );

    await sdk.comments.create(
        wallet.address,
        token,
        commentString2,
        threadId,
        encodeURIComponent(webUrl)
    );

    let pre = await sdk.comments.query({
        author: wallet.address
    })

    if (pre.length !== 2) console.log('🔴 [testNukeFlow/pre]: Comments not created properly');

    let nukeResp = await sdk.comments.nuke(wallet.address, token);
    if (nukeResp.success !== true) console.log('🔴 [testNukeFlow/nukeResp]: Nuke failed');


    let post = await sdk.comments.query({
        author: wallet.address
    })

    if (post.length !== 0) console.log('🔴 [testNukeFlow/post]: Comments not nuked properly');

    console.log('✅ testNukeFlow Complete');

}

async function testThreadsFlow() {

    let admin = Wallet.createRandom();

    let messageAdmin = sdk.auth.getSignatureDataV2(
        webUrl,
        admin.address,
        1
    );

    let signedMessageAdmin = await admin.signMessage(messageAdmin);

    const { message: tokenAdmin } = await sdk.auth.authenticateV2(messageAdmin, signedMessageAdmin);

    let alice = Wallet.createRandom();

    let messageAlice = sdk.auth.getSignatureDataV2(
        webUrl,
        admin.address,
        1
    );

    let signedMessageAlice = await admin.signMessage(messageAlice);

    const { message: tokenAlice } = await sdk.auth.authenticateV2(messageAlice, signedMessageAlice);


    const resp = await sdk.threads.create(
        admin.address,
        tokenAdmin,
        threadTitle,
        "Thread Description",
        webUrl,
        true,
        true,
        [],
        [],
        ["hey", "hi"]
    )

    if (resp?.success !== true) console.log('🔴 [testThreadsFlow/create]: Create Thread Failed', resp?.error);
    if (resp?.title !== threadTitle) console.log('🔴 [testThreadsFlow/create]: Thread title invlaid.');
    if (resp?.url !== webUrl) console.log('🔴 [testThreadsFlow/create]: Url invlaid.');

    const threadsQuery = await sdk.threads.query({
        creator: admin.address
    })

    if (threadsQuery.length !== 1) console.log('🔴 [testThreadsFlow/createConfirm]: Create Confirm failed');

    console.log('✅ testThreadsFlow/create Complete');

    const addResp = await sdk.threads.addMembers(
        admin.address,
        tokenAdmin,
        resp._id,
        [alice.address]
    )

    if (addResp?.success !== true) console.log('🔴 [testThreadsFlow/addMembers]: Add member Failed', addResp?.error);

    const afterAddMember = await sdk.threads.query({
        threadId: resp._id
    });


    if (afterAddMember[0].members.includes(alice.address) === false) console.log('🔴 [testThreadsFlow/addMembersCheck]: Add members Confirm failed');

    console.log('✅ testThreadsFlow/addMembers Complete');


    const removeResp = await sdk.threads.removeMembers(
        admin.address,
        tokenAdmin,
        resp._id,
        [alice.address]
    )

    if (removeResp?.success !== true) console.log('🔴 [testThreadsFlow/removeResp]: remove member Failed', removeResp?.error);

    const removeAddMember = await sdk.threads.query({
        threadId: resp._id
    });

    if (removeAddMember[0].members.includes(alice.address) === true) console.log('🔴 [testThreadsFlow/addMembersCheck]: Remove members Confirm failed');

    console.log('✅ testThreadsFlow/removeMembers Complete');


    const deleteThread = await sdk.threads.delete(
        admin.address,
        tokenAdmin,
        resp._id
    )

    if (deleteThread?.success !== true) console.log('✅ [testThreadsFlow/deleteThread]: Delete Thread Done');
    if (deleteThread?.success !== false) console.log('🔴 [testThreadsFlow/deleteThread]: Delete Thread Failed', deleteThread?.error);

    console.log('✅ testThreadsFlow Complete');

}

async function runTests() {
    await testGetInfo();
    await testAuth();
    await testCommentFlow();
    await testThreadsFlow();
    await testNukeFlow();
}


runTests();

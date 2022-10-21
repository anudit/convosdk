import Head from 'next/head'
import Image from 'next/image'
import { Convo } from "@theconvospace/sdk"
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import NextLink from 'next/link';

export default function Home() {

  let ConvoInstance = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();

  return (
    <div className={styles.container}>
      <Head>
        <title>Convo Example</title>
        <meta name="description" content="Convo Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://theconvo.space" target="_blank" rel="noreferrer">Convo Space!</a>
        </h1>

        <p className={styles.description}>
          Get started by opening the console <code className={styles.code}>Ctrl/Cmd+Shift+I</code> on this page.
        </p>

        <p className={styles.description}>
          <ConnectButton />
        </p>

        <div className={styles.grid}>

          <div onClick={() => {
            console.log(ConvoInstance.apikey)
          }} className={styles.card}>
            <h2>Print API Key &rarr;</h2>
            <p>Print the API key used to configure Convo.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.pingNode().then(console.log);
          }} className={styles.card}>
            <h2>Ping Server &rarr;</h2>
            <p>Ping server to check the connection.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.logConfig().then(console.log);
          }} className={styles.card}>
            <h2>Log Config &rarr;</h2>
            <p>Log config for debugging the SDK.</p>
          </div>

        </div>

        <p className={styles.description}>
          Authentication
        </p>

        <div className={styles.grid}>

          <div onClick={async () => {

            let data = ConvoInstance.auth.getSignatureDataV2('https://convosdk-examples-nextjs.vercel.app', address, chain.id);
            signer.signMessage(data).then(async (sig) => {
              const token = await ConvoInstance.auth.authenticateV2(data, sig);
              console.log('token', token);
            });
          }} className={styles.card}>
            <h2>Authenticate &rarr;</h2>
            <p>Get an Authentication Token using the SDK.</p>
          </div>

          <div onClick={() => {

            ConvoInstance.auth.validate(
              address,
              ""
            ).then(console.log);

          }} className={styles.card}>
            <h2>Validate Auth &rarr;</h2>
            <p>Validate an Authentication Token using the SDK.</p>
          </div>

          <div onClick={() => {
            let timestamp = Date.now();
            console.log(ConvoInstance.auth.getSignatureData(address, timestamp));
          }} className={styles.card}>
            <h2>Get Signature Data &rarr;</h2>
            <p>Get the Data used for signing and authentication.</p>
          </div>

          <div onClick={() => {
            console.log(ConvoInstance.auth.getSignatureDataV2(
              'https://convosdk-examples-nextjs.vercel.app',
              address,
              chain.id)
            );
          }} className={styles.card}>
            <h2>Signature Data V2 &rarr;</h2>
            <p>Get the Data used for signing and authentication.</p>
          </div>
        </div>

        <p className={styles.description}>
          Comments
        </p>

        <div className={styles.grid}>

          <div onClick={() => {
            ConvoInstance.comments.query({
              threadId: "KIGZUnR4RzXDFheXoOwo"
            }).then(console.log)
          }} className={styles.card}>
            <h2>Get Comments &rarr;</h2>
            <p>Get Comments using the SDK.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.comments.create(
              address,
              "",
              "New",
              "gLr0RKrdPCjvWTW8C4XKQaCjmn",
              encodeURIComponent('https://theconvo.space/')
            ).then(console.log)
          }} className={styles.card}>
            <h2>Create Comment&rarr;</h2>
            <p>Create a new Comment using the SDK.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.comments.delete(
              address,
              "",
              "01fh3enc55ppnh7g7r4sz9wvp5"
            ).then(console.log)
          }} className={styles.card}>
            <h2>Delete Comments&rarr;</h2>
            <p>Delete a Comment using the SDK.</p>
          </div>

        </div>

        <p className={styles.description}>
          Threads
        </p>

        <div className={styles.grid}>

          <div onClick={() => {
            ConvoInstance.threads.getThreads(["gLr0RKrdPCjvWTW8C4XKQaCjmn"]).then(console.log);
          }} className={styles.card}>
            <h2>Get Threads &rarr;</h2>
            <p>Get Threads using the SDK.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.threads.create(
              address,
              "",
              "This is a new testthread",
              "Test Desc",
              "https://example.anudit.dev",
              true,
              true,
              [address],
              [address],
              [],
              {},
            ).then(console.log)
          }} className={styles.card}>
            <h2>Create Thread&rarr;</h2>
            <p>Create a new Thread using the SDK.</p>
          </div>

        </div>

        <p className={styles.description}>
          Identity
        </p>

        <div className={styles.grid}>

          <div onClick={() => {
            ConvoInstance.omnid.getTrustScore('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045').then(console.log);
          }} className={styles.card}>
            <h2>Get Identity Data&rarr;</h2>
            <p>Get data for an Ethereum address using the SDK.</p>
          </div>

        </div>

        <p className={styles.description}>
          Components
        </p>

        <div className={styles.grid}>

          <NextLink href='/embeds'>
            <div className={styles.card}>
              <h2>Embeds</h2>
              <p>Get data for an Ethereum address using the SDK.</p>
            </div>
          </NextLink>

          <NextLink href='/comment'>
            <div className={styles.card}>
              <h2>Comment</h2>
              <p>A React Component to showcase a single comment.</p>
            </div>
          </NextLink>

          <NextLink href='/commentSection'>
            <div className={styles.card}>
              <h2>Comment Section</h2>
              <p>A React Component for a simple comment section.</p>
            </div>
          </NextLink>


        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://theconvo.space"
          target="_blank"
          rel="noopener noreferrer"
          title="theconvo.space"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="https://theconvo.space/images/v2/logo.png" alt="Convo Logo" width={25} height={16} />
          </span>
          The Convo Space
        </a>
      </footer>
    </div >
  )
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Convo from "@theconvospace/sdk"

export default function Home() {

  let ConvoInstance = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');

  return (
    <div className={styles.container}>
      <Head>
        <title>Convo Example</title>
        <meta name="description" content="Convo Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://theconvo.space" target="_blank">Convo Space!</a>
        </h1>

        <p className={styles.description}>
          Get started by opening the console <code className={styles.code}>Ctrl/Cmd+Shift+I</code> on this page.
        </p>

        <div className={styles.grid}>

          <div onClick={() => {
            console.log(ConvoInstance.getApiKey())
          }} className={styles.card}>
            <h2>Print API Key &rarr;</h2>
            <p>Print the API key used to configure Convo.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.ping().then(console.log);
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

          <div onClick={() => {
            let timestamp = Date.now();
            ConvoInstance.auth.authenticate(
              "0xa28992A6744e36f398DFe1b9407474e1D7A3066b",
              "Sig",
              timestamp,
              "ethereum",
            ).then(console.log);
          }} className={styles.card}>
            <h2>Authenticate &rarr;</h2>
            <p>Get an Authentication Token using the SDK.</p>
          </div>

          <div onClick={() => {
            ConvoInstance.auth.validate("0xa28992A6744e36f398DFe1b9407474e1D7A3066b", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMHhhMjg5OTJBNjc0NGUzNmYzOThERmUxYjk0MDc0NzRlMUQ3QTMwNjZiIiwiY2hhaW4iOiJldGhlcmV1bSIsImlhdCI6MTYzMzExNDQwMywiZXhwIjoxNjMzMjAwODAzfQ.ki5DSchd08ujU4i1zRx2uUgXiSCMaLjfLpZRE9rOtRQ").then(console.log);
          }} className={styles.card}>
            <h2>Validate Auth &rarr;</h2>
            <p>Validate an Authentication Token using the SDK.</p>
          </div>

          <div onClick={() => {
            let timestamp = Date.now();
            console.log(ConvoInstance.auth.getSignatureData("0xa28992A6744e36f398DFe1b9407474e1D7A3066b", timestamp));
          }} className={styles.card}>
            <h2>Get Signature Data &rarr;</h2>
            <p>Get the Data used for signing and authentication.</p>
          </div>

        </div>

        <p className={styles.description}>
          Comments
        </p>

        <div className={styles.grid}>

          <div onClick={() => {

          }} className={styles.card}>
            <h2>Get Comments &rarr;</h2>
            <p>Get Comments using the SDK.</p>
          </div>

          <div onClick={() => {

          }} className={styles.card}>
            <h2>Create Comment&rarr;</h2>
            <p>Create a new Comment using the SDK.</p>
          </div>

          <div onClick={() => {

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

          }} className={styles.card}>
            <h2>Get Threads &rarr;</h2>
            <p>Get Threads using the SDK.</p>
          </div>

          <div onClick={() => {

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
            ConvoInstance.identity.getTrustScore('0xa28992A6744e36f398DFe1b9407474e1D7A3066b').then(console.log);
          }} className={styles.card}>
            <h2>Get Identity Data&rarr;</h2>
            <p>Get data for an Ethereum address using the SDK.</p>
          </div>

        </div>
      </main>



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
    </div>
  )
}

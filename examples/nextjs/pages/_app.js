import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from 'degen'
import 'degen/styles'

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    infuraProvider({ infuraId: "1e7969225b2f4eefb3ae792aabf1cc17" }), publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Convo Space — Example',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode modalSize='compact' >
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp

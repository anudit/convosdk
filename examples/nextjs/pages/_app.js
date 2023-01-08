import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from 'degen'
import 'degen/styles'

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet, polygon, optimism } from 'wagmi/chains'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism],
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
    <ThemeProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} coolMode modalSize='compact' theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default MyApp

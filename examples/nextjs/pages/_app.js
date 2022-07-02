import '../styles/globals.css'
import { ThemeProvider } from 'degen'
import 'degen/styles'

function MyApp({ Component, pageProps }) {
  return (<ThemeProvider>
    <Component {...pageProps} /></ThemeProvider>
  )
}

export default MyApp

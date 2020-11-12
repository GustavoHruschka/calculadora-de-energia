import type { AppProps /*, AppContext */ } from 'next/app'
import './styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500&display=swap" rel="stylesheet" />
    </div>
  )
}

export default MyApp

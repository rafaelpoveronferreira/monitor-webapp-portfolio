import '@/styles/globals.css'
import localFont from '@next/font/local'

const sofiaSans = localFont({ src: './sofia-sans.woff2' })

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <main className={sofiaSans.className}>
        <Component {...pageProps} />
      </main>
    )
}

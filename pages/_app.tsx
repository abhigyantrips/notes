import 'styles/global.css'
import 'react-notion-x/src/styles.css'
import 'styles/notion.css'
import 'styles/prism-theme.css'
import 'katex/dist/katex.min.css'

import * as React from 'react'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

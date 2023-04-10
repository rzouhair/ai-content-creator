import '@/styles/globals.css'
import '@/styles/reset.css'
import '@/styles/normalize.css'
import type { AppProps } from 'next/app'
import { Provider as JotaiProvider } from 'jotai'

export default function App({ Component, pageProps }: AppProps ) {
  const getLayout = (Component as any).getLayout || ((page: any) => page)
  return (
    <JotaiProvider>
      {getLayout(<Component {...pageProps} />)}
    </JotaiProvider>
  )
}

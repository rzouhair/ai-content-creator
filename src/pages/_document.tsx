import { sideBarTheme } from '@/stores/theme'
import { useAtom } from 'jotai'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='h-screen overflow-hidden'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

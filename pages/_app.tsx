import '../styles/globals.css'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'



const activeChainId = ChainId.BinanceSmartChainMainnet;

function MyApp({ Component, pageProps }: AppProps) {
  
  
  
  return    <ThirdwebProvider desiredChainId={activeChainId}>   <Head>
        <title>NFT Gated Website</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Learn how to use the thirdweb Auth SDK to create an NFT Gated Website'
        />
    </Head>  
      <Component {...pageProps} />
    </ThirdwebProvider>
   
  
     
     

}

export default MyApp

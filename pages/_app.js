import { Providers } from "./providers";


export default function App({ Component, pageProps }) {
  return <Providers ><Component {...pageProps} /></Providers>
}

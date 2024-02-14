import type { AppProps } from "next/app";
import GlobalStyles from '../styles/globalStyle'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

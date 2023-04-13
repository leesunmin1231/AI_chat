import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { AppStyle } from '@/styles/AppStyle';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider {...{ theme }}>
      <Global styles={globalStyle} />
      <AppStyle>
        <Component {...pageProps} />
        <div id="modal-root" />
      </AppStyle>
    </ThemeProvider>
  );
}

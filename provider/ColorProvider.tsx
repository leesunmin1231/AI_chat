import { ReactNode } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import globalStyle from '@/styles/global';
import theme from '@/styles/theme';

interface ColorProviderProps {
  children: ReactNode;
}

function ColorProvider({ children }: ColorProviderProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}

export default ColorProvider;

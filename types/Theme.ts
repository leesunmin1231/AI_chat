import '@emotion/react';
import { COLOR } from '@/styles/color';

declare module '@emotion/react' {
  export interface Theme {
    color: typeof COLOR;
  }
}

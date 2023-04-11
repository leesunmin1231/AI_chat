import React from 'react';
import type { Preview } from '@storybook/react';
import ColorProvider from '../provider/ColorProvider';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ColorProvider>
        <Story />
      </ColorProvider>
    ),
  ],
};

export default preview;

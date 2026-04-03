import type { Preview } from '@storybook/react';
import '../../../packages/tokens/dist/tokens.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Global Figma design link (overridden per story)
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/AZgWt0KHVuVeWBAcQ6Jcy4/branch/yxI5H0FhaUg0YR0uhNuqR6',
    },
    // Backgrounds matching CARS24 surfaces
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'surface', value: '#F9FAFB' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
};

export default preview;

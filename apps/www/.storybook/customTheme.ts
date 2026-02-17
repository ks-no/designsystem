import { create } from 'storybook/theming'

export default create({
  brandTitle: 'KS Design System',
  fontBase: '"Inter", sans-serif',
  // Colors
  base: 'light',
  brandUrl: 'https://your-site.com',
  brandImage: '/logo.svg', // Place your logo in public or static folder
  brandTarget: '_self',
  colorPrimary: '#0055a6', // Your primary color
  colorSecondary: '#0062BA',
  barTextColor: '#243142',
  textColor: '#1e2b3c',
  inputTextColor: '#243142',
  appBg: '#e8e8ec',
  appPreviewBg: 'var(--ds-color-neutral-background-default)',
  appContentBg: '#fefefe',
})

import { create } from 'storybook/theming'

export default create({
  brandTitle: 'KS Design System',
  fontBase: '"Inter", sans-serif',
  // Colors
  base: 'light',
  brandUrl: 'https://design.ksdigital.no',
  brandImage: '/logo.svg',
  brandTarget: '_self',
  colorPrimary: '#00042e', // Your primary color
  colorSecondary: '#00042e',
  barTextColor: '#00042e',
  barSelectedColor: '#d9dae0',
  barHoverColor: '#d9dae0',
  textColor: '#00042e',
  inputTextColor: '#00042e',
  appBg: '#e8e8ec',
  appPreviewBg: 'var(--ds-color-neutral-background-default)',
  appContentBg: '#fefefe',
})

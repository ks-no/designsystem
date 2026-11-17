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
  // Token values from the KS Digital theme (light). The manager page doesn't load the
  // theme CSS, and Storybook runs colour functions on these, so no CSS variables here.
  barSelectedColor: '#ddd5fa', // --ds-color-support1-surface-hover
  barHoverColor: '#ddd5fa', // --ds-color-support1-surface-hover
  textColor: '#00042e',
  inputTextColor: '#00042e',
  appBg: '#f5f2fd', // --ds-color-support1-background-tinted (sidebar, same as code blocks)
  appPreviewBg: 'var(--ds-color-neutral-background-default)',
  appContentBg: '#fefefe',
})

# Designsystem Themes

This package provides prebuilt themes for use with Designsystemet at KS Digital. Themes are created using the [Theme Builder from Designsystemet](https://theme.designsystemet.no/)

## Supported Themes

The following themes are officially supported:

- **Ledsagerbevis**
- **Forvaltning**
- **Minkommune**
- **Tilskudd**

Additionally, a base style is provided and should be applied first. We aim to keep this base style as minimal as possible.

## Usage

To use the themes, include the base styles and one of the supported themes in your CSS or JavaScript/TypeScript files as shown below:

### In CSS Files

If your bundler (e.g., Vite) is configured to resolve npm packages in CSS imports:

```css
@import url('@ks-digital/designsystem-themes/base.css');
@import url('@ks-digital/designsystem-themes/ledsagerbevis.css');
```

#### Tailwind

Import [theme].tailwind.css to get Tailwind util-classes for Designsystemet-tokens.

> The `@layer` declaration on the first line controls cascade priority — later layers win.
> The recommended order places `ds` and `ksd` above Tailwind so design system styles take precedence.
> If you need Tailwind utilities to override component styles, move `tw-utilities` after `ksd` —
> but be aware that overriding component internals may break with future releases.

```css
@layer tw-theme, tw-base, tw-utilities, ds, ksd;

@import url('@ks-digital/designsystem-themes/base.css');
@import url('@ks-digital/designsystem-themes/ksdigital.css');

@import 'tailwindcss/theme.css' layer(tw-theme);
@import 'tailwindcss/preflight.css' layer(tw-base);
@import 'tailwindcss/utilities.css' layer(tw-utilities);
@import '@ks-digital/designsystem-themes/ksdigital.tailwind.css' layer(tw-theme);
```

### In JavaScript/TypeScript Files

If you are building a JavaScript/TypeScript application, import the styles like this. If you are using React, please check the readme in the React-package.

```javascript
import '@ks-digital/designsystem-themes/base.css'
import '@ks-digital/designsystem-themes/ledsagerbevis.css'
```

## Adding new themes

1. Add theme to `designsystemet.config.json`. The color names must match the other themes.
2. Create design tokens for theme `pnpm run themes:create-tokens`
3. Apply KS custom token aliases to the generated token sources `pnpm run themes:apply-custom-tokens:tokens`
4. Build themes `pnpm run themes:build`.
   This also applies KS custom token aliases to the generated theme outputs via `themes:apply-custom-tokens:outputs`.
5. Add theme `exports`-field in `packages/themes/package.json`
6. Add theme to Storybook `tools/storybook/themes.ts`
7. Add theme to docs `apps/www/src/Temaer.mdx`

For the full pipeline, you can also run `pnpm run themes:generate`.

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

##### v4

```css
@layer theme, tailwind-base, ds, components, utilities;

@import url('@ks-digital/designsystem-themes/base.css') layer(ds);
@import url('@ks-digital/designsystem-themes/ledsagerbevis.css') layer(ds);

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(tailwind-base);
@import 'tailwindcss/utilities.css' layer(utilities);
@import '@ks-digital/designsystem-themes/ledsagerbevis.tailwind.css' layer(theme);
```

##### v3 and older

> **Note:**  
> Tailwind versions earlier than v4 do **not** support mapping Tailwind utility classes directly to Designsystemet tokens.

```css
@import url('@ks-digital/designsystem-themes/base.css');
@import url('@ks-digital/designsystem-themes/ledsagerbevis.css');

@layer tailwind-base, ds;

@layer tailwind-base {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
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
3. Build themes `pnpm run themes:build`
4. Add theme `exports`-field in `packages/themes/package.json`
5. Add theme to Storybook `tools/storybook/themes.ts`
6. Add theme to docs `apps/www/src/Temaer.mdx`

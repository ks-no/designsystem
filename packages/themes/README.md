# Designsystem Themes

This package provides prebuilt themes for use with Designsystemet at KS Digital. Themes are created using the [Theme Builder from Designsystemet](https://theme.designsystemet.no/)

## Supported Themes

The following themes are officially supported:

- **Ledsagerbevis**
- **Forvaltning**

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

If you are using Tailwind with [Preflight](https://tailwindcss.com/docs/preflight), ensure that you load the Designsystemet styles first by importing `base.tailwind.css` instead of `base.css`. The `base.tailwind.css` file includes all of `base.css` along with some overrides to ensure smooth integration between Designsystemet and Tailwind.

The [theme].tailwind.css bridges the gap between Designsystemet and Tailwind, by mapping Tailwind-classes to the Designsystem-tokens! So import that as well.

##### v4

```css
@import url('@ks-digital/designsystem-themes/base.tailwind.css');
@import url('@ks-digital/designsystem-themes/ledsagerbevis.css');
@import url('@ks-digital/designsystem-themes/ledsagerbevis.tailwind.css');
@import url('tailwindcss');
```

##### v3 and older

```css
@import url('@ks-digital/designsystem-themes/base.tailwind.css');
@import url('@ks-digital/designsystem-themes/ledsagerbevis.css');

@layer tailwind-base, ds;

@layer tailwind-base {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
```

### In JavaScript/TypeScript Files

If you are using a JavaScript or TypeScript application, import the styles like this. If you are using React, please check the readme in the React-package as well.

```javascript
import '@ks-digital/designsystem-themes/base.css'
import '@ks-digital/designsystem-themes/ledsagerbevis.css'
```

## Adding new themes

1. Add builded theme into `packages/themes/src/themes`
2. Add theme `exports`-field in package.json
3. Add theme to Angular Storybook `packages/angular/.storybook/themes.ts`

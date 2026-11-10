# Designsystem Themes

This package provides prebuilt themes for use with Designsystemet at KS Digital. Themes are created using the [Theme Builder from Designsystemet](https://theme.designsystemet.no/)

## Supported Themes

The following themes are officially supported:

- **Ledsagerbevis**
- **Forvaltning**
- **Minkommune**
- **Tilskudd**
- **KS Digital v2** (`ksdigital-v2`)

### Support colors as section backgrounds

In `ksdigital-v2` the support colors are meant for backgrounds on sections of a page.
Use the `background-*` tokens for that — per Designsystemet, `surface-*` is for elements
that sit _on top of_ the background colors.

```html
<section data-color="support3" style="background: var(--ds-color-background-tinted)">
  <div class="ds-card">A card, surface-default</div>
</section>
```

### Buttons in support colors

The support colors are light surface colors, so their own color is usually too pale to
work as a button fill. `ksdigital-v2` therefore points the `base-*` tokens at the accent
color for support1–4, which gives every colored section the same primary-action color.

The `base-*` tokens also drive checkbox and radio fills, chips, badges, pagination and
toggle groups, so the choice applies to those too.

### `support2-alternativ` — the brand green as a dark section

`support2-alternativ` uses `#07604F` as the actual surface, with white text and white
buttons. It is defined on the **dark** color scheme, so use it together with
`data-color-scheme="dark"`:

```html
<section data-color="support2-alternativ" data-color-scheme="dark">
  <h2 class="ds-heading">Overskrift</h2>
  <button class="ds-button">Primær</button>
</section>
```

The `data-color-scheme` attribute is what makes this work without any custom CSS.
Designsystemet paints body text from `--ds-color-neutral-text-default` and the focus ring
from `--ds-color-focus-outer`; neither follows `data-color`, but both do follow
`data-color-scheme`. Switching the section to the dark scheme flips them to light
automatically. A plain `data-color` on its own would render dark text on the dark green.

Without `data-color-scheme="dark"` the color falls back to its light scale, which is the
same pale green as `support2` but with a green button instead of an accent one.

Known limitation: `#07604F` is lighter than a normal dark-mode surface, so components that
read `--ds-color-neutral-text-subtle` — unselected tabs and field affixes — land at about
3.2:1 instead of 4.5:1. Headings, body text, labels, buttons, cards, borders and the focus
ring all pass.

Additionally, a base style is provided and should be applied first. We aim to keep this base style as minimal as possible.

## Usage

### Inter font

All themes use the Inter font, which must be loaded by your application. Add it to your `index.html`:

```html
<link rel="stylesheet" href="https://static.fiks.ks.no/fonts/inter/4.1/inter.css" integrity="sha384-OcHzc/By/OPw9uJREawUCjP2inbOGKtKb4A/I2iXxmknUfog2H8Adx71tWVZRscD" crossorigin="anonymous" />
```

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
> If you need Tailwind utilities to override component styles, move `utilities` after `ksd` —
> but be aware that overriding component internals may break with future releases.

```css
@layer theme, base, utilities, ds, ksd;

@import url('@ks-digital/designsystem-themes/base.css');
@import url('@ks-digital/designsystem-themes/ksdigital.css');

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css' layer(utilities);
@import '@ks-digital/designsystem-themes/ksdigital.tailwind.css' layer(theme);
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

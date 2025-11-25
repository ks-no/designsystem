# KS Digital Designsystem for Angular

> ⚠ This library is currently experimental. However, we actively use and test it in internal applications, and we strive to keep it stable at all times.

This library provides Angular components for KS Digital, designed to align closely with the components from [Designsystemet.no](https://www.designsystemet.no/komponenter).

## Installation

Install the required packages using your preferred package manager:

```bash
pnpm add @ks-digital/designsystem-angular @ks-digital/designsystem-themes
```

## Setup

### 1. Include the Inter Font

Add the Inter font to your `index.html`. This API supports the same parameters as the Google Fonts API, allowing you to customize the font weights as needed:

```html
<link href="https://static.fiks.ks.no/googlefonts/googleapis/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### 2. Import Base Styles and Themes

Import the base styles and the theme you want to use in your application:

```css
@import url('@ks-digital/designsystem-themes/base.css');
@import url('@ks-digital/designsystem-themes/forvaltning.css');
```

### 3. Use Components

```ts
import { Button } from '@ks-digital/designsystem-angular'

@Component({
  imports: [Button],
  template: `
  <button ksd-button>
    Click me
  </button>
  `,
})
```

## Example

A complete example setup is available in the `angular-demo` located under the `apps` folder.

## Development

`pnpm nx run @ks-digital/designsystem-angular:storybook`

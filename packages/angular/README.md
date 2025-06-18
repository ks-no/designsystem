# 🚧 KS Digital Designsystem for Angular

> This is an experimental POC as for now

This library provides Angular components for KS Digital, designed to align closely with the components from [Designsystemet.no](https://www.designsystemet.no/komponenter).

## Installation (WIP)

Install the required packages using your preferred package manager:

```bash
pnpm add @ks-digital/designsystem-angular @ks-digital/designsystem-themes
```

## Setup

### 1. Include the Inter Font

Add the Inter font to your `index.html`. This API supports the same parameters as the Google Fonts API, allowing you to customize the font weights as needed:

```html
<link
  href="https://static.fiks.ks.no/googlefonts/googleapis/css2?family=Inter&display=swap"
  rel="stylesheet"
/>
```

### 2. Import Base Styles and Themes

Import the base styles and the theme you want to use in your application:

```javascript
import '@ks-digital/designsystem-themes/base.css'
import '@ks-digital/designsystem-themes/ledsagerbevis.css'
```

### 3. Use Components

To be written.

## Example

A complete example setup is available in the `angular-demo` located under the `apps` folder.

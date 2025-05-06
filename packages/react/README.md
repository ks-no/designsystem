# KS Digital Designsystem for React

This library provides React components for KS Digital, designed to align closely with the components from [Designsystemet.no](https://www.designsystemet.no/komponenter).

## Installation (WIP)

Install the required packages using your preferred package manager:

```bash
pnpm add @ks-no/designsystem-react @ks-no/designsystem-themes
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
import '@ks-no/designsystem-themes/base.css'
import '@ks-no/designsystem-themes/ledsagerbevis.css'
```

### 3. Use Components

Import and use the components you need. You can explore the available components at [Designsystemet.no](https://www.designsystemet.no/komponenter):

```javascript
import { Button } from '@ks-no/designsystem-react'

function MyComponent() {
  return <Button data-size="lg">My Button</Button>
}
```

## Example

A complete example setup is available in the `react-demo-app` located under the `apps` folder.

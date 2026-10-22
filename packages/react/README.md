# KS Digital Designsystem for React

This library provides React components for KS Digital, designed to align closely with the components from [Designsystemet.no](https://www.designsystemet.no/komponenter).

## Installation (WIP)

Install the required packages using your preferred package manager:

```bash
pnpm add @ks-digital/designsystem-react @ks-digital/designsystem-themes
```

## Setup

### 1. Include the Inter Font

Add the Inter font to your `index.html`:

```html
<link rel="stylesheet" href="https://static.fiks.ks.no/fonts/inter/4.1/inter.css" integrity="sha384-OcHzc/By/OPw9uJREawUCjP2inbOGKtKb4A/I2iXxmknUfog2H8Adx71tWVZRscD" crossorigin="anonymous" />
```

### 2. Import Base Styles and Themes

Import the base styles and the theme you want to use in your application:

```javascript
import '@ks-digital/designsystem-themes/base.css'
import '@ks-digital/designsystem-themes/ledsagerbevis.css'
```

### 3. Use Components

Import and use the components you need. You can explore the available components at [Designsystemet.no](https://www.designsystemet.no/komponenter):

```javascript
import { Button } from '@ks-digital/designsystem-react'

function MyComponent() {
  return <Button data-size="lg">My Button</Button>
}
```

## Example

A complete example setup is available in the `react-demo` located under the `apps` folder.

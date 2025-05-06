import '@ks-no/designsystem-themes/base.css'
import '@ks-no/designsystem-themes/ledsagerbevis.css'

import { Alert, Button, Spinner, Heading } from '@ks-no/designsystem-react'

export function App() {
  return (
    <div>
      <Heading level={1} data-size="lg">
        Hi from Designsystemet
      </Heading>
      <Button variant="primary" data-size="lg">
        Click me!
      </Button>
      <Spinner data-size="lg" />
      <Alert data-color="info">En beskjed det er viktig at brukeren ser</Alert>
    </div>
  )
}

export default App

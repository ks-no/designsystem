import '@ks-no/designsystem-themes/base.css'
import '@ks-no/designsystem-themes/ledsagerbevis.css'

import { Alert, Button, Spinner } from '@ks-no/designsystem-react'

export function App() {
  return (
    <div>
      Hi
      <Button variant="primary" data-size="lg">
        Hio
      </Button>
      <Spinner data-size="lg" />
      <Alert data-color="info">En beskjed det er viktig at brukeren ser</Alert>
    </div>
  )
}

export default App

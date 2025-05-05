import { Alert, Button } from '@ks-no/designsystem-react'

export function App() {
  return (
    <div>
      Hi
      <Button variant="primary" data-size="lg">
        Hio
      </Button>
      <Alert data-color="info">En beskjed det er viktig at brukeren ser</Alert>
    </div>
  )
}

export default App

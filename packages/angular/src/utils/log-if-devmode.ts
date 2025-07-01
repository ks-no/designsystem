import { isDevMode } from '@angular/core'

export const logIfDevMode = ({
  component,
  message,
}: {
  component: string
  message: string
}) => {
  if (isDevMode()) {
    console.log(`[${component}] ${message}`)
  }
}

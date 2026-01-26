export {
  CommonInputs,
  HostColor,
  HostSeverityColors,
  HostSize,
} from './host-directives'
export { logIfDevMode } from './log-if-devmode'
export { randomId } from './random-id'

/**
 * Re-exported for backwards compatibility
 * Remove in future release
 */
export type {
  ColorDefinitions as Color,
  SeverityColorDefinitions as SeverityColors,
  Size,
} from '@ks-digital/designsystem-themes/types'

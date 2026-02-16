import '@analogjs/vitest-angular/setup-zone'

import { getTestBed } from '@angular/core/testing'
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing'

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting())

// Mock CSS.supports for jsdom
if (typeof CSS === 'undefined') {
  ;(globalThis as any).CSS = {
    supports: () => false,
  }
} else if (!CSS.supports) {
  CSS.supports = () => false
}

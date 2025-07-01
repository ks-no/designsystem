import '@analogjs/vitest-angular/setup-zone'

import { getTestBed } from '@angular/core/testing'
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing'

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting())

// Need jest-dom for matchers like expect.toHaveAttribute
import '@testing-library/jest-dom'

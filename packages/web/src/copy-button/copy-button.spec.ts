import { fixture, html, expect as openWcExpect } from '@open-wc/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import './copy-button'
import type { KsdCopyButton } from './copy-button'

const ignoredRules = ['button-name']

describe('<ksd-copy-button>', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('passes accessibility checks', async () => {
    const element = await fixture<KsdCopyButton>(
      html`<ksd-copy-button value="something"></ksd-copy-button>`,
    )

    await openWcExpect(element).to.be.accessible({ ignoredRules })
  })

  it('copies value to clipboard on click', async () => {
    const element = await fixture<KsdCopyButton>(
      html`<ksd-copy-button value="Text to copy!"></ksd-copy-button>`,
    )

    element.click()
    await element.updateComplete

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy!')
    expect(element.getAttribute('data-tooltip')).toBe('Kopiert')
  })

  it('shows error feedback when copy fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockRejectedValue(new Error('Copy failed')),
      },
    })

    const element = await fixture<KsdCopyButton>(
      html`<ksd-copy-button
        value="Text to copy!"
        error-label="Custom error"
      ></ksd-copy-button>`,
    )

    const errorSpy = vi.fn()
    element.addEventListener('ksd-error', errorSpy)

    element.click()
    await element.updateComplete

    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(element.getAttribute('data-tooltip')).toBe('Custom error')
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { KsdCopyButton } from './copy-button'

describe('ksd-copy-button', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('copies value to clipboard on click', async () => {
    const element = document.createElement('ksd-copy-button') as KsdCopyButton
    element.value = 'Text to copy!'
    document.body.append(element)

    await element.updateComplete

    const button = element.shadowRoot?.querySelector('button')
    expect(button).not.toBeNull()

    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await Promise.resolve()

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy!')
  })
})

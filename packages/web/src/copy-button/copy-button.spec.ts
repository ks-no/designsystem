import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import './copy-button'

// MutationObserver records are delivered at the end of the microtask checkpoint
const tick = () => new Promise((resolve) => setTimeout(resolve, 0))

const mount = async (html: string) => {
  document.body.innerHTML = html
  await tick()
  return document.body.querySelector('button') as HTMLButtonElement
}

const mockClipboard = (writeText: () => Promise<void>) =>
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn(writeText) },
  })

describe('[data-copy]', () => {
  beforeEach(() => mockClipboard(() => Promise.resolve()))

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('passes accessibility checks', async () => {
    const button = await mount(
      '<button class="ds-button" data-copy="something">Kopier</button>',
    )

    expect(await axe(button)).toHaveNoViolations()
  })

  it('labels the button and injects an icon', async () => {
    const button = await mount('<button data-copy="something"></button>')

    expect(button).toHaveAttribute('data-copy-state', 'rest')
    expect(button).toHaveAttribute('data-tooltip', 'Kopier')
    expect(button.querySelector('[data-copy-icon]')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })

  it('copies the value and reports success', async () => {
    const button = await mount('<button data-copy="Text to copy!"></button>')
    const copySpy = vi.fn()
    button.addEventListener('ksd-copy', copySpy)

    button.click()
    await tick()

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy!')
    expect(button).toHaveAttribute('data-copy-state', 'success')
    expect(button).toHaveAttribute('data-tooltip', 'Kopiert')
    expect(copySpy.mock.calls[0][0].detail).toEqual({ value: 'Text to copy!' })
  })

  it('reports failure when the clipboard rejects', async () => {
    mockClipboard(() => Promise.reject(new Error('Copy failed')))

    const button = await mount(
      '<button data-copy="Text to copy!" data-error-label="Custom error"></button>',
    )
    const errorSpy = vi.fn()
    button.addEventListener('ksd-copy-error', errorSpy)

    button.click()
    await tick()

    expect(button).toHaveAttribute('data-copy-state', 'error')
    expect(button).toHaveAttribute('data-tooltip', 'Custom error')
    expect(errorSpy).toHaveBeenCalledTimes(1)
  })

  it('returns to rest after the reset delay', async () => {
    vi.useFakeTimers()
    try {
      document.body.innerHTML = '<button data-copy="something"></button>'
      const button = document.body.querySelector('button') as HTMLButtonElement
      await vi.advanceTimersByTimeAsync(0)

      button.click()
      await vi.advanceTimersByTimeAsync(0)
      expect(button).toHaveAttribute('data-copy-state', 'success')

      await vi.advanceTimersByTimeAsync(2000)
      expect(button).toHaveAttribute('data-copy-state', 'rest')
      expect(button).toHaveAttribute('data-tooltip', 'Kopier')
    } finally {
      vi.useRealTimers()
    }
  })

  it('ignores clicks while aria-disabled', async () => {
    const button = await mount(
      '<button data-copy="something" aria-disabled="true"></button>',
    )

    button.click()
    await tick()

    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
    expect(button).toHaveAttribute('data-copy-state', 'rest')
  })

  it('picks up buttons added after load', async () => {
    await mount('<button data-copy="first"></button>')

    const added = document.createElement('button')
    added.setAttribute('data-copy', 'second')
    document.body.append(added)
    await tick()

    expect(added).toHaveAttribute('data-tooltip', 'Kopier')
  })
})

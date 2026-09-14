import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import './copy-button'
import { initCopyButtons } from './copy-button'

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

  it('gives an icon-only button an accessible name', async () => {
    const button = await mount(
      '<button class="ds-button" data-icon data-copy="something"></button>',
    )

    expect(button).toHaveAttribute('aria-label', 'Kopier')
    expect(await axe(button)).toHaveNoViolations()
  })

  it('describes rather than relabels a button that has text', async () => {
    const button = await mount(
      '<button data-copy="something" data-copy-label="Kopier saksnummer">Kopier</button>',
    )

    expect(button).not.toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('aria-description', 'Kopier saksnummer')
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

  it('returns to rest on blur', async () => {
    const button = await mount('<button data-copy="something"></button>')
    button.focus()

    button.click()
    await tick()
    expect(button).toHaveAttribute('data-copy-state', 'success')

    button.blur()
    await tick()
    expect(button).toHaveAttribute('data-copy-state', 'rest')
    expect(button).toHaveAttribute('data-tooltip', 'Kopier')
  })

  it('stays in success while the button keeps focus', async () => {
    vi.useFakeTimers()
    try {
      document.body.innerHTML = '<button data-copy="something"></button>'
      const button = document.body.querySelector('button') as HTMLButtonElement
      await vi.advanceTimersByTimeAsync(0)

      button.click()
      await vi.advanceTimersByTimeAsync(5000)

      expect(button).toHaveAttribute('data-copy-state', 'success')
    } finally {
      vi.useRealTimers()
    }
  })

  it('focuses the button so blur can reset it', async () => {
    const button = await mount('<button data-copy="something"></button>')

    // click() does not move focus, standing in for Safari
    button.click()
    await tick()

    expect(document.activeElement).toBe(button)

    button.blur()
    await tick()
    expect(button).toHaveAttribute('data-copy-state', 'rest')
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

  it('falls back to rest for an unrecognised state', async () => {
    const button = await mount(
      '<button data-copy="something" data-copy-state="foo"></button>',
    )

    expect(button).toHaveAttribute('data-copy-state', 'rest')
    expect(button).toHaveAttribute('data-tooltip', 'Kopier')
    expect(button.querySelector('[data-copy-icon]')?.innerHTML).toContain(
      '<svg',
    )
  })

  it('does not touch the DOM when initCopyButtons gets a null scope', () => {
    expect(() => initCopyButtons(null)).not.toThrow()
  })

  it('emits only for the newest click when clicks overlap', async () => {
    const resolvers: Array<() => void> = []
    mockClipboard(() => new Promise<void>((r) => resolvers.push(r)))

    const button = await mount('<button data-copy="something"></button>')
    const copySpy = vi.fn()
    button.addEventListener('ksd-copy', copySpy)

    button.click()
    button.click()

    // The first copy is stale by the time it settles, so it must not report a result
    resolvers[0]()
    resolvers[1]()
    await tick()

    expect(copySpy).toHaveBeenCalledTimes(1)
    expect(button).toHaveAttribute('data-copy-state', 'success')
  })

  it('does not let a stale success overwrite a newer failure', async () => {
    const resolvers: Array<{
      resolve: () => void
      reject: (e: Error) => void
    }> = []
    mockClipboard(
      () =>
        new Promise<void>((resolve, reject) =>
          resolvers.push({ resolve, reject }),
        ),
    )

    const button = await mount('<button data-copy="something"></button>')

    button.click()
    button.click()

    // Newest attempt fails first, then the older one succeeds late
    resolvers[1].reject(new Error('Copy failed'))
    await tick()
    resolvers[0].resolve()
    await tick()

    expect(button).toHaveAttribute('data-copy-state', 'error')
  })

  it('refuses a non-button, which could not be keyboard-operable', async () => {
    document.body.innerHTML = '<div data-copy="something"></div>'
    await tick()
    const el = document.body.querySelector('div') as HTMLDivElement

    expect(el).not.toHaveAttribute('data-copy-state')
    expect(el.querySelector('[data-copy-icon]')).toBeNull()

    el.click()
    await tick()
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
  })

  it('does not enhance an element that only has a label attribute', async () => {
    await mount('<button data-copy="first"></button>')

    const other = document.createElement('span')
    document.body.append(other)
    await tick()
    other.setAttribute('data-copy-label', 'Kopier')
    await tick()

    expect(other).not.toHaveAttribute('data-copy-state')
    expect(other.querySelector('[data-copy-icon]')).toBeNull()
  })

  it('refuses a scope from another document', () => {
    const foreign = document.implementation.createHTMLDocument()
    foreign.body.innerHTML = '<button data-copy="something"></button>'

    initCopyButtons(foreign)

    const button = foreign.querySelector('button') as HTMLButtonElement
    // Plain DOM assertion: jest-dom matchers reject elements from another document
    expect(button.hasAttribute('data-copy-state')).toBe(false)
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import './dismiss'

const BANNER = `
  <div class="ksd-system-banner" id="driftsmelding">
    <div class="ksd-system-banner__content">
      <p class="ds-paragraph ksd-system-banner__text">Systemet er nede</p>
      <button class="ds-button ksd-system-banner__close" type="button" data-ksd-dismiss="driftsmelding" aria-label="Lukk melding"></button>
    </div>
  </div>`

const mount = (html: string) => {
  document.body.innerHTML = html
  return {
    target: document.getElementById('driftsmelding') as HTMLElement,
    trigger: document.querySelector('[data-ksd-dismiss]') as HTMLButtonElement,
  }
}

describe('[data-ksd-dismiss]', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('hides the referenced element', () => {
    const { target, trigger } = mount(BANNER)

    trigger.click()

    expect(target.hidden).toBe(true)
  })

  it('emits a cancelable ksd-dismiss naming the trigger', () => {
    const { target, trigger } = mount(BANNER)
    const listener = vi.fn()
    target.addEventListener('ksd-dismiss', listener)

    trigger.click()

    const event = listener.mock.calls[0][0] as CustomEvent
    expect(event.cancelable).toBe(true)
    expect(event.bubbles).toBe(true)
    expect(event.detail.trigger).toBe(trigger)
  })

  it('leaves the element visible when the event is cancelled', () => {
    const { target, trigger } = mount(BANNER)
    target.addEventListener('ksd-dismiss', (event) => event.preventDefault())

    trigger.click()

    expect(target.hidden).toBe(false)
  })

  it('moves focus off the subtree it hides', () => {
    const { target, trigger } = mount(BANNER)
    trigger.focus()

    trigger.click()

    expect(target.contains(document.activeElement)).toBe(false)
    expect(document.activeElement).toBe(document.body)
  })

  it('releases the temporary tabindex once focus leaves', () => {
    const { trigger } = mount(`${BANNER}<button id="etter">Etter</button>`)
    trigger.focus()

    trigger.click()
    expect(document.body.getAttribute('tabindex')).toBe('-1')

    document.getElementById('etter')?.focus()
    expect(document.body.hasAttribute('tabindex')).toBe(false)
  })

  it('honours data-ksd-dismiss-focus', () => {
    const { trigger } = mount(`${BANNER}<button id="etter">Etter</button>`)
    trigger.setAttribute('data-ksd-dismiss-focus', 'etter')
    trigger.focus()

    trigger.click()

    expect(document.activeElement).toBe(document.getElementById('etter'))
  })

  it('leaves focus alone when it is outside the dismissed element', () => {
    const { trigger } = mount(`${BANNER}<button id="annet">Annet</button>`)
    const other = document.getElementById('annet') as HTMLButtonElement
    other.focus()

    trigger.click()

    expect(document.activeElement).toBe(other)
  })

  it('warns and does nothing when the id does not resolve', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const { target, trigger } = mount(BANNER)
    trigger.setAttribute('data-ksd-dismiss', 'finnes-ikke')

    trigger.click()

    expect(target.hidden).toBe(false)
    expect(log).toHaveBeenCalledOnce()
  })

  it('ignores clicks outside a trigger', () => {
    const { target } = mount(BANNER)

    target
      .querySelector('p')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(target.hidden).toBe(false)
  })
})

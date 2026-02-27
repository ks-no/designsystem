import { SignalWatcher, signal } from '@lit-labs/signals'
import { LitElement, css, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type CopyEventDetail = {
  value: string
}

type CopyErrorEventDetail = {
  value: string
  error: unknown
}

@customElement('ksd-copy-button')
export class KsdCopyButton extends SignalWatcher(LitElement) {
  static override styles = css`
    :host {
      display: inline-block;
      font-size: inherit;
      color: inherit;
    }

    svg {
      width: 1em;
      height: 1em;
      display: block;
    }
  `

  copyIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="168 168 216 168 216 40 88 40 88 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><rect x="40" y="88" width="128" height="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`
  successIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="40 144 96 200 224 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`

  @property({ type: String, reflect: true })
  value = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: String, attribute: 'copy-label' })
  copyLabel = 'Kopier'

  @property({ type: String, attribute: 'copied-label' })
  copiedLabel = 'Kopiert'

  private readonly copied = signal(false)

  private readonly resetCopyStateTimeoutDuration = 2000

  private resetCopyStateTimeout?: number

  private activate(): void {
    if (this.disabled) return
    void this.handleCopy()
  }

  private readonly onHostClick = (): void => {
    this.activate()
  }

  private readonly onHostKeyDown = (event: KeyboardEvent): void => {
    const isActivationKey = event.key === 'Enter' || event.key === ' '
    if (isActivationKey) {
      event.preventDefault()
      this.activate()
    }
  }

  private syncTooltip(): void {
    const label = this.copied.get() ? this.copiedLabel : this.copyLabel
    this.setAttribute('data-tooltip', label)
  }

  private syncHostAccessibility(): void {
    this.setAttribute('role', 'button')
    this.setAttribute('aria-disabled', String(this.disabled))
    this.tabIndex = this.disabled ? -1 : 0
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.onHostClick)
    this.removeEventListener('keydown', this.onHostKeyDown)
    super.disconnectedCallback()
    if (this.resetCopyStateTimeout) {
      window.clearTimeout(this.resetCopyStateTimeout)
    }
  }

  private emitCopied(value: string): void {
    this.dispatchEvent(
      new CustomEvent<CopyEventDetail>('ksd-copy', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private emitError(value: string, error: unknown): void {
    this.dispatchEvent(
      new CustomEvent<CopyErrorEventDetail>('ksd-error', {
        detail: { value, error },
        bubbles: true,
        composed: true,
      }),
    )
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.onHostClick)
    this.addEventListener('keydown', this.onHostKeyDown)
    this.syncTooltip()
    this.syncHostAccessibility()
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('copyLabel') || changed.has('copiedLabel')) {
      this.syncTooltip()
      this.syncHostAccessibility()
    }

    if (changed.has('disabled')) {
      this.syncHostAccessibility()
    }
  }

  private async handleCopy(): Promise<void> {
    if (this.disabled) return

    try {
      await navigator.clipboard.writeText(this.value)
      this.copied.set(true)
      this.emitCopied(this.value)
      this.syncTooltip()
      this.syncHostAccessibility()

      if (this.resetCopyStateTimeout) {
        window.clearTimeout(this.resetCopyStateTimeout)
      }

      this.resetCopyStateTimeout = window.setTimeout(() => {
        this.copied.set(false)
        this.syncTooltip()
        this.syncHostAccessibility()
      }, this.resetCopyStateTimeoutDuration)
    } catch (error: unknown) {
      this.emitError(this.value, error)
    }
  }

  override render() {
    return html` ${this.copied.get() ? this.successIcon : this.copyIcon} `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ksd-copy-button': KsdCopyButton
  }
}

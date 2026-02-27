import '@digdir/designsystemet-web'
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

type CopyStatus = 'rest' | 'success' | 'error'

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
  errorIcon = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="96" y1="96" x2="160" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>`

  @property({ type: String, reflect: true })
  value = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: String, attribute: 'copy-label' })
  copyLabel = 'Kopier'

  @property({ type: String, attribute: 'copied-label' })
  copiedLabel = 'Kopiert'

  @property({ type: String, attribute: 'error-label' })
  errorLabel = 'Kopiering feilet'

  private readonly status = signal<CopyStatus>('rest')

  private readonly isCopying = signal(false)

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
    const currentStatus = this.status.get()
    const label =
      currentStatus === 'success'
        ? this.copiedLabel
        : currentStatus === 'error'
          ? this.errorLabel
          : this.copyLabel
    this.setAttribute('data-tooltip', label)
  }

  private syncHostAccessibility(): void {
    const currentStatus = this.status.get()
    const label =
      currentStatus === 'success'
        ? this.copiedLabel
        : currentStatus === 'error'
          ? this.errorLabel
          : this.copyLabel

    this.setAttribute('role', 'button')
    this.setAttribute('aria-label', label)
    this.setAttribute('aria-disabled', String(this.disabled))
    this.tabIndex = this.disabled ? -1 : 0
  }

  private scheduleResetToRest(): void {
    if (this.resetCopyStateTimeout) {
      window.clearTimeout(this.resetCopyStateTimeout)
    }

    this.resetCopyStateTimeout = window.setTimeout(() => {
      this.status.set('rest')
      this.isCopying.set(false)
      this.syncTooltip()
      this.syncHostAccessibility()
    }, this.resetCopyStateTimeoutDuration)
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
    if (this.disabled || this.isCopying.get()) return

    if (this.resetCopyStateTimeout) {
      window.clearTimeout(this.resetCopyStateTimeout)
    }

    this.isCopying.set(true)

    try {
      await navigator.clipboard.writeText(this.value)
      this.status.set('success')
      this.emitCopied(this.value)
      this.syncTooltip()
      this.syncHostAccessibility()
      this.scheduleResetToRest()
    } catch (error: unknown) {
      this.status.set('error')
      this.emitError(this.value, error)
      this.syncTooltip()
      this.syncHostAccessibility()
      this.scheduleResetToRest()
    }
  }

  override render() {
    const status = this.status.get()

    if (status === 'success') {
      return html` ${this.successIcon} `
    }

    if (status === 'error') {
      return html` ${this.errorIcon} `
    }

    return html` ${this.copyIcon} `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ksd-copy-button': KsdCopyButton
  }
}

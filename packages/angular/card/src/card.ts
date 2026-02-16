import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import {
  HostColor,
  HostSize,
  randomId,
} from '@ks-digital/designsystem-angular/__internals'

const ATTR_CLICKDELEGATE = 'data-clickdelegatefor'
const SELECTOR_LINK = ':is(h1,h2,h3,h4,h5,h6) a'
const SELECTOR_SKIP =
  'a,button,label,details,dialog,[role="button"],[popover],[contenteditable]'

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ksd-card]',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostColor,
      inputs: ['data-color'],
    },
  ],
  host: {
    class: 'ds-card',
    '[attr.data-variant]': 'variant()',
  },
})
export class Card {
  /**
   * Change the background color of the card
   * @default 'default'
   */
  public variant = input<'tinted' | 'default'>('default')
  private el = inject<ElementRef<HTMLElement>>(ElementRef)
  private destroyRef = inject(DestroyRef)
  private generatedId = `ksd-card-link-${randomId()}`
  private originalId: string | null = null

  constructor() {
    afterNextRender(() => {
      const card = this.el.nativeElement
      const link = card.querySelector<HTMLAnchorElement>(SELECTOR_LINK)
      const skip = !link || link.parentElement?.closest(SELECTOR_SKIP)

      if (card.hasAttribute(ATTR_CLICKDELEGATE) || skip) return

      this.originalId = link.id || null
      link.id = link.id || this.generatedId
      card.setAttribute(ATTR_CLICKDELEGATE, link.id)

      this.destroyRef.onDestroy(() => {
        if (this.originalId) {
          link.id = this.originalId
        } else {
          link.removeAttribute('id')
        }
        card.removeAttribute(ATTR_CLICKDELEGATE)
      })
    })
  }
}

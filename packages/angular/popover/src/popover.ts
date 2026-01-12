import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core'
import {
  autoUpdate,
  computePosition,
  flip,
  MiddlewareState,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-popover',
  hostDirectives: [
    {
      directive: HostSize,
      inputs: ['data-size'],
    },
    {
      directive: HostSeverityColors,
      inputs: ['data-color'],
    },
  ],
  template: `
    <div
      #myPopover
      popover="manual"
      class="ds-popover"
      data-testid="popover"
      [id]="popoverId()"
      [attr.data-variant]="variant()"
    >
      @if (controlledOpen()) {
        <ng-content />
      }
    </div>
  `,
})
export class Popover {
  // use popoverId instead of id since id will be put on the angular element and not the popover-div
  readonly popoverId = input.required<string>()
  readonly placement = input<Placement>('top')
  readonly autoPlacement = input(true, { transform: booleanAttribute })

  // for controlled component
  readonly open = input(undefined, { transform: booleanAttribute })
  /*
  the naming here is different from Designsystemet
  since we need to use outputs for onOpen and onClose
  */
  readonly triggeredClose = output()
  readonly triggeredOpen = output()

  protected readonly internalOpen = signal(false)
  protected readonly controlledOpen = computed(
    () => this.open() ?? this.internalOpen(),
  )

  readonly variant = input<'tinted' | 'default'>('default')

  private popoverRef = viewChild<ElementRef>('myPopover')

  // enable controlled component
  controlledComponent = effect((onCleanup) => {
    const popover = this.popoverRef()?.nativeElement
    const handleClick = (event: MouseEvent) => {
      const el = event.target as Element | null
      const isTrigger = el?.closest?.(`[popovertarget="${this.popoverId()}"]`)
      const isOutside = !isTrigger && !popover?.contains(el as Node)

      if (isTrigger) {
        event.preventDefault() // Prevent native Popover API
        this.internalOpen.update((open) => !open)
        this.triggeredOpen.emit()
      }
      if (isOutside) {
        this.internalOpen.set(false)
        this.triggeredClose.emit()
      }
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !this.controlledOpen()) return
      event.preventDefault() // Prevent closing fullscreen in Safari
      this.internalOpen.set(false)
      this.triggeredClose.emit()
    }

    popover?.togglePopover?.(this.controlledOpen())
    document.addEventListener('click', handleClick, true) // Use capture to execute before React event API
    document.addEventListener('keydown', handleKeydown)

    onCleanup(() => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKeydown)
    })
  }, {})

  positionPopover = effect(() => {
    const popover = this.popoverRef()?.nativeElement

    const trigger = document.querySelector(
      `[popovertarget="${this.popoverId()}"]`,
    )
    const placement = this.placement()

    if (popover && trigger && this.controlledOpen()) {
      autoUpdate(trigger, popover, () => {
        computePosition(trigger, popover, {
          placement,
          strategy: 'fixed',
          middleware: [
            offset((data) => {
              // get pseudo element arrow size
              const styles = getComputedStyle(
                data.elements.floating,
                '::before',
              )
              return parseFloat(styles.height)
            }),
            ...(this.autoPlacement()
              ? [flip({ fallbackAxisSideDirection: 'start' }), shift()]
              : []),
            this.arrowPseudoElement,
          ],
        }).then(({ x, y }) => {
          popover.style.translate = `${x}px ${y}px`
        })
      })
    }
  }, {})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrowPseudoElement: any = {
    name: 'ArrowPseudoElement',
    fn(data: MiddlewareState) {
      const { elements, rects, placement } = data

      let arrowX = `${Math.round(rects.reference.width / 2 + rects.reference.x - data.x)}px`
      let arrowY = `${Math.round(rects.reference.height / 2 + rects.reference.y - data.y)}px`

      if (rects.reference.width > rects.floating.width) {
        arrowX = `${Math.round(rects.floating.width / 2)}px`
      }

      if (rects.reference.height > rects.floating.height) {
        arrowY = `${Math.round(rects.floating.height / 2)}px`
      }

      switch (placement.split('-')[0]) {
        case 'top':
          arrowY = '100%'
          break
        case 'right':
          arrowX = '0'
          break
        case 'bottom':
          arrowY = '0'
          break
        case 'left':
          arrowX = '100%'
          break
      }

      elements.floating.setAttribute(
        'data-placement',
        placement.split('-')[0] as string,
      ) // We only need top/left/right/bottom
      elements.floating.style.setProperty('--ds-popover-arrow-x', arrowX)
      elements.floating.style.setProperty('--ds-popover-arrow-y', arrowY)
      return data
    },
  }
}

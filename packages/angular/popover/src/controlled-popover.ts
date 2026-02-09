import { Component, input, signal } from '@angular/core'
import {
  Color,
  SeverityColors,
  Size,
} from '@ks-digital/designsystem-angular/__internals'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Popover } from './popover'

/* Demo component to be used in story only */

@Component({
  selector: 'ksd-controlled-popover',
  template: `
    <button
      ksd-button
      variant="primary"
      popovertarget="controlled-popover"
      (click)="togglePopover()"
    >
      Kontrollert popover
    </button>

    <ksd-popover
      popoverId="controlled-popover"
      placement="top"
      [open]="popoverOpen()"
      (triggeredClose)="setPopoverClosed()"
      [variant]="variant()"
      [data-size]="dataSize()"
      [data-color]="dataColor()"
      [placement]="placement()"
    >
      <p>Her er det noe innhold</p>
      <button
        ksd-button
        variant="secondary"
        data-color="danger"
        (click)="setPopoverClosed()"
      >
        Lukk popover
      </button>
    </ksd-popover>
  `,
  imports: [Popover, Button],
})
export class ControlledPopover {
  protected popoverOpen = signal(false)
  readonly variant = input<'tinted' | 'default'>('default')
  readonly dataSize = input<Size>('md', { alias: 'data-size' })
  readonly dataColor = input<Color | SeverityColors>('neutral', {
    alias: 'data-color',
  })
  readonly placement = input<'top' | 'bottom' | 'left' | 'right'>('top')

  togglePopover() {
    this.popoverOpen.update((open) => !open)
  }

  setPopoverClosed() {
    this.popoverOpen.set(false)
  }
}

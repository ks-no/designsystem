import { Component, input, signal } from '@angular/core'
import { Button } from '../button'
import { Color, SeverityColors } from '../colors'
import { Size } from '../common-inputs'
import { Popover } from './popover'

/* Demo component to be used in story only */

@Component({
  selector: 'controlled-popover',
  template: `
    <button
      ksd-button
      variant="primary"
      popovertarget="controlled-popover"
      class="w-fit"
      (click)="togglePopover()"
    >
      Kontrollert popover
    </button>

    <ds-popover
      popoverId="controlled-popover"
      placement="top"
      [open]="popoverOpen()"
      (triggeredClose)="setPopoverClosed()"
      [variant]="variant()"
      [dataSize]="dataSize()"
      [dataColor]="dataColor()"
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
    </ds-popover>
  `,
  imports: [Popover, Button],
})
export class ControlledPopover {
  popoverOpen = signal(false)
  readonly variant = input<'tinted' | 'default'>('default')
  readonly dataSize = input<Size>('md')
  readonly dataColor = input<Color | SeverityColors>('neutral')
  readonly placement = input<'top' | 'bottom' | 'left' | 'right'>('top')

  togglePopover() {
    this.popoverOpen.update((open) => !open)
  }

  setPopoverClosed() {
    this.popoverOpen.set(false)
  }
}

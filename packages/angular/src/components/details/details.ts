import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core'
import '@u-elements/u-details'

@Component({
  selector: 'ksd-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <u-details
      #detailsRef
      class="ds-details"
      [attr.data-variant]="variant()"
      [attr.open]="(open() ?? defaultOpen()) || undefined"
      [attr.data-color]="dataColor()"
      [attr.data-size]="dataSize()"
      (toggle)="onToggle($event)"
    >
      <u-summary>
        <ng-content select="ksd-details-summary" />
      </u-summary>
      <div>
        <ng-content select="ksd-details-content" />
      </div>
    </u-details>
  `,
  styles: `
    /* Styles needed since Designsystemet styles doesnt expect an element wrapping .ds-details, which we have */
    .ds-card > :host(:last-child) > .ds-details {
      border-bottom: 0;
    }

    .ds-card > :host(:first-child) > .ds-details {
      border-top: 0;
    }

    :host {
      & + & > .ds-details {
        border-top: 0;
        margin-top: 0;
      }
    }
  `,
})
export class Details {
  readonly dataSize = input<'sm' | 'md' | 'lg' | undefined>(undefined, {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'data-size',
  })
  readonly dataColor = input<string | undefined>(undefined, {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'data-color',
  })
  readonly variant = input<'tinted' | 'default'>('default')
  readonly defaultOpen = input<boolean>(false)
  readonly open = input<boolean | undefined>(undefined)
  readonly toggled = output<Event>()
  private detailsRef = viewChild<ElementRef<HTMLDetailsElement>>('detailsRef')

  onToggle(event: Event) {
    const details = this.detailsRef()?.nativeElement
    if (details && details.open !== this.open()) {
      this.toggled.emit(event)
    }
  }
}

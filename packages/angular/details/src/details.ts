import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core'
import {
  HostSeverityColors,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'
import '@u-elements/u-details'

@Component({
  selector: 'ksd-details',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    <u-details
      #detailsRef
      class="ds-details"
      [attr.data-variant]="variant()"
      [attr.open]="(open() ?? defaultOpen()) || undefined"
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
    .ds-card > :host(:last-of-type) > .ds-details {
      border-bottom: 0;
    }

    .ds-card > :host(:first-of-type) > .ds-details {
      border-top: 0;
    }

    :host(:not(:first-of-type)) > .ds-details {
      border-top: 0;
      margin-top: 0;
    }
  `,
})
export class Details {
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

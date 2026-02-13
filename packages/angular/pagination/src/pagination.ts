import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
} from '@angular/core'
import { pagination } from '@digdir/designsystemet-web'
import {
  HostColor,
  HostSize,
} from '@ks-digital/designsystem-angular/__internals'

@Component({
  selector: 'ksd-pagination',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ds-pagination
        class="ds-pagination"
        [attr.data-current]="current()"
        [attr.data-total]="total()"
        [attr.data-href]="href()"
      >
        <ol>
          <li>
            @if (useLinks()) {
              <a
                class="ds-button"
                data-variant="tertiary"
                (click)="onClick($event)"
              ></a>
            } @else {
              <button
                class="ds-button"
                data-variant="tertiary"
                type="button"
                (click)="onClick($event)"
              ></button>
            }
          </li>
          @for (page of pages().pages; track page.key) {
            <li>
              @if (useLinks()) {
                <a
                  class="ds-button"
                  [attr.data-variant]="page.current ? 'primary' : 'tertiary'"
                  (click)="onClick($event)"
                ></a>
              } @else {
                <button
                  class="ds-button"
                  [attr.data-variant]="page.current ? 'primary' : 'tertiary'"
                  type="button"
                  (click)="onClick($event)"
                ></button>
              }
            </li>
          }
          <li>
            @if (useLinks()) {
              <a
                class="ds-button"
                data-variant="tertiary"
                (click)="onClick($event)"
              ></a>
            } @else {
              <button
                class="ds-button"
                data-variant="tertiary"
                type="button"
                (click)="onClick($event)"
              ></button>
            }
          </li>
        </ol>
      </ds-pagination>
    </nav>
  `,
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
})
export class Pagination {
  /**
   * The current page
   */
  readonly current = input.required<number>({})

  /**
   * The total number of pages
   */
  readonly total = input.required<number>({})

  /**
   * How many pages to show. Default is 7
   */
  readonly show = input(7)

  /**
   * E.g if "?page=%d" all the links will be rendered as "?page=1", "?page=2" etc.
   * If not set, the component will render buttons instead of links
   */
  readonly href = input<string>()

  /**
   * Sets the screen reader label for the Pagination area
   */
  readonly ariaLabel = input('Pagination')

  /**
   * Emits the page number when a page link is clicked
   */
  readonly pageChanged = output<number>()

  protected useLinks = computed(() => !!this.href())
  protected pages = computed(() =>
    pagination({
      current: this.current(),
      total: this.total(),
      show: this.show(),
    }),
  )

  onClick(e: Event) {
    const target = e.currentTarget as HTMLElement
    const page = Number(target.dataset['page'])

    if (page) {
      e.preventDefault()
      this.pageChanged.emit(page)
    }
  }
}

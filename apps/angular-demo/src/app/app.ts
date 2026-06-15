import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { Alert } from '@ks-digital/designsystem-angular/alert'
import { Breadcrumbs } from '@ks-digital/designsystem-angular/breadcrumbs'
import { Button } from '@ks-digital/designsystem-angular/button'
import { Card } from '@ks-digital/designsystem-angular/card'
import { Chip } from '@ks-digital/designsystem-angular/chip'
import { Details } from '@ks-digital/designsystem-angular/details'
import { Dialog } from '@ks-digital/designsystem-angular/dialog'
import { Dropdown } from '@ks-digital/designsystem-angular/dropdown'
import { ErrorSummary } from '@ks-digital/designsystem-angular/error-summary'
import {
  Field,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from '@ks-digital/designsystem-angular/forms'
import { Heading } from '@ks-digital/designsystem-angular/heading'
import { Link } from '@ks-digital/designsystem-angular/link'
import { Pagination } from '@ks-digital/designsystem-angular/pagination'
import { Paragraph } from '@ks-digital/designsystem-angular/paragraph'
import { Popover } from '@ks-digital/designsystem-angular/popover'
import {
  Search,
  SearchButton,
  SearchClear,
  SearchInput,
} from '@ks-digital/designsystem-angular/search'
import { Spinner } from '@ks-digital/designsystem-angular/spinner'
import {
  Suggestion,
  SuggestionList,
  SuggestionListEmpty,
  SuggestionListOption,
} from '@ks-digital/designsystem-angular/suggestion'
import { Table, TableHeaderCell } from '@ks-digital/designsystem-angular/table'
import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@ks-digital/designsystem-angular/tabs'
import { Tag } from '@ks-digital/designsystem-angular/tag'
import { ValidationMessage } from '@ks-digital/designsystem-angular/validation-message'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Alert,
    Breadcrumbs,
    Button,
    Card,
    Chip,
    Details,
    Dialog,
    Dropdown,
    ErrorSummary,
    Field,
    Fieldset,
    FieldsetDescription,
    FieldsetLegend,
    Heading,
    Input,
    Label,
    Link,
    Pagination,
    Paragraph,
    Popover,
    Search,
    SearchButton,
    SearchClear,
    SearchInput,
    Spinner,
    Suggestion,
    SuggestionList,
    SuggestionListEmpty,
    SuggestionListOption,
    Table,
    TableHeaderCell,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Tag,
    ValidationMessage,
  ],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-16">
      <!-- Breadcrumbs -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Breadcrumbs</h2>
        <ksd-breadcrumbs aria-label="Du er her:">
          <ol>
            <li><a ksd-link href="#">Hjem</a></li>
            <li><a ksd-link href="#">Tjenester</a></li>
            <li><a ksd-link href="#" aria-current="page">Søknad</a></li>
          </ol>
        </ksd-breadcrumbs>
      </section>

      <!-- Alerts -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Alerts</h2>
        <div class="flex flex-col gap-3">
          <ksd-alert data-color="info">
            <h3 ksd-heading data-size="xs">Informasjon</h3>
            <p ksd-paragraph>Dette er en informasjonsmelding til brukeren.</p>
          </ksd-alert>
          <ksd-alert data-color="success">
            <h3 ksd-heading data-size="xs">Suksess</h3>
            <p ksd-paragraph>Søknaden din er sendt inn.</p>
          </ksd-alert>
          <ksd-alert data-color="warning">
            <h3 ksd-heading data-size="xs">Advarsel</h3>
            <p ksd-paragraph>Vi har tekniske problemer for øyeblikket.</p>
          </ksd-alert>
          <ksd-alert data-color="danger">
            <h3 ksd-heading data-size="xs">Feil</h3>
            <p ksd-paragraph>Det har skjedd en feil. Prøv igjen senere.</p>
          </ksd-alert>
        </div>
      </section>

      <!-- Typography -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Typography</h2>
        <div class="flex flex-col gap-2">
          <h1 ksd-heading data-size="2xl">Overskrift 2xl</h1>
          <h2 ksd-heading data-size="xl">Overskrift xl</h2>
          <h3 ksd-heading data-size="lg">Overskrift lg</h3>
          <h4 ksd-heading data-size="md">Overskrift md</h4>
          <h5 ksd-heading data-size="sm">Overskrift sm</h5>
          <p ksd-paragraph>
            Dette er et avsnitt med tekst. Designsystemet gir konsistent
            typografi på tvers av alle komponenter.
          </p>
          <p><a ksd-link href="#">Dette er en lenke</a></p>
        </div>
      </section>

      <!-- Buttons -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Buttons</h2>
        <div class="flex flex-wrap gap-3">
          <button ksd-button data-variant="primary">Primary</button>
          <button ksd-button data-variant="secondary">Secondary</button>
          <button ksd-button data-variant="tertiary">Tertiary</button>
          <button ksd-button data-variant="primary" [loading]="loading()">
            @if (!loading()) {
              Last inn
            }
          </button>
          <button ksd-button data-variant="primary" disabled>Disabled</button>
          <button ksd-button data-variant="primary" data-color="neutral">
            Neutral
          </button>
          <button ksd-button data-variant="primary" data-size="sm">
            Liten
          </button>
          <button ksd-button data-variant="primary" data-size="lg">Stor</button>
        </div>
        <div class="mt-3">
          <button ksd-button data-variant="secondary" (click)="toggleLoading()">
            Toggle loading state
          </button>
        </div>
      </section>

      <!-- Tags & Chips -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Tags &amp; Chips</h2>
        <div class="flex flex-wrap gap-3 mb-4">
          <ksd-tag>Standard</ksd-tag>
          <ksd-tag data-color="accent">Accent</ksd-tag>
          <ksd-tag data-color="neutral">Neutral</ksd-tag>
          <ksd-tag data-variant="outline">Outline</ksd-tag>
          <ksd-tag data-variant="outline" data-color="accent"
            >Outline accent</ksd-tag
          >
        </div>
        <div class="flex flex-wrap gap-3">
          <label ksd-chip>
            <input ksd-input type="radio" name="chip-lang" value="nb" checked />
            Bokmål
          </label>
          <label ksd-chip>
            <input ksd-input type="radio" name="chip-lang" value="nn" />
            Nynorsk
          </label>
          <button ksd-chip>Tøm alle filtre</button>
        </div>
      </section>

      <!-- Forms -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Forms</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ksd-field>
            <ksd-label>Tekstfelt</ksd-label>
            <input ksd-input type="text" placeholder="Skriv noe..." />
          </ksd-field>

          <ksd-field>
            <ksd-label>E-post</ksd-label>
            <input ksd-input type="email" placeholder="navn@eksempel.no" />
            <p ksd-validation-message aria-live="polite">
              Ugyldig e-postadresse
            </p>
          </ksd-field>

          <ksd-field>
            <ksd-label>Velg et alternativ</ksd-label>
            <select ksd-input>
              <option value="" disabled selected>Velg...</option>
              <option value="1">Alternativ 1</option>
              <option value="2">Alternativ 2</option>
              <option value="3">Alternativ 3</option>
            </select>
          </ksd-field>

          <ksd-field>
            <ksd-label>Kommentar</ksd-label>
            <textarea
              ksd-input
              rows="3"
              placeholder="Skriv kommentar..."
            ></textarea>
          </ksd-field>

          <fieldset ksd-fieldset>
            <legend ksd-fieldset-legend>Kontaktmetode</legend>
            <p ksd-fieldset-description>Velg én eller flere</p>
            <ksd-field>
              <ksd-label>E-post</ksd-label>
              <input ksd-input type="checkbox" value="epost" />
            </ksd-field>
            <ksd-field>
              <ksd-label>Telefon</ksd-label>
              <input ksd-input type="checkbox" value="telefon" />
            </ksd-field>
          </fieldset>

          <fieldset ksd-fieldset>
            <legend ksd-fieldset-legend>Språk</legend>
            <ksd-field>
              <ksd-label>Bokmål</ksd-label>
              <input ksd-input type="radio" name="lang" value="nb" checked />
            </ksd-field>
            <ksd-field>
              <ksd-label>Nynorsk</ksd-label>
              <input ksd-input type="radio" name="lang" value="nn" />
            </ksd-field>
          </fieldset>

          <ksd-field>
            <ksd-label>Varsler på e-post</ksd-label>
            <input ksd-input type="checkbox" role="switch" />
          </ksd-field>
        </div>
      </section>

      <!-- Error Summary -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Error Summary</h2>
        <div ksd-error-summary>
          <h3 ksd-heading data-size="sm">Du må rette disse feilene:</h3>
          <ul>
            <li><a ksd-link href="#">Navn er påkrevd</a></li>
            <li><a ksd-link href="#">E-post er ugyldig</a></li>
          </ul>
        </div>
      </section>

      <!-- Search -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Search</h2>
        <ksd-search role="search">
          <input ksd-search-input role="searchbox" aria-label="Søk" />
          <button ksd-search-clear aria-label="Tøm søk"></button>
          <button ksd-search-button aria-label="Søk"></button>
        </ksd-search>
      </section>

      <!-- Tabs -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Tabs</h2>
        <ksd-tabs>
          <ksd-tabs-list>
            <ksd-tabs-tab>Oversikt</ksd-tabs-tab>
            <ksd-tabs-tab>Detaljer</ksd-tabs-tab>
            <ksd-tabs-tab>Historikk</ksd-tabs-tab>
          </ksd-tabs-list>
          <ksd-tabs-panel>
            <p ksd-paragraph>Innhold for Oversikt-fanen.</p>
          </ksd-tabs-panel>
          <ksd-tabs-panel>
            <p ksd-paragraph>Innhold for Detaljer-fanen.</p>
          </ksd-tabs-panel>
          <ksd-tabs-panel>
            <p ksd-paragraph>Innhold for Historikk-fanen.</p>
          </ksd-tabs-panel>
        </ksd-tabs>
      </section>

      <!-- Table -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Table</h2>
        <table ksd-table data-zebra="true">
          <caption>
            Ansatte
          </caption>
          <thead>
            <tr>
              <th ksd-header-cell>Navn</th>
              <th ksd-header-cell>E-post</th>
              <th ksd-header-cell>Rolle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kari Nordmann</td>
              <td>kari&#64;eksempel.no</td>
              <td>Rådgiver</td>
            </tr>
            <tr>
              <td>Ola Nordmann</td>
              <td>ola&#64;eksempel.no</td>
              <td>Leder</td>
            </tr>
            <tr>
              <td>Per Nordmann</td>
              <td>per&#64;eksempel.no</td>
              <td>Utvikler</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Card -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Card</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article ksd-card>
            <h3 ksd-heading data-size="sm">Kort tittel</h3>
            <p ksd-paragraph>Innhold i et standard kort.</p>
          </article>
          <article ksd-card data-variant="tinted">
            <h3 ksd-heading data-size="sm">Tinted kort</h3>
            <p ksd-paragraph>Kort med tinted bakgrunn.</p>
          </article>
          <article ksd-card>
            <h3 ksd-heading data-size="sm">
              <a ksd-link href="#">Klikkbart kort</a>
            </h3>
            <p ksd-paragraph>Hele kortet er klikkbart via lenken i tittelen.</p>
          </article>
        </div>
      </section>

      <!-- Details -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Details</h2>
        <div class="flex flex-col gap-3">
          <details ksd-details>
            <summary>Vedlegg</summary>
            <div>Vedlegg 1, vedlegg 2, vedlegg 3</div>
          </details>
          <details ksd-details data-color="accent" data-variant="tinted">
            <summary>Mer informasjon</summary>
            <div>Her er mer detaljert informasjon om saken.</div>
          </details>
        </div>
      </section>

      <!-- Spinner -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Spinner</h2>
        <div class="flex gap-6 items-center">
          <ksd-spinner aria-label="Laster..." data-size="sm" />
          <ksd-spinner aria-label="Laster..." data-size="md" />
          <ksd-spinner aria-label="Laster..." data-size="lg" />
        </div>
      </section>

      <!-- Pagination -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Pagination</h2>
        <ksd-pagination
          [current]="currentPage()"
          [total]="10"
          aria-label="Bla i sider"
          (pageClicked)="currentPage.set($event)"
        />
        <p ksd-paragraph class="mt-2">Side {{ currentPage() }} av 10</p>
      </section>

      <!-- Dialog, Dropdown & Popover -->
      <section>
        <h2 class="text-xl font-semibold mb-4">
          Dialog, Dropdown &amp; Popover
        </h2>
        <div class="flex flex-wrap gap-3">
          <button
            ksd-button
            data-variant="primary"
            commandfor="demo-dialog"
            command="show-modal"
          >
            Åpne dialog
          </button>
          <dialog ksd-dialog id="demo-dialog" closedby="any">
            <button
              ksd-button
              data-icon="true"
              commandfor="demo-dialog"
              command="close"
              data-variant="tertiary"
              data-color="neutral"
              aria-label="Lukk dialog"
              type="button"
            ></button>
            <h2
              ksd-heading
              data-size="sm"
              style="margin-bottom: var(--ds-size-2)"
            >
              Dialog tittel
            </h2>
            <p ksd-paragraph style="margin-bottom: var(--ds-size-4)">
              Her er innholdet i dialogen.
            </p>
            <button ksd-button commandfor="demo-dialog" command="close">
              Lukk
            </button>
          </dialog>

          <button
            ksd-button
            data-variant="secondary"
            type="button"
            popovertarget="demo-dropdown"
          >
            Dropdown
          </button>
          <div ksd-dropdown id="demo-dropdown" data-placement="bottom-start">
            <ul>
              <li>
                <button ksd-button data-variant="tertiary" type="button">
                  Rediger
                </button>
              </li>
              <li>
                <button ksd-button data-variant="tertiary" type="button">
                  Kopier
                </button>
              </li>
              <li>
                <button ksd-button data-variant="tertiary" type="button">
                  Slett
                </button>
              </li>
            </ul>
          </div>

          <button
            ksd-button
            data-variant="secondary"
            type="button"
            popovertarget="demo-popover"
          >
            Popover
          </button>
          <div ksd-popover id="demo-popover" data-placement="bottom-start">
            <p ksd-paragraph>Dette er innholdet i popoveren.</p>
          </div>
        </div>
      </section>

      <!-- Suggestion -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Suggestion</h2>
        <ksd-field style="max-width: 400px">
          <ksd-label>Søk etter kommune</ksd-label>
          <ksd-suggestion>
            <input ksd-input type="text" />
            <ksd-suggestion-list>
              <ksd-suggestion-list-empty>Ingen treff</ksd-suggestion-list-empty>
              @for (item of municipalities; track item.value) {
                <ksd-suggestion-list-option [value]="item.value">{{
                  item.label
                }}</ksd-suggestion-list-option>
              }
            </ksd-suggestion-list>
          </ksd-suggestion>
        </ksd-field>
      </section>
    </div>
  `,
})
export class App {
  protected readonly loading = signal(false)
  protected readonly currentPage = signal(1)

  protected readonly municipalities = [
    { label: 'Bergen', value: '4601' },
    { label: 'Oslo', value: '0301' },
    { label: 'Stavanger', value: '1103' },
    { label: 'Molde', value: '1506' },
    { label: 'Trondheim', value: '5001' },
  ]

  toggleLoading() {
    this.loading.update((v) => !v)
  }
}

import { Component, computed, signal } from '@angular/core'
import { Button } from '../button'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

@Component({
  selector: 'fiks-controlled-details',
  imports: [Details, DetailsContent, DetailsSummary, Button],
  template: `
    <button
      ksd-button
      variant="secondary"
      style="margin-bottom: .5em;"
      (click)="toggleOpen()"
    >
      {{ toggleOpenText() }}
    </button>
    <ksd-details [open]="open1()" (toggled)="open1.set(!open1())">
      <ksd-details-summary>Enkeltpersonforetak</ksd-details-summary>
      <ksd-details-content>
        Skal du starte for deg selv? Enkeltpersonforetak er ofte den enkleste
        måten å etablere bedrift på. Denne organisasjonsformen har både fordeler
        og ulemper. Det gir deg stor grad av frihet, men kan også gi betydelig
        risiko fordi du har personlig ansvar for økonomien.
      </ksd-details-content>
    </ksd-details>
    <ksd-details [open]="open2()" (toggled)="open2.set(!open2())">
      <ksd-details-summary>Aksjeselskap (AS)</ksd-details-summary>
      <ksd-details-content>
        Planlegger du å starte næringsvirksomhet alene eller sammen med andre?
        Innebærer næringsvirksomheten en økonomisk risiko? Vil du ha rettigheter
        som arbeidstaker og muligheten til at andre kan investere i selskapet
        ditt? Da kan aksjeselskap være en hensiktsmessig organisasjonsform.
      </ksd-details-content>
    </ksd-details>
    <ksd-details [open]="open3()" (toggled)="open3.set(!open3())">
      <ksd-details-summary>Ansvarlig selskap (ANS/DA)</ksd-details-summary>
      <ksd-details-content>
        Skal dere starte opp egen virksomhet sammen? Samarbeider dere godt?
        Krever virksomheten små investeringer og innebærer liten økonomisk
        risiko? Da kan ansvarlig selskap være aktuelt.
      </ksd-details-content>
    </ksd-details>
  `,
})
export class ControlledDetails {
  open1 = signal(false)
  open2 = signal(false)
  open3 = signal(false)

  isOpen = computed(() =>
    [this.open1(), this.open2(), this.open3()].every(Boolean),
  )
  toggleOpenText = computed(() => (this.isOpen() ? 'Lukk alle' : 'Åpne alle'))

  toggleOpen = () => {
    const isOpen = this.isOpen()
    this.open1.set(!isOpen)
    this.open2.set(!isOpen)
    this.open3.set(!isOpen)
  }
}

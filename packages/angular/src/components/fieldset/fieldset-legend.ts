import {
  Component
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'legend[ksdFieldsetLegend]',
  host: {
    'role': 'legend',
    'class': 'ds-label',
  },
  template: `
    <ng-content />
  `,
})
export class FieldsetLegend {
}

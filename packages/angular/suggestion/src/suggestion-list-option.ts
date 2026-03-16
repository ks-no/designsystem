import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core'

@Component({
  selector: 'ksd-suggestion-list-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
  template: ` <ng-template #tpl><ng-content /></ng-template> `,
})
export class SuggestionListOption {
  /**
   * Hack to get the content from parent component so that we can
   * keep the dom structure needed without additional host elements
   */
  templateRef = viewChild<TemplateRef<unknown>>('tpl')

  value = input.required<string>()
}

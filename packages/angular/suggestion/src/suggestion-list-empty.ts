import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  viewChild,
} from '@angular/core'

@Component({
  selector: 'ksd-suggestion-list-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-template #tpl><ng-content /></ng-template> `,
})
export class SuggestionListEmpty {
  /**
   * Hack to get the content from parent component so that we can
   * keep the dom structure needed without additional host elements
   */
  templateRef = viewChild<TemplateRef<unknown>>('tpl')
}

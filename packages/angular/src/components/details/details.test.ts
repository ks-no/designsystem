import { Component } from '@angular/core'
import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

describe('Details', () => {
  it('should have summary, content and be open when clicked', async () => {
    @Component({
      template: `
        <ksd-details>
          <ksd-details-summary>Details Summary Text</ksd-details-summary>
          <ksd-details-content
            >The fantastic details content text</ksd-details-content
          >
        </ksd-details>
      `,
      imports: [Details, DetailsContent, DetailsSummary],
    })
    class TestDetails {}

    await render(TestDetails)

    const user = userEvent.setup()
    const detailsExpandButton = screen.getByRole('button')

    await user.click(detailsExpandButton)

    expect(screen.getByText('Details Summary Text'))
    expect(screen.getByText('The fantastic details content text'))
    expect(detailsExpandButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('should render details with open state as controlled', async () => {
    @Component({
      template: `
        <ksd-details [open]="true" (toggled)="VOID()">
          <ksd-details-summary>Details Summary Text</ksd-details-summary>
          <ksd-details-content
            >The fantastic details content text</ksd-details-content
          >
        </ksd-details>
      `,
      imports: [Details, DetailsContent, DetailsSummary],
    })
    class TestDetails {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      VOID = () => {}
    }

    await render(TestDetails)

    const detailsExpandButton = screen.getByRole('button')
    expect(detailsExpandButton).toHaveAttribute('aria-expanded', 'true')
  })
})

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
        <details ksd-details>
          <summary>Details Summary Text</summary>
          <div>The fantastic details content text</div>
        </details>
      `,
      imports: [Details, DetailsContent, DetailsSummary],
    })
    class TestDetails {}

    const { container } = await render(TestDetails)

    const user = userEvent.setup()
    const details = container.querySelector('details')!
    const summary = screen.getByText('Details Summary Text')

    expect(details).not.toHaveAttribute('open')

    await user.click(summary)

    expect(details).toHaveAttribute('open')
    expect(screen.getByText('Details Summary Text')).toBeInTheDocument()
    expect(
      screen.getByText('The fantastic details content text'),
    ).toBeInTheDocument()
  })
})

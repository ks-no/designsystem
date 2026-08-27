import { ChangeDetectionStrategy, Component } from '@angular/core'
import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Details } from './details'
import { DetailsContent } from './details-content'
import { DetailsSummary } from './details-summary'

describe('Details', () => {
  it('should have summary, content and be open when clicked', async () => {
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush,
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
    const details = container.querySelector('details')
    const summary = screen.getByText('Details Summary Text')

    expect(details).not.toHaveAttribute('open')

    await user.click(summary)

    expect(details).toHaveAttribute('open')
    expect(screen.getByText('Details Summary Text')).toBeInTheDocument()
    expect(
      screen.getByText('The fantastic details content text'),
    ).toBeInTheDocument()
  })

  it('should have no obvious accessibility violations', async () => {
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
        <details ksd-details>
          <summary>Details Summary Text</summary>
          <div>The fantastic details content text</div>
        </details>
      `,
      imports: [Details, DetailsContent, DetailsSummary],
    })
    class TestDetailsAxe {}

    const { container } = await render(TestDetailsAxe)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

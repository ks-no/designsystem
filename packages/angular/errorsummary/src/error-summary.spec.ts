import { Link } from '@ks-digital/designsystem-angular/link'
import { render, screen } from '@testing-library/angular'
import { ErrorSummary } from './error-summary'

const renderErrorSummary = async () =>
  await render(
    `
    <div
      ksd-error-summary
      data-testid="error-summary"
      tabindex="-1"
      aria-labelledby="error-heading"
    >
      <h2 class="ds-heading" id="error-heading">For å gå videre må du rette opp følgende feil:</h2>
      <ul class="ds-list">
        <li>
          <a ksd-link data-color="neutral" href="#field1">Fødselsdato kan ikke være etter år 2005</a>
        </li>
        <li>
          <a ksd-link data-color="neutral" href="#field2">Telefonnummer kan kun inneholde siffer</a>
        </li>
        <li>
          <a ksd-link data-color="neutral" href="#field3">E-post må være gyldig</a>
        </li>
      </ul>
    </div>
    `,
    { imports: [Link, ErrorSummary] },
  )

it('should render error summary', async () => {
  await renderErrorSummary()

  const errorSummary = screen.getByTestId('error-summary')
  expect(errorSummary).toBeInTheDocument()
  expect(errorSummary).toHaveClass('ds-error-summary')
  expect(errorSummary).toHaveAttribute('tabindex', '-1')
  expect(errorSummary).toHaveAttribute('aria-labelledby', 'error-heading')

  const heading = screen.getByRole('heading', {
    name: 'For å gå videre må du rette opp følgende feil:',
  })
  expect(heading).toHaveAttribute('id', 'error-heading')

  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(3)
})

it('should apply data-size attribute', async () => {
  await render(
    `
    <div
      ksd-error-summary
      data-testid="error-summary"
      data-size="sm"
      tabindex="-1"
      aria-labelledby="error-heading"
    >
      <h2 class="ds-heading" id="error-heading">For å gå videre må du rette opp følgende feil:</h2>
      <ul class="ds-list">
        <li>
          <a ksd-link href="#field1">Error message</a>
        </li>
      </ul>
    </div>
    `,
    { imports: [Link, ErrorSummary] },
  )

  const errorSummary = screen.getByTestId('error-summary')
  expect(errorSummary).toHaveAttribute('data-size', 'sm')
})

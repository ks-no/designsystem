import { Link } from '@ks-digital/designsystem-angular/link'
import { render, screen } from '@testing-library/angular'
import { ErrorSummary } from './error-summary'

const renderErrorSummary = async () =>
  await render(
    `
    <div
      tabindex="-1"
      aria-labelledby="_r_o_"
      class="ds-error-summary"
    >
      <h2 class="ds-heading" id="_r_o_">For å gå videre må du rette opp følgende feil:</h2>
      <ul class="ds-list">
        <li>
          <a class="ds-link" data-color="neutral" href="#">Fødselsdato kan ikke være etter år 2005</a>
        </li>
        <li>
          <a class="ds-link" data-color="neutral" href="#">Telefonnummer kan kun inneholde siffer</a>
        </li>
        <li>
          <a class="ds-link" data-color="neutral" href="#">E-post må være gyldig</a>
        </li>
      </ul>
    </div>

    `,
    { imports: [Link, ErrorSummary] },
  )

it('should render errorsummary', async () => {
  await renderErrorSummary()

  const errorSummary = screen.getByRole('navigation')
  expect(errorSummary).toBeInTheDocument()
  expect(errorSummary).toHaveClass('ds-errorsummary')

  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(3)
})

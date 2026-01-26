import { Link } from '@ks-digital/designsystem-angular/link'
import { render, screen } from '@testing-library/angular'
import { Breadcrumbs } from './breadcrumbs'

const renderCrumbs = async () =>
  await render(
    `
  <nav aria-label="Du er her:" ksd-breadcrumbs>
  <a ksd-link href="#" aria-label="Tilbake til Nivå 3">Nivå 3</a>
  <ol>
    <li>
      <a ksd-link href="#">Nivå 1</a>
    </li>
    <li>
      <a ksd-link href="#">Nivå 2</a>
    </li>
    <li>
      <a ksd-link href="#">Nivå 3</a>
    </li>
    <li>
      <a ksd-link href="#" aria-current="page">Nivå 4</a>
    </li>
  </ol>
</nav>      
    `,
    { imports: [Link, Breadcrumbs] },
  )

it('should render breadcrumbs', async () => {
  await renderCrumbs()

  const crumbs = screen.getByRole('navigation')
  expect(crumbs).toBeInTheDocument()
  expect(crumbs).toHaveClass('ds-breadcrumbs')

  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(5)
})

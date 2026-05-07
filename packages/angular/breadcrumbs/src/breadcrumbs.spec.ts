import { Link } from '@ks-digital/designsystem-angular/link'
import { render, screen, waitFor } from '@testing-library/angular'
import { afterAll, beforeAll } from 'vitest'
import { Breadcrumbs } from './breadcrumbs'

window.dsWarnings = false

// JSDOM has no layout engine — ds-breadcrumbs uses offsetHeight to detect
// list visibility and removes role="navigation" when it's 0.
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 1
    },
  })
})

afterAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 0
    },
  })
})

const renderCrumbs = async () =>
  await render(
    `
  <ksd-breadcrumbs aria-label="Du er her:">
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
</ksd-breadcrumbs>      
    `,
    { imports: [Link, Breadcrumbs] },
  )

it('should render breadcrumbs', async () => {
  await renderCrumbs()

  await waitFor(() => {
    const crumbs = screen.getByRole('navigation') // Role is set by underlyting web-component
    expect(crumbs).toBeInTheDocument()
    expect(crumbs).toHaveClass('ds-breadcrumbs')
  })

  const links = screen.getAllByRole('link')
  expect(links).toHaveLength(5)
})

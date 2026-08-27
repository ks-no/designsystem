import { render, screen } from '@testing-library/angular'
import { Label } from './label'

it('should render label', async () => {
  await render(`<ksd-label>My label</ksd-label>`, { imports: [Label] })

  const label = screen.getByText('My label')
  expect(label).toBeInTheDocument()
})

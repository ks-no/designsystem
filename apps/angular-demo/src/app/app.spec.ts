import { render, screen } from '@testing-library/angular'
import { App } from './app'

test('Should render title', async () => {
  await render(App)
  const title = screen.getByRole('heading', { name: 'Hi from Angular' })
  expect(title).toBeTruthy()
})

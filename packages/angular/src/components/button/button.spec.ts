import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Button } from './button'

it('should render as aria-disabled when aria-disabled is true regardless of variant', async () => {
  await render(
    `
      <button ksd-button aria-disabled="true">My button</button>
    `,
    { imports: [Button] },
  )

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-disabled')
})

it('should render as disabled when disabled is true regardless of variant', async () => {
  await render(
    `
      <button ksd-button disabled>My button</button>
    `,
    { imports: [Button] },
  )

  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
})

it('should be clickable', async () => {
  const handleClick = vi.fn()

  await render(
    `<button ksd-button (click)="handleClick()">My button</button>`,
    {
      imports: [Button],
      componentProperties: { handleClick },
    },
  )
  const user = userEvent.setup()
  const button = screen.getByRole('button')

  await user.click(button)
  expect(handleClick).toHaveBeenCalledTimes(1)
})

it('should not be clickable when disabled', async () => {
  const handleClick = vi.fn()

  await render(
    `<button ksd-button disabled (click)="handleClick()">My button</button>`,
    {
      imports: [Button],
      componentProperties: { handleClick },
    },
  )
  const user = userEvent.setup()
  const button = screen.getByRole('button')

  await user.click(button)
  expect(handleClick).not.toHaveBeenCalled()
})

it('should render button text', async () => {
  await render(
    `
      <button ksd-button disabled>Different button text</button>
    `,
    { imports: [Button] },
  )

  const button = screen.getByRole('button', { name: 'Different button text' })
  expect(button).toBeInTheDocument()
})
it('should set aria-busy when loading', async () => {
  await render(
    `
      <button ksd-button loading>My button</button>
    `,
    { imports: [Button] },
  )

  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-busy', 'true')
})

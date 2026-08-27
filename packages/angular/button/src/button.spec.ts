import { NgIcon, provideIcons } from '@ng-icons/core'
import { phosphorPencilLine } from '@ng-icons/phosphor-icons/regular'
import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { axe } from 'vitest-axe'
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

it('should not render icon when icon-only button is loading', async () => {
  await render(
    `
      <button icon loading ksd-button aria-label="Kun ikon">
        <ng-icon name="phosphorPencilLine" aria-label="Ikon" />
      </button>
    `,
    {
      imports: [Button, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    },
  )
  expect(screen.queryByLabelText('Ikon')).toBeNull()
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
})

it('should not render icon when data-icon button is loading', async () => {
  await render(
    `
      <button data-icon loading ksd-button aria-label="Kun ikon">
        <ng-icon name="phosphorPencilLine" aria-label="Ikon" />
      </button>
    `,
    {
      imports: [Button, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    },
  )
  expect(screen.queryByLabelText('Ikon')).toBeNull()
  expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
})

it('should set data-icon attribute when using data-icon', async () => {
  await render(
    `<button ksd-button data-icon aria-label="Ikon"><ng-icon name="phosphorPencilLine" /></button>`,
    {
      imports: [Button, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    },
  )
  expect(screen.getByRole('button')).toHaveAttribute('data-icon', 'true')
})

it('should set data-icon attribute when using deprecated icon input', async () => {
  await render(
    `<button ksd-button icon aria-label="Ikon"><ng-icon name="phosphorPencilLine" /></button>`,
    {
      imports: [Button, NgIcon],
      providers: [provideIcons({ phosphorPencilLine })],
    },
  )
  expect(screen.getByRole('button')).toHaveAttribute('data-icon', 'true')
})

it('should have no obvious accessibility violations', async () => {
  const { container } = await render(`<button ksd-button>My button</button>`, {
    imports: [Button],
  })

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

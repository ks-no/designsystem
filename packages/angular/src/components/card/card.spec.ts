import { fireEvent, render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Card } from './card'

it('should render card', async () => {
  await render(
    `
      <article ksd-card>My card</article>
    `,
    { imports: [Card] },
  )

  const card = screen.getByRole('article')
  expect(card).toHaveClass('ds-card')
})

it('clicking anywhere on the card triggers the inner link', async () => {
  await render(
    `
      <article ksd-card>
        <h2><a href="https://vg.no">My link</a></h2>
        <p>My paragraph</p>
      </article>
    `,
    { imports: [Card] },
  )

  const user = userEvent.setup()
  const card = screen.getByRole('article')

  // Spy on the link inside the card
  const clickSpy = vi
    .spyOn(HTMLAnchorElement.prototype, 'click')
    .mockImplementation(() => undefined)

  await user.click(card)

  // Expect that the link inside the card has been clicked
  expect(clickSpy).toHaveBeenCalledTimes(1)
  clickSpy.mockRestore()
})

it('opens link in new tab with noopener,noreferrer on meta/ctrl click', async () => {
  await render(
    `
      <article ksd-card>
        <h2><a href="https://vg.no">My link</a></h2>
        <p>My paragraph</p>
      </article>
    `,
    { imports: [Card] },
  )

  const card = screen.getByRole('article')
  const anchor = screen.getByRole('link') as HTMLAnchorElement

  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

  fireEvent.click(card, { ctrlKey: true })

  expect(openSpy).toHaveBeenCalledTimes(1)
  expect(openSpy).toHaveBeenCalledWith(
    anchor.href,
    '_blank',
    'noopener,noreferrer',
  )

  openSpy.mockRestore()
})

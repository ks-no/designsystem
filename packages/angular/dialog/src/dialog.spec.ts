import { render } from '@testing-library/angular'
import { Dialog } from './dialog'

describe('Dialog', () => {
  it('should render with ds-dialog class', async () => {
    const { container } = await render(
      `<dialog ksd-dialog id="test-dialog">Dialog innhold</dialog>`,
      { imports: [Dialog] },
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).toHaveClass('ds-dialog')
  })

  it('should set data-placement attribute', async () => {
    const { container } = await render(
      `<dialog ksd-dialog data-placement="bottom">Dialog innhold</dialog>`,
      { imports: [Dialog] },
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).toHaveAttribute('data-placement', 'bottom')
  })

  it('should set closedby attribute', async () => {
    const { container } = await render(
      `<dialog ksd-dialog closedby="any">Dialog innhold</dialog>`,
      { imports: [Dialog] },
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).toHaveAttribute('closedby', 'any')
  })

  it('should not set data-placement when not provided', async () => {
    const { container } = await render(
      `<dialog ksd-dialog>Dialog innhold</dialog>`,
      { imports: [Dialog] },
    )

    const dialog = container.querySelector('dialog')
    expect(dialog).not.toHaveAttribute('data-placement')
  })
})

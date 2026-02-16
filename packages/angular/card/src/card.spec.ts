import { render, screen } from '@testing-library/angular'
import { Card } from './card'

describe('Card', () => {
  it('should add ds-card class to host', async () => {
    await render(`<div ksd-card>Card content</div>`, {
      imports: [Card],
    })

    const card = screen.getByText('Card content')
    expect(card).toHaveClass('ds-card')
  })

  it('should set data-variant to default by default', async () => {
    await render(`<div ksd-card>Card content</div>`, {
      imports: [Card],
    })

    const card = screen.getByText('Card content')
    expect(card).toHaveAttribute('data-variant', 'default')
  })

  it('should set data-variant to tinted when variant is tinted', async () => {
    await render(`<div ksd-card variant="tinted">Card content</div>`, {
      imports: [Card],
    })

    const card = screen.getByText('Card content')
    expect(card).toHaveAttribute('data-variant', 'tinted')
  })

  describe('click delegation', () => {
    it('should set data-clickdelegatefor when card has a link in a heading', async () => {
      const { container } = await render(
        `
        <div ksd-card>
          <h2><a href="#">Card link</a></h2>
          <p>Card content</p>
        </div>
        `,
        { imports: [Card] },
      )

      const card = container.querySelector('[ksd-card]')
      expect(card).toHaveAttribute('data-clickdelegatefor')
    })

    it('should set id on link when link has no id', async () => {
      const { container } = await render(
        `
        <div ksd-card>
          <h2><a href="#">Card link</a></h2>
        </div>
        `,
        { imports: [Card] },
      )

      const link = container.querySelector('a')
      expect(link).toHaveAttribute('id')
      expect(link?.id).toContain('ksd-card-link-')
    })

    it('should preserve existing link id', async () => {
      const { container } = await render(
        `
        <div ksd-card>
          <h2><a id="my-link" href="#">Card link</a></h2>
        </div>
        `,
        { imports: [Card] },
      )

      const link = container.querySelector('a')
      const card = container.querySelector('[ksd-card]')

      expect(link).toHaveAttribute('id', 'my-link')
      expect(card).toHaveAttribute('data-clickdelegatefor', 'my-link')
    })

    it('should not set data-clickdelegatefor when link is not in a heading', async () => {
      const { container } = await render(
        `
        <div ksd-card>
          <a href="#">Card link</a>
          <p>Card content</p>
        </div>
        `,
        { imports: [Card] },
      )

      const card = container.querySelector('[ksd-card]')
      expect(card).not.toHaveAttribute('data-clickdelegatefor')
    })

    it('should not set data-clickdelegatefor when link is inside a button', async () => {
      const { container } = await render(
        `
        <div ksd-card>
          <button><h2><a href="#">Card link</a></h2></button>
        </div>
        `,
        { imports: [Card] },
      )

      const card = container.querySelector('[ksd-card]')
      expect(card).not.toHaveAttribute('data-clickdelegatefor')
    })

    it('should not set data-clickdelegatefor when already set', async () => {
      const { container } = await render(
        `
        <div ksd-card data-clickdelegatefor="existing-target">
          <h2><a href="#">Card link</a></h2>
        </div>
        `,
        { imports: [Card] },
      )

      const card = container.querySelector('[ksd-card]')
      expect(card).toHaveAttribute('data-clickdelegatefor', 'existing-target')
    })
  })
})

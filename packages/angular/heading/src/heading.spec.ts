import { Component, ViewChild } from '@angular/core'
import { render, screen } from '@testing-library/angular'
import { Heading } from './heading'

@Component({
  selector: 'test-heading',
  template: `<h1 ksd-heading>My heading</h1>`,
  imports: [Heading],
})
class TestHeadingComponent {
  @ViewChild(Heading) heading!: Heading
}

it('Should render heading', async () => {
  await render(`<h1 ksd-heading>My heading</h1>`, { imports: [Heading] })

  const heading = screen.getByRole('heading', { name: 'My heading' })
  expect(heading).toHaveClass('ds-heading')
  expect(heading).toBeInTheDocument()
})

it('Should not render heading when tag is not a valid heading', async () => {
  await render(`<p ksd-heading>My paragraph</p>`, { imports: [Heading] })

  const heading = screen.getByText('My paragraph')
  expect(heading).not.toHaveClass('ds-heading')
  expect(heading).toBeInTheDocument()
})

it('Should set id', async () => {
  const { fixture } = await render(TestHeadingComponent)

  fixture.componentInstance.heading.setId('test-id')
  fixture.detectChanges()

  const heading = screen.getByRole('heading', { name: 'My heading' })
  expect(heading).toHaveAttribute('id', 'test-id')
})

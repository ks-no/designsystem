import { afterEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import './table'

const toggle = '<button type="button" aria-expanded="false">2024/1187</button>'

const mount = (body: string) => {
  document.body.innerHTML = `<table class="ds-table">
    <thead><tr><th>Saksnummer</th><th>Søknad</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`
  return document.body.querySelector('button') as HTMLButtonElement
}

describe('expandable rows', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('passes accessibility checks', async () => {
    mount(`<tr><td>${toggle}</td><td>Byggesøknad</td></tr>
      <tr><td colspan="2">Detaljer</td></tr>`)

    const table = document.querySelector('table') as HTMLElement
    expect(await axe(table)).toHaveNoViolations()
  })

  it('flips aria-expanded on click', () => {
    const button = mount(`<tr><td>${toggle}</td><td>Byggesøknad</td></tr>
      <tr><td colspan="2">Detaljer</td></tr>`)

    button.click()
    expect(button).toHaveAttribute('aria-expanded', 'true')
    button.click()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it.each([
    [
      'aria-disabled',
      `<tr><td><button type="button" aria-expanded="false" aria-disabled="true">2024/1187</button></td></tr>
       <tr><td colspan="2">Detaljer</td></tr>`,
    ],
    [
      'not in the first cell',
      `<tr><td>2024/1187</td><td>${toggle}</td></tr>
       <tr><td colspan="2">Detaljer</td></tr>`,
    ],
    [
      'no detail row follows',
      `<tr><td>${toggle}</td><td>Byggesøknad</td></tr>
       <tr><td>2024/1188</td><td>Dispensasjon</td></tr>`,
    ],
    [
      'it is in the last row',
      `<tr><td>${toggle}</td><td>Byggesøknad</td></tr>`,
    ],
  ])('leaves a button alone when %s', (_, body) => {
    const button = mount(body)

    button.click()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})

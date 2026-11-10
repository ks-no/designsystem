import {
  attrs,
  indent,
  type Imports,
  type Snippets,
} from '@internal/storybook/snippets'

export type PaginationArgs = {
  current: number
  total: number
  show: number
  'aria-label': string
  'data-size'?: 'sm' | 'md' | 'lg'
  'data-color'?: string
}

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Pagination } from '@ks-digital/designsystem-angular/pagination'`,
  react: `import { useState } from 'react'\nimport { Pagination, usePagination } from '@ks-digital/designsystem-react'`,
}

const DEFAULT_LABEL = 'Bla i sider'
const DEFAULT_SHOW = 7

type Options = { href?: string }

function html(a: PaginationArgs, { href }: Options): string {
  // <ds-pagination> fills in page numbers, labels and aria-current on the controls,
  // so you render `show` page controls plus previous and next
  const tag = href ? 'a' : 'button'
  const control = (label = '') =>
    `<li><${tag}${href ? '' : ' type="button"'} class="ds-button" data-variant="tertiary">${label}</${tag}></li>`
  const items = [
    control('Forrige'),
    ...Array.from({ length: a.show }, () => control()),
    control('Neste'),
  ]
  return `<ds-pagination class="ds-pagination"${attrs({
    'data-current': a.current,
    'data-total': a.total,
    'data-href': href,
    'aria-label': a['aria-label'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
  })}>
  <ol>
${indent(items.join('\n'), 4)}
  </ol>
</ds-pagination>`
}

function angular(a: PaginationArgs, { href }: Options): string {
  const attributes = [
    `[current]="page()"`,
    `total="${a.total}"`,
    a.show !== DEFAULT_SHOW && `show="${a.show}"`,
    href && `href="${href}"`,
    a['aria-label'] !== DEFAULT_LABEL && `aria-label="${a['aria-label']}"`,
    a['data-size'] && `data-size="${a['data-size']}"`,
    a['data-color'] && `data-color="${a['data-color']}"`,
    `(pageClicked)="page.set($event)"`,
  ].filter(Boolean)
  return `<!-- I komponenten: page = signal(${a.current}) -->
<ksd-pagination
${indent(attributes.join('\n'))}
/>`
}

function react(a: PaginationArgs, { href }: Options): string {
  const pageButton = href
    ? `<Pagination.Button asChild aria-label={\`Side \${page}\`} {...buttonProps}>
  <a href={\`${href.replace('%d', '${page}')}\`}>{page}</a>
</Pagination.Button>`
    : `<Pagination.Button aria-label={\`Side \${page}\`} {...buttonProps}>
  {page}
</Pagination.Button>`
  return `const [currentPage, setCurrentPage] = useState(${a.current})
const { pages, prevButtonProps, nextButtonProps } = usePagination({
  currentPage,
  setCurrentPage,
  totalPages: ${a.total},
  showPages: ${a.show},
})

return (
  <Pagination${attrs({
    'aria-label': a['aria-label'],
    'data-size': a['data-size'],
    'data-color': a['data-color'],
  })}>
    <Pagination.List>
      <Pagination.Item>
        <Pagination.Button {...prevButtonProps}>Forrige</Pagination.Button>
      </Pagination.Item>
      {pages.map(({ page, itemKey, buttonProps }) => (
        <Pagination.Item key={itemKey}>
          {typeof page === 'number' && (
${indent(pageButton, 12)}
          )}
        </Pagination.Item>
      ))}
      <Pagination.Item>
        <Pagination.Button {...nextButtonProps}>Neste</Pagination.Button>
      </Pagination.Item>
    </Pagination.List>
  </Pagination>
)`
}

const example =
  (options: Options) =>
  (args: PaginationArgs): Snippets => ({
    html: html(args, options),
    angular: angular(args, options),
    react: react(args, options),
  })

export const preview = example({})
export const withLinks = example({ href: '?side=%d' })

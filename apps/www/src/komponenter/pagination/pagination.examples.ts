import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  html: `import '@ks-digital/designsystem-web'`,
  angular: `import { Pagination } from '@ks-digital/designsystem-angular/pagination'`,
  react: `import { useState } from 'react'
import { Pagination, usePagination } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ds-pagination class="ds-pagination" data-current="4" data-total="10" aria-label="Bla i sider">
  <ol>
    <li><button type="button" class="ds-button" data-variant="tertiary">Forrige</button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary"></button></li>
    <li><button type="button" class="ds-button" data-variant="tertiary">Neste</button></li>
  </ol>
</ds-pagination>`,
  angular: `<!-- I komponenten: page = signal(4) -->
<ksd-pagination
  [current]="page()"
  total="10"
  (pageClicked)="page.set($event)"
/>`,
  react: `const [currentPage, setCurrentPage] = useState(4)
const { pages, prevButtonProps, nextButtonProps } = usePagination({
  currentPage,
  setCurrentPage,
  totalPages: 10,
  showPages: 7,
})

return (
  <Pagination aria-label="Bla i sider">
    <Pagination.List>
      <Pagination.Item>
        <Pagination.Button {...prevButtonProps}>Forrige</Pagination.Button>
      </Pagination.Item>
      {pages.map(({ page, itemKey, buttonProps }) => (
        <Pagination.Item key={itemKey}>
          {typeof page === 'number' && (
            <Pagination.Button aria-label={\`Side \${page}\`} {...buttonProps}>
              {page}
            </Pagination.Button>
          )}
        </Pagination.Item>
      ))}
      <Pagination.Item>
        <Pagination.Button {...nextButtonProps}>Neste</Pagination.Button>
      </Pagination.Item>
    </Pagination.List>
  </Pagination>
)`,
}

export const withLinks: Snippets = {
  html: `<ds-pagination class="ds-pagination" data-current="4" data-total="10" data-href="?side=%d" aria-label="Bla i sider">
  <ol>
    <li><a class="ds-button" data-variant="tertiary">Forrige</a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary"></a></li>
    <li><a class="ds-button" data-variant="tertiary">Neste</a></li>
  </ol>
</ds-pagination>`,
  angular: `<!-- I komponenten: page = signal(4) -->
<ksd-pagination
  [current]="page()"
  total="10"
  href="?side=%d"
  (pageClicked)="page.set($event)"
/>`,
  react: `const [currentPage, setCurrentPage] = useState(4)
const { pages, prevButtonProps, nextButtonProps } = usePagination({
  currentPage,
  setCurrentPage,
  totalPages: 10,
  showPages: 7,
})

return (
  <Pagination aria-label="Bla i sider">
    <Pagination.List>
      <Pagination.Item>
        <Pagination.Button {...prevButtonProps}>Forrige</Pagination.Button>
      </Pagination.Item>
      {pages.map(({ page, itemKey, buttonProps }) => (
        <Pagination.Item key={itemKey}>
          {typeof page === 'number' && (
            <Pagination.Button asChild aria-label={\`Side \${page}\`} {...buttonProps}>
              <a href={\`?side=\${page}\`}>{page}</a>
            </Pagination.Button>
          )}
        </Pagination.Item>
      ))}
      <Pagination.Item>
        <Pagination.Button {...nextButtonProps}>Neste</Pagination.Button>
      </Pagination.Item>
    </Pagination.List>
  </Pagination>
)`,
}

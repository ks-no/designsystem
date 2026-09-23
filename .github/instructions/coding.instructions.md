---
applyTo: '**'
---

# General Coding Guidelines

## Package Manager

- Use `pnpm` for all package operations
- Global dev tools (vitest, vite, storybook) are in root `package.json`
- Use `catalog:` for shared dependency versions in workspace

## Code Style

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Keep functions small and focused

## Design System

- Use `ds-` prefix for CSS classes that come from upstream `@digdir/designsystemet-css`
- Use `ksd-` prefix for CSS classes we own, so ownership is visible in consumer markup

## Testing

- Use `vitest` for unit tests
- Use `@testing-library` for component tests
- Use `vi.fn()` for mocks
- Use `waitFor` for async assertions

## Visual snapshot tests

- Every new component needs one. Add a `<section>` with a unique `<h2>` title to the demo
  app (`apps/web-demo/index.html`, `apps/angular-demo`), then add that title to the
  `sections` array in the matching `*-e2e/src/app.spec.ts` — the spec screenshots one
  section per title
- CSS-only responsive behaviour needs a section per layout (e.g. full width and
  constrained), since the snapshot is taken at a single viewport
- Generate snapshots in Docker only: `pnpm e2e:web:update-snapshots` /
  `pnpm e2e:angular:update-snapshots`. Host-generated snapshots fail in CI because font
  rendering differs

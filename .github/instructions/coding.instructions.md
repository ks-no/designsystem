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

- Use `ds-` prefix for design system CSS classes

## Testing

- Use `vitest` for unit tests
- Use `@testing-library` for component tests
- Use `vi.fn()` for mocks
- Use `waitFor` for async assertions

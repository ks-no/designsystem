# Contributing

## Setup

Use the Node and pnpm versions in `package.json` (`engines` and
`packageManager`).

```bash
pnpm install
pnpm nx storybook www   # docs Storybook
```

Common commands, run per project or with `affected` as CI does:

```bash
pnpm nx test @ks-digital/designsystem-web
pnpm nx affected -t lint test build
pnpm nx format:write
pnpm e2e                # visual tests in Docker
```

## Repo layout

| Path                | What                                                      |
| ------------------- | --------------------------------------------------------- |
| `packages/themes`   | CSS and design tokens, on top of Designsystemet           |
| `packages/web`      | Framework-agnostic behaviour, plus docs for KS components |
| `packages/react`    | React components                                          |
| `packages/angular`  | Angular components                                        |
| `apps/www`          | The docs Storybook                                        |
| `apps/*-demo(-e2e)` | Demo apps and their Playwright tests                      |

## Adding a component

Use Designsystemet's component if it has one. Build our own only for needs it
doesn't cover.

Read [`packages/web/AGENTS.md`](packages/web/AGENTS.md) first: components start
from HTML that works without JavaScript, and scripts only add to it.

1. **CSS** in `packages/themes/src/ksd/<name>.css`, imported in
   `ksd/index.css`, inside `@layer ksd`.
2. **Behaviour**, if any, in `packages/web/src/<name>/<name>.ts`, exported from
   `src/index.ts`, with a `<name>.spec.ts`.
3. **Docs** next to it: `<name>.mdx`, `<name>.stories.ts` and
   `<name>.examples.ts`. Storybook in `apps/www` picks these up under
   "Komponenter". Docs are written in Norwegian.
4. **Visual test**: a `<section>` in `apps/web-demo/index.html` showing each
   state, with its `<h2>` added to `sections` in
   `apps/web-demo-e2e/src/app.spec.ts`. Generate the snapshots with
   `pnpm e2e:web:update-snapshots` (in Docker, so they match CI) and commit
   them.

`packages/web/src/copy-button/` has all of the above.

## Commits and pull requests

Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`,
`docs:` …). commitlint checks them, and the changelog is generated from them.

Fill in the PR template. CI runs format, lint, build, test and e2e on affected
projects.

## Releasing

On `main`, check the output with `--dry-run` first:

```bash
pnpm nx release --skip-publish --specifier prerelease --preid alpha --dry-run
```

This generates changelogs, bumps versions, pushes to `main`, and creates a git
tag and a GitHub release. The [publish pipeline](.github/workflows/publish.yml)
then publishes the packages to npm.

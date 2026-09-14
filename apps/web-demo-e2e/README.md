# web-demo-e2e

Visual snapshot tests for the `web-demo` app using Playwright. Snapshots are used to catch CSS regressions in the framework-agnostic web components when ran in a real browser.

## Running tests

From the repo root:

```sh
pnpm e2e:web
```

Use `pnpm e2e` to run this suite and `angular-demo-e2e` together.

## Updating snapshots

> Note: local snapshots will differ from CI due to OS rendering differences. Do not commit snapshots generated outside Docker
> Run this after intentional visual changes (e.g. a component style update or theme change):

```sh
pnpm e2e:web:update-snapshots
```

Use `pnpm e2e:update-snapshots` to update both this suite and `angular-demo-e2e`.

Then commit the updated files in `src/app.spec.ts-snapshots/`.

The container installs its own `node_modules` (it needs Linux binaries, not your host's), so
those directories are mounted as container-only volumes. If the cached root volume ever goes
stale after a dependency change, reset it with:

```sh
docker compose -f apps/web-demo-e2e/docker-compose.yml down -v
```

## Copy state snapshots

The `Copy Button States` section sets `data-copy-state` directly in markup so every state can be
captured without driving the clipboard, which is unavailable in the container.

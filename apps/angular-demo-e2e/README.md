# angular-demo-e2e

Visual snapshot tests for the `angular-demo` app using Playwright. Snapshots are used to catch CSS regressions when ran in an actual Angular app.

## Running tests

From the repo root:

```sh
pnpm e2e
```

## Updating snapshots

> Note: local snapshots will differ from CI due to OS rendering differences. Do not commit snapshots generated outside Docker
> Run this after intentional visual changes (e.g. a component style update or theme change):

```sh
pnpm e2e:update-snapshots
```

Then commit the updated files in `src/app.spec.ts-snapshots/`.

The container installs its own `node_modules` (it needs Linux binaries, not your host's), so
those directories are mounted as container-only volumes. If the cached root volume ever goes
stale after a dependency change, reset it with:

```sh
docker compose -f apps/angular-demo-e2e/docker-compose.yml down -v
```

## Local development (without Docker)

With a dev server already running on `http://localhost:4200`:

```sh
pnpm exec nx run angular-demo-e2e:e2e
```

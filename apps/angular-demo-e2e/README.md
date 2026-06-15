# angular-demo-e2e

Visual snapshot tests for the `angular-demo` app using Playwright. Snapshots are used to catch CSS regressions when ran in an actual Angular app.

## Running tests

```sh
docker compose run --rm e2e
```

## Updating snapshots

> Note: local snapshots will differ from CI due to OS rendering differences. Do not commit snapshots generated outside Docker
> Run this after intentional visual changes (e.g. a component style update or theme change):

```sh
docker compose run --rm update-snapshots
```

Then commit the updated files in `src/app.spec.ts-snapshots/`.

## Local development (without Docker)

With a dev server already running on `http://localhost:4200`:

```sh
pnpm exec nx run angular-demo-e2e:e2e
```

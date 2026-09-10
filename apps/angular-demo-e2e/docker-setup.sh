#!/bin/sh
set -eu

corepack enable
corepack prepare --activate
pnpm install --frozen-lockfile
pnpm exec nx run angular-demo:build

exec "$@"

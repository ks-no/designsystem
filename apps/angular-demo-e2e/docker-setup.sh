#!/bin/sh
set -eu

corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm install --frozen-lockfile
pnpm exec nx run angular-demo:build

exec "$@"

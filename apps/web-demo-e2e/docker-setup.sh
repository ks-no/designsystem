#!/bin/sh
set -eu

corepack enable
corepack prepare --activate
pnpm install --frozen-lockfile
pnpm exec nx run web-demo:build

exec "$@"

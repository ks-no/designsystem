#!/usr/bin/env bash

set -Eeuo pipefail

# Always run from the package root regardless of where the script is invoked from
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PACKAGE_DIR}"

# Clean and prepare output directories
rimraf dist || true
mkdir -p dist dist/themes

# Build base styles
postcss src/base.css -o dist/base.css
postcss src/base.tailwind.css -o dist/base.tailwind.css

# Copy theme css files
cp -a src/themes/. dist/themes/

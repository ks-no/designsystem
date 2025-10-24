# Designsystem for KS Digital

The KS Digital Designsystem builds upon [Designsystemet from Digdir](https://www.designsystemet.no/).

## 💡 Philosophy

Our goal is to align closely with the components and design decisions of Designsystemet while maintaining a set of custom components that address the unique requirements of our projects. This approach ensures consistency with established standards while allowing flexibility for customization.

## 📦 Packages

[`@ks-digital/designsystem-themes`](https://www.npmjs.com/package/@ks-digital/designsystem-themes) - Themes officially supported.

[`@ks-digital/designsystem-react`](https://www.npmjs.com/package/@ks-digital/designsystem-react) - React implementation of components

[`@ks-digital/designsystem-angular`](https://www.npmjs.com/package/@ks-digital/designsystem-angular) - Angular implementation of components (Very WIP)

## 🚀 Release and Publishing

### Prerequisites

On the main branch, run the following command. Confirm the output with `dry-run`-flag first.

```bash
pnpm nx release --skip-publish --specifier prerelease --preid alpha --dry-run
```

This will do the following:

- Generate changelogs based on conventional commits.
- Perform a semantic version bump. Note: This command will not push the package to Github packages.
- Push the release to main and create a git tag and a Github release

The [publish pipeline](.github/workflows/publish.yml) will automatically detect the new release and publish the packages.

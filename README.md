# Designsystem for KS Digital

The KS Digital Designsystem builds upon [Designsystemet from Digdir](https://www.designsystemet.no/).

## 💡 Philosophy

Our goal is to align closely with the components and design decisions of Designsystemet while maintaining a set of custom components that address the unique requirements of our projects. This approach ensures consistency with established standards while allowing flexibility for customization.

## 📦 Packages

[`@ks-digital/designsystem-themes`](httpshttps://www.npmjs.com/package/@ks-digital/designsystem-themes) - Themes officially supported.

[`@ks-digital/designsystem-react`](httpshttps://www.npmjs.com/package/@ks-digital/designsystem-react) - React implementation of components

## 🚀 Release and Publishing

### Prerequisites

1. Run the following command from a machine with access to publish on NPM. Confirm the output with `dry-run`-flag first.

```bash
pnpm nx release --skip-publish --specifier prerelease --preid alpha --dry-run
```

This will:

- Create a local Git tag for the release.
- Generate changelogs based on conventional commits.
- Perform a semantic version bump. Note: This command will not push the package to NPM.

2. Push to the remote repository, including the new version tag:

```bash
git push origin main --follow-tags
```

3. The [publish pipeline](.github/workflows/publish.yml) will automatically detect the new release and publish the packages to the NPM registry.

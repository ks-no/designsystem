# Designsystem KS Digital

Our designsystem extends [Designsystemet from Digdir](https://www.designsystemet.no/).

## Release and Publishing

Prerequisites: You need special access to do this

1. Run the following command from a machine with access to publish on NPM:
   ```bash
   nx release --skip-publish
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

# Designsystem for KS Digital

The KS Digital Designsystem builds upon [Designsystemet from Digdir](https://www.designsystemet.no/).

## 💡 Philosophy

Our goal is to align closely with the components and design decisions of Designsystemet while maintaining a set of custom components that address the unique requirements of our projects. This approach ensures consistency with established standards while allowing flexibility for customization.

The web package is built with progressive enhancement: components start from HTML that works without JavaScript, and scripts only add to it. Read [`packages/web/AGENTS.md`](packages/web/AGENTS.md) before building or changing a component there.

## 📦 Packages

The Themes and React packages are considered stable. The Angular package is in active development and may introduce breaking changes as it evolves toward web component integration.

[`@ks-digital/designsystem-themes`](https://www.npmjs.com/package/@ks-digital/designsystem-themes) - Themes officially supported.

[`@ks-digital/designsystem-web`](https://www.npmjs.com/package/@ks-digital/designsystem-web) - Framework-agnostic components

[`@ks-digital/designsystem-react`](https://www.npmjs.com/package/@ks-digital/designsystem-react) - React implementation of components

[`@ks-digital/designsystem-angular`](https://www.npmjs.com/package/@ks-digital/designsystem-angular) - Angular implementation of components

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, how to add a component, and how to release.

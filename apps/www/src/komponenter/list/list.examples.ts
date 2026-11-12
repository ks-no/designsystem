import type { Imports, Snippets } from '@internal/storybook/snippets'

export const imports: Imports = {
  react: `import { List } from '@ks-digital/designsystem-react'`,
}

export const preview: Snippets = {
  html: `<ul class="ds-list">
  <li>Situasjonskart</li>
  <li>Tegninger av tiltaket</li>
  <li>Nabovarsel</li>
</ul>`,
  angular: `<ul class="ds-list">
  <li>Situasjonskart</li>
  <li>Tegninger av tiltaket</li>
  <li>Nabovarsel</li>
</ul>`,
  react: `<List.Unordered>
  <List.Item>Situasjonskart</List.Item>
  <List.Item>Tegninger av tiltaket</List.Item>
  <List.Item>Nabovarsel</List.Item>
</List.Unordered>`,
}

export const ordered: Snippets = {
  html: `<ol class="ds-list">
  <li>Fyll ut søknaden</li>
  <li>Last opp vedlegg</li>
  <li>Send inn og få kvittering på e-post</li>
</ol>`,
  angular: `<ol class="ds-list">
  <li>Fyll ut søknaden</li>
  <li>Last opp vedlegg</li>
  <li>Send inn og få kvittering på e-post</li>
</ol>`,
  react: `<List.Ordered>
  <List.Item>Fyll ut søknaden</List.Item>
  <List.Item>Last opp vedlegg</List.Item>
  <List.Item>Send inn og få kvittering på e-post</List.Item>
</List.Ordered>`,
}

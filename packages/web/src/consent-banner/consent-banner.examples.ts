import { el, htmlSnippets } from '@internal/storybook/markup'

export type ConsentBannerArgs = {
  heading: string
  description: string
  linkText: string
  acceptLabel: string
  declineLabel: string
}

// Pure CSS: the same markup in every framework
export const preview = ({
  heading,
  description,
  linkText,
  acceptLabel,
  declineLabel,
}: ConsentBannerArgs) =>
  htmlSnippets(
    el(
      'section.ksd-consent-banner',
      { 'aria-labelledby': 'samtykkebanner-tittel' },
      el(
        'div.ksd-consent-banner__content',
        {},
        el(
          'h2.ds-heading',
          { 'data-size': 'md', id: 'samtykkebanner-tittel' },
          heading,
        ),
        el(
          'p.ds-paragraph',
          {},
          description,
          el('a.ds-link', { href: '#personvern' }, linkText),
        ),
        // Accept and decline must look the same: same variant and size
        el(
          'div.ksd-consent-banner__actions',
          {},
          el('button.ds-button', { type: 'button' }, acceptLabel),
          el('button.ds-button', { type: 'button' }, declineLabel),
        ),
        el(
          'p.ds-paragraph.ksd-consent-banner__footnote',
          { 'data-size': 'sm' },
          el(
            'a.ds-link',
            { href: '#nodvendig' },
            'Vi lagrer også nødvendig informasjon',
          ),
          'som ikke kan velges bort. Dette gjør at nettsiden fungerer og er trygg.',
        ),
      ),
    ),
  )

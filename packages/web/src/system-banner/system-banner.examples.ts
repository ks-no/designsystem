import { el, htmlSnippets, type Node } from '@internal/storybook/markup'

export type SystemBannerArgs = {
  color: 'info' | 'warning' | 'success' | 'danger'
  text: string
  linkText: string
  closable: boolean
}

const banner = ({ color, text, linkText, closable }: SystemBannerArgs): Node =>
  el(
    'div.ksd-system-banner',
    { 'data-color': color },
    el(
      'div.ksd-system-banner__content',
      {},
      el(
        'p.ds-paragraph.ksd-system-banner__text',
        {},
        text,
        linkText && el('a.ds-link', { href: '#support' }, linkText),
      ),
      // Optional, and a no-op: you add the closing behaviour yourself
      closable &&
        el('button.ds-button.ksd-system-banner__close', {
          type: 'button',
          'data-variant': 'tertiary',
          'data-icon': true,
          'aria-label': 'Lukk melding',
        }),
    ),
  )

// Pure CSS: the same markup in every framework
export const preview = (args: SystemBannerArgs) => htmlSnippets(banner(args))

export const variants = (args: SystemBannerArgs) =>
  htmlSnippets(
    banner({
      ...args,
      color: 'danger',
      text: 'Alle systemene våre er nede nå, men vi jobber med å få løst opp i floken.',
    }),
    banner({
      ...args,
      color: 'warning',
      text: 'Vi har litt teknisk krøll akkurat nå, men jobber med å få løst opp i floken.',
    }),
    banner({
      ...args,
      color: 'success',
      text: 'Alle systemene våre er oppe og går!',
      linkText: '',
    }),
    banner({
      ...args,
      color: 'info',
      text: 'Her kommer en informativ statusoppdatering fra systemet.',
      linkText: 'Sjekk mer opp i dette her',
    }),
  )

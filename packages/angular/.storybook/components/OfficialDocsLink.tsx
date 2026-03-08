interface Props {
  href: string
  label?: string
}

export function OfficialDocsLink({ href, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="official-docs"
    >
      <span aria-hidden="true">📖</span>{' '}
      {label ?? 'Besøk Digdir sin dokumentasjon'}
    </a>
  )
}

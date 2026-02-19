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
      📖 {label ?? 'Besøk Digdir dokumentasjon'}
    </a>
  )
}

interface Props {
  href: string
  component: string
}

export function OfficialDocsLink({ href }: Props) {
  return (
    <div className="ds-alert">
      Retningslinjer for komponenten finnes på Designsystemet.no. Denne siden
      inneholder kun Angular-spesifikk informasjon for å unngå duplikat
      dokumentasjon. <br />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="official-docs"
      >
        <span aria-hidden="true">📖</span> {`Besøk Digdir sin dokumentasjon`}
      </a>
    </div>
  )
}

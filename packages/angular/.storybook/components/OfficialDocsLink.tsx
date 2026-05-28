interface Props {
  href: string
  component: string
}

export function OfficialDocsLink({ href, component }: Props) {
  return (
    <div className="sb-unstyled ds-alert">
      <h2
        className="sb-unstyled ds-heading"
        data-size="sm"
        style={{
          paddingBottom: 'var(--ds-size-2) !important',
        }}
      >
        Om dokumentasjonen for {component}
      </h2>
      Retningslinjer for komponenten finnes på Designsystemet.no. Denne siden
      inneholder kun Angular-spesifikk informasjon for å unngå duplikat
      dokumentasjon. <br />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="sb-unstyled ds-link"
      >
        <span aria-hidden="true">📖</span> {`Besøk Digdir sin dokumentasjon`}
      </a>
    </div>
  )
}

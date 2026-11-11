import { useEffect, useState, type ReactNode } from 'react'
import { SyntaxHighlighter } from 'storybook/internal/components'
import { convert, ThemeProvider, themes } from 'storybook/theming'
import { Icon, type IconName } from './icons'

// Styles live in ../docs.css
const lightTheme = convert(themes.light)

const codeStyle = {
  margin: 0,
  fontSize: 13,
  background: 'transparent',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      className="ds-button"
      data-variant="tertiary"
      data-color="support1"
      data-size="sm"
      onClick={() =>
        navigator.clipboard.writeText(text).then(() => setCopied(true))
      }
    >
      <Icon name={copied ? 'check' : 'copy'} />
      {copied ? 'Kopiert' : 'Kopier'}
      <span className="ds-sr-only" aria-live="polite">
        {copied ? ' til utklippstavlen' : ''}
      </span>
    </button>
  )
}

/** A non-interactive label in the header, e.g. "HTML" when there's nothing to choose */
export function CodeLabel({
  icon,
  children,
}: {
  icon?: IconName
  children: ReactNode
}) {
  return (
    <span className="ksd-code__label">
      {icon && <Icon name={icon} />}
      {children}
    </span>
  )
}

export interface CodeSection {
  code: string
  /** Language for syntax highlighting */
  language: string
}

interface Props {
  /** Left side of the header: the framework toggle or a label */
  header?: ReactNode
  /** One or more code sections (e.g. imports, then markup), separated by a line */
  sections: CodeSection[]
}

/** The frame around all code on the docs pages: header with Copy, then the code */
export function CodeFrame({ header, sections }: Props) {
  const all = sections.map((s) => s.code).join('\n\n')

  return (
    // The docs page is always light, so the frame is pinned to light too
    <div className="sb-unstyled ksd-code" data-color-scheme="light">
      <div className="ksd-code__header">
        {header ?? <span />}
        <CopyButton text={all} />
      </div>
      <ThemeProvider theme={lightTheme}>
        {sections.map((section, index) => (
          <div className="ksd-code__section" key={index}>
            <SyntaxHighlighter
              language={section.language}
              copyable={false}
              padded
              customStyle={codeStyle}
            >
              {section.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </ThemeProvider>
    </div>
  )
}

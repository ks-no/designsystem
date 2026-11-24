import { CodeOrSourceMdx } from '@storybook/addon-docs/blocks'
import type { ComponentProps, ReactNode } from 'react'
import { CodeFrame, CodeLabel } from './CodeFrame'
import type { IconName } from './icons'

/** Header label per fence language (```html). Unknown languages get no label. */
const LABELS: Record<string, { label: string; icon?: IconName }> = {
  html: { label: 'HTML', icon: 'html' },
  bash: { label: 'Terminal', icon: 'terminal' },
  sh: { label: 'Terminal', icon: 'terminal' },
  css: { label: 'CSS' },
  scss: { label: 'SCSS' },
  js: { label: 'JavaScript' },
  javascript: { label: 'JavaScript' },
  ts: { label: 'TypeScript' },
  typescript: { label: 'TypeScript' },
  tsx: { label: 'TSX' },
  json: { label: 'JSON' },
}

/**
 * Replaces Storybook's `code` for MDX (`parameters.docs.components`), so fenced code
 * blocks get the same frame as `CodeBlock`. Inline `code` is left to Storybook.
 */
export function MdxCode(props: ComponentProps<typeof CodeOrSourceMdx>) {
  const { className, children } = props
  const language = /language-(\w+)/.exec(className ?? '')?.[1]
  // Same test as Storybook: a fence has a language or spans several lines
  const isBlock =
    typeof children === 'string' && (!!language || /[\n\r]/.test(children))
  if (!isBlock) return <CodeOrSourceMdx {...props} />

  const label = language ? LABELS[language] : undefined
  return (
    <CodeFrame
      header={label && <CodeLabel icon={label.icon}>{label.label}</CodeLabel>}
      sections={[{ code: children.trimEnd(), language: language ?? 'text' }]}
    />
  )
}

/** MDX wraps fences in `pre`; the frame has its own, so drop the outer one */
export function MdxPre({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

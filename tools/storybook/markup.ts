/**
 * Write an example once, get the HTML, Angular and React code.
 *
 * Most components follow the same pattern: a Digdir class in HTML, a `ksd-*` element or
 * attribute in Angular, and a component in React. Describe each component once with
 * {@link component}, build the example as a tree, and {@link snippets} renders it for
 * all three frameworks:
 *
 * ```ts
 * const Tag = component({ html: 'span.ds-tag', angular: 'ksd-tag', react: 'Tag',
 *   reactProps: { 'data-variant': 'variant' } })
 *
 * snippets(Tag({ 'data-variant': 'outline' }, 'Ny'))
 * // html:    <span class="ds-tag" data-variant="outline">Ny</span>
 * // angular: <ksd-tag data-variant="outline">Ny</ksd-tag>
 * // react:   <Tag variant="outline">Ny</Tag>
 * ```
 *
 * When something differs between frameworks, use {@link per} for that attribute or child.
 * Like `snippets.ts`, this file has no Storybook imports.
 */
import {
  FRAMEWORKS,
  escapeAttr,
  indent,
  text,
  type Framework,
  type HtmlSnippets,
  type Snippets,
} from './snippets'

type Scalar = string | number | boolean | null | undefined

/** A JavaScript expression: `{value}` in React, `"value"` elsewhere */
interface Expr {
  readonly kind: 'expr'
  readonly code: string
}

/** Markup inserted as is (icons, comments). Not escaped. */
interface Raw {
  readonly kind: 'raw'
  readonly code: string
}

/** Different values per framework. Frameworks left out get nothing. */
interface PerFramework<T> {
  readonly kind: 'per'
  readonly values: Partial<Record<Framework, T>>
}

export interface Node {
  readonly kind: 'node'
  readonly render: (framework: Framework) => string
}

export type AttrValue = Scalar | Expr
export type Attrs = Record<string, AttrValue | PerFramework<AttrValue>>
export type PlainChild = Node | Raw | string | null | undefined | false
export type Child = PlainChild | PerFramework<PlainChild>

/** `per({ angular: 'x', react: 'y' })`: an attribute value or child that differs per framework */
export const per = <T>(
  values: Partial<Record<Framework, T>>,
): PerFramework<T> => ({ kind: 'per', values })

/** `expr('() => setOpen(true)')`: a JSX expression for a React prop */
export const expr = (code: string): Expr => ({ kind: 'expr', code })

/** Markup inserted as is, e.g. an SVG icon */
export const raw = (code: string): Raw => ({ kind: 'raw', code })

const isPer = (value: unknown): value is PerFramework<unknown> =>
  typeof value === 'object' && value !== null && 'kind' in value
    ? value.kind === 'per'
    : false

function resolve<T>(value: T | PerFramework<T>, framework: Framework) {
  return isPer(value) ? value.values[framework] : value
}

const VOID = new Set([
  'area',
  'br',
  'col',
  'hr',
  'img',
  'input',
  'link',
  'source',
])

/** HTML attribute names React spells differently */
const REACT_ATTR: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  minlength: 'minLength',
  autocomplete: 'autoComplete',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  popovertarget: 'popoverTarget',
  popovertargetaction: 'popoverTargetAction',
  enterkeyhint: 'enterKeyHint',
  inputmode: 'inputMode',
}

const MAX_INLINE = 80

function attrString(
  attrs: Attrs,
  framework: Framework,
  rename: Record<string, string> = {},
): string {
  return Object.entries(attrs)
    .map(([name, value]) => [name, resolve(value, framework)] as const)
    .filter(
      (entry): entry is readonly [string, string | number | true | Expr] =>
        entry[1] !== false && entry[1] != null && entry[1] !== '',
    )
    .map(([name, value]) => {
      const key =
        rename[name] ??
        (framework === 'react' ? (REACT_ATTR[name] ?? name) : name)
      if (value === true) return ` ${key}`
      if (typeof value === 'object') {
        return framework === 'react'
          ? ` ${key}={${value.code}}`
          : ` ${key}="${escapeAttr(value.code)}"`
      }
      if (framework === 'react' && typeof value === 'number') {
        return ` ${key}={${value}}`
      }
      return ` ${key}="${escapeAttr(String(value))}"`
    })
    .join('')
}

function renderChild(child: Child, framework: Framework): string | null {
  const value = resolve(child, framework)
  if (value === false || value == null || value === '') return null
  if (typeof value === 'string') return text(value)
  if (value.kind === 'raw') return value.code
  return value.render(framework)
}

interface Selector {
  tag: string
  classes: string[]
  /** Bare attributes, e.g. `ksd-button` in `button[ksd-button]` */
  flags: string[]
}

/** `'button.ds-button'`, `'button[ksd-button]'`, `'Tabs.List'` (React: kept whole) */
function parse(selector: string, react = false): Selector {
  if (react) return { tag: selector, classes: [], flags: [] }
  const flags = [...selector.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1])
  const [tag, ...classes] = selector.replace(/\[[^\]]+\]/g, '').split('.')
  return { tag, classes, flags }
}

function element(
  selector: Selector,
  attrs: Attrs,
  children: Child[],
  framework: Framework,
  rename?: Record<string, string>,
): string {
  const { tag, classes, flags } = selector
  // Classes from the selector come first, then any `class` passed in
  const { class: extra, ...rest } = attrs
  const className = [...classes, resolve(extra, framework)]
    .filter(Boolean)
    .join(' ')
  const all: Attrs = {
    ...Object.fromEntries(flags.map((f) => [f, true])),
    class: className,
    ...rest,
  }
  const open = `<${tag}${attrString(all, framework, rename)}`
  const parts = children
    .map((c) => renderChild(c, framework))
    .filter((c): c is string => c !== null)

  if (parts.length === 0) {
    if (framework === 'react' || VOID.has(tag)) return `${open} />`
    return `${open}></${tag}>`
  }
  const inline = `${open}>${parts.join('')}</${tag}>`
  const onlyText = children.every((c) => {
    const v = resolve(c, framework)
    return typeof v === 'string' || !v
  })
  if (onlyText && !inline.includes('\n') && inline.length <= MAX_INLINE) {
    return inline
  }
  return `${open}>\n${indent(parts.join('\n'))}\n</${tag}>`
}

export interface ComponentSpec {
  /** HTML tag and classes, e.g. `'span.ds-tag'` or `'ds-tabs.ds-tabs'` */
  html: string
  /**
   * Angular: an element (`'ksd-tag'`) or a native element with an attribute selector
   * (`'button[ksd-button]'`). The Angular component adds the Digdir class itself.
   * Leave out when Angular uses the plain HTML.
   */
  angular?: string
  /** React component, e.g. `'Tag'` or `'Tabs.List'`. Leave out to use the plain HTML. */
  react?: string
  /** React prop names where they differ from the attribute, e.g. `{ 'data-variant': 'variant' }` */
  reactProps?: Record<string, string>
  /** Angular input names where they differ from the attribute, e.g. `{ 'data-variant': 'variant' }` */
  angularProps?: Record<string, string>
}

export type Component = (attrs?: Attrs, ...children: Child[]) => Node

/** Describe a component once; call the result to use it in an example */
export function component(spec: ComponentSpec): Component {
  const html = parse(spec.html)
  const angular = spec.angular ? parse(spec.angular) : html
  const react = spec.react ? parse(spec.react, true) : html
  return (attrs = {}, ...children) => ({
    kind: 'node',
    render: (framework) => {
      if (framework === 'html') return element(html, attrs, children, framework)
      if (framework === 'angular') {
        // The Angular component adds the class, unless it's the plain HTML
        if (!spec.angular) return element(html, attrs, children, framework)
        return element(angular, attrs, children, framework, spec.angularProps)
      }
      return element(react, attrs, children, framework, spec.reactProps)
    },
  })
}

/** A plain element, the same in every framework (`class` becomes `className` in React) */
export function el(selector: string, attrs: Attrs = {}, ...children: Child[]) {
  return component({ html: selector })(attrs, ...children)
}

/** Several elements side by side: a fragment in React */
function renderAll(children: Child[], framework: Framework): string {
  const parts = children
    .map((c) => renderChild(c, framework))
    .filter((c): c is string => c !== null)
  if (framework === 'react' && parts.length > 1) {
    return `<>\n${indent(parts.join('\n'))}\n</>`
  }
  return parts.join('\n')
}

/** Render an example for all three frameworks */
export function snippets(...children: Child[]): Snippets {
  return Object.fromEntries(
    FRAMEWORKS.map((f) => [f.id, renderAll(children, f.id)]),
  ) as Snippets
}

/** Render an example that's the same in every framework (plain HTML, web components) */
export function htmlSnippets(...children: Child[]): HtmlSnippets {
  return { html: renderAll(children, 'html') }
}

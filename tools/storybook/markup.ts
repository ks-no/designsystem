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

/** An attribute with an empty value: `value=""` */
interface Empty {
  readonly kind: 'empty'
}

/** Markup inserted as is (icons, comments). Not escaped; adjusted for JSX in React. */
interface Raw {
  readonly kind: 'raw'
  readonly code: string
}

/**
 * Inline styles, with camelCase or kebab-case keys: `{ maxHeight: '15rem' }` becomes
 * `style="max-height: 15rem"` in HTML/Angular and `style={{ maxHeight: '15rem' }}` in React.
 */
export type Style = { readonly [property: string]: string | number }

export interface Node {
  readonly kind: 'node'
  readonly render: (framework: Framework) => string
}

export type AttrValue = Scalar | Expr | Empty | Style
export type PlainChild = Node | Raw | string | null | undefined | false

type PerValues = Partial<
  Record<Framework | 'default', AttrValue | PlainChild | PerFramework>
>

/** Different values per framework, see {@link per}. Values can be nested `per()`s. */
interface PerFramework {
  readonly kind: 'per'
  readonly values: PerValues
}

export type Attrs = Record<string, AttrValue | PerFramework>
export type Child = PlainChild | PerFramework

/**
 * An attribute value or child that differs per framework. Frameworks you leave out get
 * `default`, or nothing:
 *
 * ```ts
 * { type: per({ html: 'button' }) }                     // only in HTML
 * per({ react: Tooltip({ content }, button), default: button }) // a wrapper only in React
 * ```
 */
export const per = (values: PerValues): PerFramework => ({
  kind: 'per',
  values,
})

/** `expr('() => setOpen(true)')`: a JSX expression for a React prop */
export const expr = (code: string): Expr => ({ kind: 'expr', code })

/** `{ value: EMPTY }` renders `value=""` (an empty string leaves the attribute out) */
export const EMPTY: Empty = { kind: 'empty' }

/** Markup inserted as is, e.g. an SVG icon. In React, attribute names are made JSX-safe. */
export const raw = (code: string): Raw => ({ kind: 'raw', code })

const hasKind = (value: unknown): value is { kind: string } =>
  typeof value === 'object' && value !== null && 'kind' in value

function resolve<T>(value: T | PerFramework, framework: Framework) {
  if (!hasKind(value) || value.kind !== 'per') return value as T
  const { values } = value as PerFramework
  // Resolved again, so per() can be nested
  return resolve<T>(
    (framework in values ? values[framework] : values.default) as T,
    framework,
  )
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

/** Lines longer than this are wrapped, one attribute per line */
const MAX_LINE = 80

const camel = (name: string) =>
  name.replace(/[-:]([a-z])/g, (_, c: string) => c.toUpperCase())
const kebab = (name: string) =>
  name.startsWith('--')
    ? name
    : name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

/** JSX attribute name for an HTML/SVG one: `stroke-width` → `strokeWidth` */
function jsxName(name: string): string {
  if (REACT_ATTR[name]) return REACT_ATTR[name]
  if (/^(aria|data)-/.test(name)) return name
  return name.includes('-') || name.includes(':') ? camel(name) : name
}

function styleString(style: Style, framework: Framework): string {
  const entries = Object.entries(style)
  if (framework !== 'react') {
    return entries.map(([k, v]) => `${kebab(k)}: ${v}`).join('; ')
  }
  const props = entries.map(([k, v]) => {
    const key = k.startsWith('--') ? `'${k}'` : camel(k)
    return `${key}: ${typeof v === 'number' ? v : `'${v}'`}`
  })
  return `{ ${props.join(', ')} }`
}

/** The attributes of one element, e.g. `['class="ds-tag"', 'data-size="sm"']` */
function attrList(
  attrs: Attrs,
  framework: Framework,
  rename: Record<string, string> = {},
): string[] {
  return Object.entries(attrs).flatMap(([name, input]) => {
    const value = resolve<AttrValue | PlainChild>(input, framework)
    if (value === false || value == null || value === '') return []
    const key = rename[name] ?? (framework === 'react' ? jsxName(name) : name)
    if (value === true) return [key]
    if (typeof value === 'number') {
      return [framework === 'react' ? `${key}={${value}}` : `${key}="${value}"`]
    }
    if (typeof value === 'string') return [`${key}="${escapeAttr(value)}"`]
    if (!hasKind(value)) {
      const css = styleString(value, framework)
      return [framework === 'react' ? `${key}={${css}}` : `${key}="${css}"`]
    }
    switch (value.kind) {
      case 'empty':
        return [`${key}=""`]
      case 'expr': {
        const { code } = value as Expr
        return [
          framework === 'react'
            ? `${key}={${code}}`
            : `${key}="${escapeAttr(code)}"`,
        ]
      }
      default:
        throw new Error(`markup: "${name}" can't be a ${value.kind}`)
    }
  })
}

/** Raw markup in JSX: React attribute names, and comments as `{/* … *\/}` */
function jsx(code: string): string {
  return code
    .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
    .replace(
      /<([A-Za-z][\w.-]*)(\s[^<>]*?)?(\/?)>/g,
      (_, tag, attrs = '', end) =>
        `<${tag}${attrs.replace(/(\s)([A-Za-z_:][-\w:.]*)(?==)/g, (_m: string, space: string, n: string) => space + jsxName(n))}${end}>`,
    )
}

function renderChild(child: Child, framework: Framework): string | null {
  const value = resolve<AttrValue | PlainChild>(child, framework)
  if (value === false || value == null || value === '') return null
  if (typeof value === 'string') return text(value)
  if (typeof value === 'number') return String(value)
  if (hasKind(value) && value.kind === 'raw') {
    const { code } = value as Raw
    return framework === 'react' ? jsx(code) : code
  }
  if (hasKind(value) && value.kind === 'node') {
    return (value as Node).render(framework)
  }
  throw new Error(`markup: a child can't be ${JSON.stringify(value)}`)
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
  const list = attrList(
    {
      ...Object.fromEntries(flags.map((f) => [f, true])),
      class: className,
      ...rest,
    },
    framework,
    rename,
  )
  const parts = children
    .map((c) => renderChild(c, framework))
    .filter((c): c is string => c !== null)
  const selfClosing =
    parts.length === 0 && (framework === 'react' || VOID.has(tag))

  // Like Prettier: one attribute per line when the tag gets too long
  const oneLine = `<${tag}${list.map((a) => ` ${a}`).join('')}`
  const wrap = list.length > 1 && oneLine.length + 3 > MAX_LINE
  const open = wrap ? `<${tag}\n${indent(list.join('\n'))}\n` : oneLine
  if (selfClosing) return wrap ? `${open}/>` : `${open} />`
  if (parts.length === 0) return `${open}></${tag}>`

  const inline = `${open}>${parts.join('')}</${tag}>`
  const onlyText = children.every((c) => {
    const v = resolve<AttrValue | PlainChild>(c, framework)
    return typeof v === 'string' || typeof v === 'number' || !v
  })
  if (
    !wrap &&
    onlyText &&
    !inline.includes('\n') &&
    inline.length <= MAX_LINE
  ) {
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

/**
 * Text and elements on one line, with no line breaks added between them. Use it for
 * elements inside a sentence: `inline('Les mer om ', Link({ href }, 'søknaden'), '.')`.
 */
export function inline(...children: Child[]): Node {
  return {
    kind: 'node',
    render: (framework) =>
      children
        .map((c) => renderChild(c, framework))
        .filter((c): c is string => c !== null)
        .join(''),
  }
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

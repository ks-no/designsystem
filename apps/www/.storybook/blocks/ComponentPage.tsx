import type { KsdDocsParameters } from '@internal/storybook/docs-parameters'
import {
  Canvas,
  Controls,
  DocsContext,
  Heading,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks'
import { useContext } from 'react'
import { AngularApi } from './AngularApi'
import { CodeBlock } from './CodeBlock'
import { ComponentHeader } from './ComponentHeader'
import { ComponentOrigin } from './ComponentOrigin'

/**
 * Default docs page for component stories tagged `autodocs`: header, the first story with
 * Controls, then every story with its code. Write an MDX page instead when the component
 * needs prose, using the same blocks.
 */
export function ComponentPage() {
  const { componentStories } = useContext(DocsContext)
  // Stories tagged `!autodocs` stay in the sidebar but not on this page
  const [primary, ...rest] = componentStories().filter((story) =>
    story.tags?.includes('autodocs'),
  )

  return (
    <>
      <Title />
      <ComponentHeader of="meta" />
      {primary && (
        <>
          <Canvas of={primary.moduleExport} />
          <Controls of={primary.moduleExport} />
          <CodeBlock of={primary.moduleExport} />
        </>
      )}
      {rest.map((story) => (
        <section key={story.id}>
          <Heading>{story.name}</Heading>
          <Canvas of={story.moduleExport} />
          <CodeBlock of={story.moduleExport} hideImports />
        </section>
      ))}
      <AngularApiSection />
      <ComponentOrigin of="meta" />
    </>
  )
}

function AngularApiSection() {
  const { preparedMeta } = useOf('meta', ['meta'])
  const ksd = preparedMeta.parameters['ksd'] as KsdDocsParameters | undefined
  if (!ksd?.angularApi?.length) return null
  return (
    <>
      <Heading>Angular API</Heading>
      <AngularApi of="meta" />
    </>
  )
}

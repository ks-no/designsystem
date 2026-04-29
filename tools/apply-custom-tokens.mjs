#!/usr/bin/env node

/**
 * Applies KS-specific token aliases that are not supported directly by the
 * upstream Designsystemet theme generator.
 *
 
 * Usage:
 *   node ./tools/apply-custom-tokens.mjs [tokens|outputs]
 *
 * Modes:
 *   tokens   patches generated semantic token JSON in design-tokens/semantic
 *   outputs  patches generated theme CSS files in packages/themes/src/themes
 */

// Supported key -> Our alias
const aliasMap = {
  'text-subtle': ['icon-subtle'],
}

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const semanticTokensDir = join(repoRoot, 'design-tokens', 'semantic')
const themesDir = join(repoRoot, 'packages', 'themes', 'src', 'themes')
const mode = process.argv[2]

const cloneTokenForAlias = (value, sourceKey, aliasKey) => {
  const clone = JSON.parse(JSON.stringify(value))

  if (typeof clone.$value === 'string') {
    clone.$value = clone.$value.replace(
      new RegExp(`\\.${sourceKey}(?=})`, 'g'),
      `.${aliasKey}`,
    )
  }

  return clone
}

const areEqual = (left, right) => {
  return JSON.stringify(left) === JSON.stringify(right)
}

const isTokenObject = (value) => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    ('$type' in value || '$value' in value)
  )
}

const applyAliases = (value) => {
  if (Array.isArray(value)) {
    return value.reduce((count, item) => count + applyAliases(item), 0)
  }

  if (!value || typeof value !== 'object') {
    return 0
  }

  let changes = 0

  for (const [sourceKey, aliasKeys] of Object.entries(aliasMap)) {
    const sourceValue = value[sourceKey]

    if (!isTokenObject(sourceValue)) {
      continue
    }

    const snapshot = Object.entries(value)
    let inserted = 0

    for (const aliasKey of aliasKeys) {
      const nextAliasValue = cloneTokenForAlias(
        sourceValue,
        sourceKey,
        aliasKey,
      )

      if (!(aliasKey in value)) {
        inserted += 1
        changes += 1
        value[aliasKey] = nextAliasValue
        continue
      }

      if (!areEqual(value[aliasKey], nextAliasValue)) {
        changes += 1
        value[aliasKey] = nextAliasValue
      }
    }

    if (inserted > 0) {
      const reordered = {}

      for (const [key, entryValue] of snapshot) {
        reordered[key] = entryValue

        if (key === sourceKey) {
          for (const aliasKey of aliasKeys) {
            if (aliasKey in value) {
              reordered[aliasKey] = value[aliasKey]
            }
          }
        }
      }

      for (const key of Object.keys(value)) {
        delete value[key]
      }

      Object.assign(value, reordered)
    }
  }

  for (const child of Object.values(value)) {
    changes += applyAliases(child)
  }

  return changes
}

const collectJsonFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        return collectJsonFiles(entryPath)
      }

      return entry.name.endsWith('.json') ? [entryPath] : []
    }),
  )

  return files.flat()
}

const collectCssFiles = async (directory, filter) => {
  try {
    const entries = await readdir(directory, { withFileTypes: true })

    return entries
      .filter((entry) => entry.isFile() && filter(entry.name))
      .map((entry) => join(directory, entry.name))
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

const collectTailwindFiles = (directory) =>
  collectCssFiles(directory, (name) => name.endsWith('.tailwind.css'))

const collectThemeCssFiles = (directory) =>
  collectCssFiles(
    directory,
    (name) => name.endsWith('.css') && !name.endsWith('.tailwind.css'),
  )

const applyThemeAliases = (content) => {
  const lines = content.split('\n')
  const nextLines = []
  let changed = false

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    nextLines.push(line)

    for (const [sourceKey, aliasKeys] of Object.entries(aliasMap)) {
      const sourceLineMatch = line.match(
        new RegExp(
          `^(\\s*)--ds-color-${sourceKey}: var\\(--ds-color-([a-z0-9-]+)-${sourceKey}\\);$`,
        ),
      )

      if (!sourceLineMatch) {
        continue
      }

      const [, indentation, colorName] = sourceLineMatch
      const blockEndIndex = lines
        .slice(index + 1)
        .findIndex((candidate) => candidate.trim() === '}')

      if (blockEndIndex === -1) {
        continue
      }

      const blockLines = lines.slice(index + 1, index + 1 + blockEndIndex)

      for (const aliasKey of aliasKeys) {
        const aliasLine = `${indentation}--ds-color-${aliasKey}: var(--ds-color-${colorName}-${aliasKey});`

        if (blockLines.includes(aliasLine)) {
          continue
        }

        nextLines.push(aliasLine)
        changed = true
      }
    }
  }

  if (!changed) {
    return { changed: false, content }
  }

  return { changed: true, content: nextLines.join('\n') }
}

const applyTailwindAliases = (content) => {
  const lines = content.split('\n')
  const startIndex = lines.findIndex((line) => line.trim() === '[data-color] {')

  if (startIndex === -1) {
    return { changed: false, content }
  }

  let endIndex = startIndex + 1

  while (endIndex < lines.length && lines[endIndex].trim() !== '}') {
    endIndex += 1
  }

  if (endIndex >= lines.length) {
    return { changed: false, content }
  }

  const blockLines = lines.slice(startIndex, endIndex + 1)
  let changed = false

  for (const [sourceKey, aliasKeys] of Object.entries(aliasMap)) {
    const sourceLinePattern = new RegExp(
      `^(\\s*)--color-${sourceKey}: var\\(--ds-color-${sourceKey}\\);$`,
    )
    const sourceLineIndex = blockLines.findIndex((line) =>
      sourceLinePattern.test(line),
    )

    if (sourceLineIndex === -1) {
      continue
    }

    const sourceLine = blockLines[sourceLineIndex]
    const indentation = sourceLine.match(sourceLinePattern)?.[1] ?? ''

    for (const aliasKey of aliasKeys) {
      const aliasLine = `${indentation}--color-${aliasKey}: var(--ds-color-${aliasKey});`

      if (blockLines.includes(aliasLine)) {
        continue
      }

      blockLines.splice(sourceLineIndex + 1, 0, aliasLine)
      changed = true
    }
  }

  if (!changed) {
    return { changed: false, content }
  }

  return {
    changed: true,
    content: [
      ...lines.slice(0, startIndex),
      ...blockLines,
      ...lines.slice(endIndex + 1),
    ].join('\n'),
  }
}

const applyTokenAliases = async () => {
  const jsonFiles = await collectJsonFiles(semanticTokensDir)
  let updatedFiles = 0
  let createdAliases = 0

  for (const filePath of jsonFiles) {
    const raw = await readFile(filePath, 'utf8')
    const document = JSON.parse(raw)
    const changes = applyAliases(document)

    if (changes === 0) {
      continue
    }

    await writeFile(filePath, `${JSON.stringify(document, null, 2)}\n`)
    updatedFiles += 1
    createdAliases += changes
    console.log(`Updated ${filePath} (${changes} aliases)`)
  }

  if (updatedFiles === 0) {
    console.log('No custom token aliases were added.')
    return
  }

  console.log(
    `Added ${createdAliases} custom token aliases across ${updatedFiles} files.`,
  )
}

const patchCssFiles = async (files, patchFn, label) => {
  let count = 0

  for (const filePath of files) {
    const raw = await readFile(filePath, 'utf8')
    const { changed, content } = patchFn(raw)

    if (!changed) continue

    await writeFile(filePath, content)
    count += 1
    console.log(`Patched ${label} in ${filePath}`)
  }

  console.log(
    count === 0
      ? `No ${label} patches were needed.`
      : `Patched ${label} in ${count} files.`,
  )
}

const patchBuildOutputs = async () => {
  await patchCssFiles(
    await collectTailwindFiles(themesDir),
    applyTailwindAliases,
    'Tailwind aliases',
  )
  await patchCssFiles(
    await collectThemeCssFiles(themesDir),
    applyThemeAliases,
    'theme aliases',
  )
}

if (!['tokens', 'outputs'].includes(mode)) {
  throw new Error(`Usage: apply-custom-tokens.mjs <tokens|outputs>`)
}

if (mode === 'tokens') {
  await applyTokenAliases()
}

if (mode === 'outputs') {
  await patchBuildOutputs()
}

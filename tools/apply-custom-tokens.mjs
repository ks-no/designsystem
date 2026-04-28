#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const semanticTokensDir = join(repoRoot, 'design-tokens', 'semantic')
const themesDir = join(repoRoot, 'packages', 'themes', 'src', 'themes')

const aliasMap = {
  'text-subtle': ['icon-subtle'],
}

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

    const insertAfterSource = Object.entries(value)
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

      for (const [key, entryValue] of insertAfterSource) {
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

const collectTailwindFiles = async (directory) => {
  try {
    const entries = await readdir(directory, { withFileTypes: true })

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.tailwind.css'))
      .map((entry) => join(directory, entry.name))
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'ENOENT') {
      return []
    }

    throw error
  }
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
} else {
  console.log(
    `Added ${createdAliases} custom token aliases across ${updatedFiles} files.`,
  )
}

const tailwindFiles = await collectTailwindFiles(themesDir)
let updatedTailwindFiles = 0

for (const filePath of tailwindFiles) {
  const raw = await readFile(filePath, 'utf8')
  const { changed, content } = applyTailwindAliases(raw)

  if (!changed) {
    continue
  }

  await writeFile(filePath, content)
  updatedTailwindFiles += 1
  console.log(`Patched Tailwind aliases in ${filePath}`)
}

if (updatedTailwindFiles === 0) {
  console.log('No Tailwind alias patches were needed.')
} else {
  console.log(`Patched Tailwind aliases in ${updatedTailwindFiles} files.`)
}

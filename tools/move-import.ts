#!/usr/bin/env ts-node

import { Project } from 'ts-morph'

// --- Parse CLI args ---
const [, , oldLib, componentName, newLib] = process.argv

if (!oldLib || !componentName || !newLib) {
  console.error(
    'Usage: tsx move-import.ts <old-lib-alias> <component-name> <new-lib-alias>',
  )
  process.exit(1)
}

// --- Setup ts-morph project ---
const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json', // assumes monorepo root
})

// --- Process all source files in the workspace ---
project.getSourceFiles().forEach((sourceFile) => {
  let modified = false

  sourceFile.getImportDeclarations().forEach((importDecl) => {
    if (importDecl.getModuleSpecifierValue() === oldLib) {
      const namedImports = importDecl.getNamedImports()

      const targetImport = namedImports.find(
        (i) => i.getName() === componentName,
      )

      if (targetImport) {
        // remove from old import
        targetImport.remove()
        modified = true

        // add to new import
        sourceFile.addImportDeclaration({
          namedImports: [componentName],
          moduleSpecifier: newLib,
        })

        // remove empty import if no specifiers left
        if (importDecl.getNamedImports().length === 0) {
          importDecl.remove()
        }
      }
    }
  })

  if (modified) {
    console.log(`Updated imports in: ${sourceFile.getFilePath()}`)
  }
})

project.saveSync()
console.log('✅ Import rewrite complete!')

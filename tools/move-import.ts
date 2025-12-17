#!/usr/bin/env tsx

import { Project } from 'ts-morph'
const [, , oldLib, componentName, newLib] = process.argv

if (!oldLib || !componentName || !newLib) {
  console.error(
    'Usage: tsx move-import.ts <old-lib-alias> <component-name> <new-lib-alias>',
  )
  process.exit(1)
}

const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json', // assumes monorepo root
})

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

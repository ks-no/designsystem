import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const components = [
  'alert',
  'avatar',
  'badge',
  'breadcrumbs',
  'button',
  'card',
  'checkbox',
  'chip',
  'details',
  'dialog',
  'divider',
  'dropdown',
  'errorSummary',
  'field',
  'fieldset',
  'input',
  'link',
  'list',
  'loaders',
  'multiSuggestion',
  'pagination',
  'popover',
  'radio',
  'search',
  'select',
  'skipLink',
  'suggestion',
  'switch',
  'table',
  'tabs',
  'tag',
  'textarea',
  'textfield',
  'toggleGroup',
  'tooltip',
  'typography',
]

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

components.forEach((name) => {
  const capitalized = capitalize(name)
  const dir = path.join(__dirname, name)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const filePath = path.join(dir, `${capitalized}.tsx`)
  const content = `
import { ${capitalized}, type ${capitalized}Props } from '@digdir/designsystemet-react';
export { ${capitalized}, ${capitalized}Props };
`.trimStart()

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`Created ${filePath}`)
})

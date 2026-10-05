import { readFile, writeFile } from 'node:fs/promises'
import { html } from '../dist-server/prerender.js'

const path = new URL('../dist/index.html', import.meta.url)
const template = await readFile(path, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing render slot')
await writeFile(path, template.replace('<!--app-html-->', html))
console.log('Static page rendered: content is available without JavaScript.')

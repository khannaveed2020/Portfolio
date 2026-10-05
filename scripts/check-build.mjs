import assert from 'node:assert/strict'
import { readFile, readdir, stat } from 'node:fs/promises'

const html = await readFile('dist/index.html', 'utf8')
for (const id of ['about', 'work', 'credentials', 'testimonials', 'contact']) assert(html.includes(`id="${id}"`), `Missing static section ${id}`)
for (const word of ['Microsoft', 'Wipro Infotech', 'Cessna 172', 'Traffic Manager', 'Bastion', 'Azure NAT Gateway', 'Lab experience only']) assert(html.includes(word), `Missing source-grounded content: ${word}`)
assert(html.includes('aria-label="Open Naveed Khan résumé PDF"'))
assert(html.includes('href="/Portfolio/Naveed_Khan_Resume.pdf"'))
assert(html.includes('<details>') && html.includes('<summary>'))
assert(!html.includes('<!--app-html-->'))
assert(!/New Zealand|Auckland|AEWV|sponsorship|Education &amp; languages|JSS PPH/.test(html), 'Private instruction context appeared in public HTML')
assert(html.includes('href="mailto:khannaveed2020@outlook.com"'))
assert(!html.replace(/<[^>]*>/g, '').includes('khannaveed2020@outlook.com'), 'Visible email address appeared')
assert(html.includes('aria-pressed="false"'), 'Missing accessible illustration controls')
assert(html.includes('/Portfolio/credly.svg'), 'Missing local brand logo')
assert(html.includes('<h3 id="credentials-heading"'), 'Credentials must be an explicit heading')
assert(html.includes('RoadLens — Intelligent Car Dashcam'), 'Missing verified project content')
assert(html.includes('deterministic keyword matching'), 'Missing project search limitation')
assert(html.includes('<blockquote>') && html.includes('<figcaption>'), 'Testimonials must have semantic quotation and attribution')
assert(html.includes('Ratnavo Dutta') && html.includes('Ankush G'), 'Missing verified recommendation authors')
assert(html.indexOf('id="testimonials"') < html.indexOf('id="contact"'), 'Testimonials must precede Contact')
assert(html.includes('details/recommendations/'), 'Missing LinkedIn recommendation source link')
assert(html.includes('Next testimonial'), 'Missing explicit testimonial control')
assert(html.includes('Pause skills ticker'), 'Missing skills ticker pause control')
assert(html.includes('Terraform · lab'), 'Skills ticker must preserve lab boundary')
assert(html.includes('id="skills-track"'), 'Missing skills ticker')
const hero = html.slice(html.indexOf('id="about"'), html.indexOf('id="work"'))
assert(!hero.includes('Senior Support Escalation Engineer'), 'Role leaked into personal introduction')
const pdf = await readFile('dist/Naveed_Khan_Resume.pdf')
assert(pdf.subarray(0, 5).toString() === '%PDF-')
assert((await stat('dist/Naveed_Khan_Resume.pdf')).size > 10000)
for (const match of html.matchAll(/(?:src|href)="(\/Portfolio\/[^\"#]+)"/g)) await stat(`dist/${match[1].replace('/Portfolio/', '')}`)
async function audit(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const file = `${path}/${entry.name}`
    assert(!/\.docx$|master.resume|source-documents/i.test(file), `Private file in output: ${file}`)
    if (entry.isDirectory()) await audit(file)
  }
}
await audit('dist')
console.log('PASS: static content, native details, asset URLs, résumé and public-output privacy checks.')

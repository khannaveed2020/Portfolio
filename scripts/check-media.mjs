import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'

// Inspect container chunks directly so CI needs no image-processing dependency.
export async function checkMedia(directory) {
  let count = 0
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`
    if (entry.isDirectory()) { count += await checkMedia(path); continue }
    if (/\.svg$/i.test(path)) {
      const svg = await readFile(path, 'utf8')
      for (const match of svg.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)) {
        checkRaster(Buffer.from(match[1], 'base64'), `${path}.png`)
        count++
      }
      continue
    }
    if (!/\.(jpg|jpeg|png|webp)$/i.test(path)) continue
    const data = await readFile(path)
    checkRaster(data, path)
    count++
  }
  return count
}

function checkRaster(data, path) {
    const reject = (present) => assert(!present, `Embedded metadata in ${path}`)
    if (/\.png$/i.test(path)) {
      for (let offset = 8; offset + 12 <= data.length;) {
        const length = data.readUInt32BE(offset)
        const type = data.toString('ascii', offset + 4, offset + 8)
        reject(['eXIf', 'tEXt', 'zTXt', 'iTXt', 'tIME', 'iCCP'].includes(type))
        offset += length + 12
      }
    } else if (/\.webp$/i.test(path)) {
      for (let offset = 12; offset + 8 <= data.length;) {
        const type = data.toString('ascii', offset, offset + 4)
        const length = data.readUInt32LE(offset + 4)
        reject(['EXIF', 'XMP ', 'ICCP'].includes(type))
        offset += 8 + length + (length % 2)
      }
    } else {
      assert(data.readUInt16BE(0) === 0xffd8, `Invalid JPEG: ${path}`)
      for (let offset = 2; offset + 4 <= data.length;) {
        assert(data[offset] === 0xff, `Invalid JPEG marker: ${path}`)
        const marker = data[offset + 1]
        if (marker === 0xda || marker === 0xd9) break
        reject([0xe1, 0xe2, 0xed, 0xfe].includes(marker))
        offset += 2 + data.readUInt16BE(offset + 2)
      }
    }
}

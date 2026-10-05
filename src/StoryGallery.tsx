import { useEffect, useState } from 'react'

const photos = {
  flying: [
    ['aviation-01', 'Naveed holding aircraft controls with mountains beyond the windscreen', 'In the cockpit'],
    ['aviation-02', 'Naveed wearing a headset and holding aircraft controls', 'Taking the controls'],
    ['aviation-03', 'Naveed in the cockpit with mountain scenery outside', 'A moment in flight'],
    ['aviation-04', 'IVAO India flight-simulation appreciation certificate for Naveed Khan', 'Flight simulation · IVAO appreciation'],
    ['aviation-05', 'Laptop, headset and IVAO India materials at a flight-simulation setup', 'Flight simulation · IVAO setup'],
    ['aviation-06', 'Radar display showing traffic in a flight-simulation session', 'Flight simulation · radar view'],
  ],
  diving: [
    ['scuba-01', 'Diver adjusting a mask while wearing scuba equipment at the sea surface', 'Preparing to dive'],
    ['scuba-02', 'Scuba diver entering the water, with fins visible near the surface', 'At the surface'],
  ],
  photography: [
    ['photography-5085', 'River winding between forested hills beneath cloudy skies', 'Between the hills'],
    ['photography-5079', 'Ornately decorated golden facade with an arched doorway', 'Details in architecture'],
    ['photography-5088', 'Bare branches silhouetted against a golden sunset', 'The last light'],
    ['photography-5087', 'Moon above clouds and waves on a dark coastline', 'An evening by the sea'],
    ['photography-5084', 'Storm clouds and rainfall over a city and river', 'A changing sky'],
    ['photography-5081', 'Black-and-white photograph of a cannon beside an ornate doorway', 'Lines and shadows'],
    ['photography-5080', 'Hand holding a brass compass with a beach in the background', 'A sense of direction'],
    ['photography-5091', 'Leafy branches silhouetted against a softly lit sky', 'Looking up'],
    ['photography-5086', 'Upward view of buildings framed by palm leaves', 'Another angle'],
    ['photography-5082', 'Red payphones behind glass with local and international call signs', 'A familiar sight'],
    ['photography-5083', 'Black-and-white photograph of a wall-mounted station-style clock', 'Time in a quiet corner'],
    ['photography-5077', 'Headphones and an e-reader resting on a bed beside a window', 'A pause along the way'],
    ['photography-5078', 'Pendant resting on a copy of The Kite Runner', 'Small details'],
    ['photography-5089', 'Hourglass beside an open book and glowing lantern', 'By lantern light'],
    ['photography-5090', 'Hand holding a cup beneath warm streetlights at night', 'A cup after dark'],
    ['photography-5092', 'Glass of sparkling water with a busy street softly blurred behind it', 'A roadside pause'],
  ],
} as const

export function StoryGallery({ kind }: { kind: keyof typeof photos }) {
  const [enhanced, setEnhanced] = useState(false)
  const [index, setIndex] = useState(0)
  useEffect(() => setEnhanced(true), [])
  const items = photos[kind]
  const name = kind === 'flying' ? 'aviation' : kind === 'diving' ? 'scuba' : 'photography'
  const id = `${name}-photos`
  const base = `${import.meta.env.BASE_URL}photos/`
  return <div className={`story-gallery ${kind}`} role="region" aria-label={`${name} photographs`} aria-roledescription={enhanced ? 'carousel' : undefined}>
    <div id={id} className="gallery-slides">
      {items.map(([file, alt, caption], i) => <figure className="gallery-slide" key={file} hidden={enhanced && index !== i}>
        <div className="photo-frame"><img src={`${base}${file}.jpg`} srcSet={`${base}${file}-small.jpg 640w, ${base}${file}.jpg 1280w`} sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1100px) 45vw, 550px" alt={alt} width="1280" height={kind === 'diving' ? '1280' : '960'} loading="lazy" decoding="async" /></div>
        {kind === 'photography' && <span className="photo-watermark" aria-hidden="true">HBK</span>}
        <figcaption>{caption}</figcaption>
      </figure>)}
    </div>
    <div className="gallery-controls" hidden={!enhanced}>
      <span aria-live="polite" aria-atomic="true">{index + 1} / {items.length}</span>
      <button aria-label={`Next ${name} photo`} aria-controls={id} onClick={() => setIndex(current => (current + 1) % items.length)}>Next photo <span aria-hidden="true">→</span></button>
    </div>
  </div>
}

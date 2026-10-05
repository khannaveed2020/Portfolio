import { useEffect, useState } from 'react'
import { recommendationsUrl, testimonials, tickerSkills } from './content'
import { ProfileLogo } from './Visuals'

export function TestimonialTicker() {
  const [enhanced, setEnhanced] = useState(false)
  const [index, setIndex] = useState(0)
  useEffect(() => setEnhanced(true), [])
  const next = () => setIndex(current => (current + 1) % testimonials.length)
  return <>
    <div className="testimonial-ticker" role="region" aria-label="Testimonials" aria-roledescription={enhanced ? 'carousel' : undefined}>
      <div className="ticker-toolbar" hidden={!enhanced}><span aria-live="polite" aria-atomic="true">{index + 1} / {testimonials.length} · {testimonials[index].name}</span><button className="ticker-next" onClick={next} aria-controls="testimonial-slides">Next testimonial <span aria-hidden="true">→</span></button></div>
      <div id="testimonial-slides" className="testimonials-list">{testimonials.map((person, i) => <figure className={`testimonial ${enhanced && index === i ? 'testimonial-active' : ''}`} hidden={enhanced && index !== i} key={person.name}>
        <blockquote><button className="quote-switch" onClick={next} disabled={!enhanced}><span>“{person.quote}”</span><span className="quote-switch-hint" hidden={!enhanced}>Click this quote to see the next testimonial <span aria-hidden="true">↗</span></span></button></blockquote>
        <figcaption><a className="testimonial-author" href={person.profile} target="_blank" rel="noopener noreferrer">{person.name} <span aria-hidden="true">↗</span></a><span className="testimonial-title">{person.title}</span><span className="testimonial-relationship">{person.relationship}</span><span className="testimonial-source">LinkedIn recommendation · <time dateTime={person.date}>{person.displayDate}</time> · Excerpt</span></figcaption>
      </figure>)}</div>
    </div>
    <a className="text-link recommendation-link" href={recommendationsUrl} target="_blank" rel="noopener noreferrer"><ProfileLogo name="LinkedIn"/>Read the full recommendations on LinkedIn <span aria-hidden="true">↗</span></a><p className="recommendation-note">LinkedIn may require sign-in to view the originals.</p>
  </>
}

export function SkillsTicker() {
  const [paused, setPaused] = useState(false)
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(true), [])
  return <section className={`skills-ticker ${enabled ? 'skills-enabled' : ''} ${paused ? 'skills-paused' : ''}`} aria-labelledby="skills-ticker-heading">
    <div className="skills-ticker-header shell"><h2 id="skills-ticker-heading">Skills & tools</h2><button className="skills-pause" hidden={!enabled} aria-pressed={paused} aria-controls="skills-track" onClick={() => setPaused(!paused)}>{paused ? 'Resume skills ticker' : 'Pause skills ticker'} <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button></div>
    <div className="skills-window"><div className="skills-track" id="skills-track">
      {[false, true].map(duplicate => <ul className="skills-run" aria-hidden={duplicate || undefined} key={String(duplicate)}>{tickerSkills.map(skill => <li key={skill}>{skill}<span aria-hidden="true">✦</span></li>)}</ul>)}
    </div></div>
  </section>
}

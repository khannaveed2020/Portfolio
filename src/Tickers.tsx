import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { recommendationsUrl, testimonials, tickerBadges, tickerSkills } from './content'
import { CompanyLogo, ProfileLogo } from './Visuals'

export function TestimonialTicker() {
  const [enhanced, setEnhanced] = useState(false)
  const [index, setIndex] = useState(0)
  useEffect(() => setEnhanced(true), [])
  const next = () => setIndex(current => (current + 1) % testimonials.length)
  const progress = testimonials.length > 1 ? index / (testimonials.length - 1) * 100 : 100
  return <>
    <div className="testimonial-ticker" role="region" aria-label="Testimonials" aria-roledescription={enhanced ? 'carousel' : undefined}>
      <div id="testimonial-slides" className="testimonials-list">{testimonials.map((person, i) => <figure className={`testimonial ${enhanced && index === i ? 'testimonial-active' : ''}`} hidden={enhanced && index !== i} key={person.name}>
        <blockquote><button className="quote-switch" onClick={next} disabled={!enhanced}>{person.quote.split('\n\n').map((paragraph, i, all) => <span className="quote-paragraph" key={i}>{i === 0 ? '“' : ''}{paragraph}{i === all.length - 1 ? '”' : ''}</span>)}<span className="quote-switch-hint" hidden={!enhanced}>Click this quote to see the next testimonial <span aria-hidden="true">↗</span></span></button></blockquote>
        <figcaption><a className="testimonial-author" href={person.profile} target="_blank" rel="noopener noreferrer">{person.name} <span aria-hidden="true">↗</span></a><span className="testimonial-title">{person.title}</span><span className="testimonial-relationship">{person.relationship}</span><span className="testimonial-source">LinkedIn recommendation · <time dateTime={person.date}>{person.displayDate}</time></span></figcaption>
      </figure>)}</div>
      <div className="ticker-toolbar" hidden={!enhanced}>
        <input
          className="carousel-range"
          type="range"
          min="0"
          max={testimonials.length - 1}
          value={index}
          onChange={event => setIndex(Number(event.currentTarget.value))}
          aria-label="Choose testimonial"
          aria-valuetext={`${testimonials[index].name}, testimonial ${index + 1} of ${testimonials.length}`}
          style={{ '--carousel-progress': `${progress}%` } as CSSProperties}
        />
        <button className="ticker-next" onClick={next} aria-controls="testimonial-slides">Next testimonial <span aria-hidden="true">→</span></button>
      </div>
    </div>
    <a className="text-link recommendation-link" href={recommendationsUrl} target="_blank" rel="noopener noreferrer"><ProfileLogo name="LinkedIn"/>Read the full recommendations on LinkedIn <span aria-hidden="true">↗</span></a><p className="recommendation-note">LinkedIn may require sign-in to view the originals.</p>
  </>
}

function Tape({ logos = false, children }: { logos?: boolean; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(95.238)
  useEffect(() => {
    const group = track.current?.firstElementChild
    if (!group) return
    // Keep logo tape B at its existing travel speed. The latest revision adds
    // another 5% to skills tape A, independently of list length/viewport width.
    const speed = logos ? 34.8143086 : 34.8143086 * 1.05
    const measure = () => setDuration(group.getBoundingClientRect().width / speed)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(group)
    return () => observer.disconnect()
  }, [logos])
  return <div className="skills-window"><div className={`skills-track ${logos ? 'logos-track' : ''}`} ref={track} style={{ animationDuration: `${duration}s` }}>
    {[false, true].map(duplicate => <ul className={`skills-run ${logos ? 'logos-run' : ''}`} aria-hidden={duplicate || undefined} key={String(duplicate)}>{children}</ul>)}
  </div></div>
}

export function SkillsTicker() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(true), [])
  return <section className={`skills-ticker ${enabled ? 'skills-enabled' : ''}`} aria-labelledby="skills-ticker-heading">
    <h2 className="shell" id="skills-ticker-heading">Skills & tools</h2>
    <Tape>{tickerSkills.map(skill => <li key={skill}>{skill}<span aria-hidden="true">✦</span></li>)}</Tape>
    <div className="logo-tape" role="region" aria-label="Employers and recorded credential logos">
      <Tape logos>
        {['Wipro Infotech', 'HCL Infotech', 'Mphasis', 'Microsoft'].map(company => <li className="employer-tape-logo" key={company} aria-label={company} title={company}><CompanyLogo name={company}/></li>)}
        {tickerBadges.map(([file, label]) => <li className="credential-tape-logo" key={file} title={label}><img draggable={false} src={`${import.meta.env.BASE_URL}logos/certifications/${file}`} alt={label} width="92" height="92" loading="lazy" decoding="async"/></li>)}
      </Tape>
    </div>
  </section>
}

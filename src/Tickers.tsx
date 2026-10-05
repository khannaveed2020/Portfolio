import { useEffect, useRef, useState, type ReactNode } from 'react'
import { recommendationsUrl, testimonials, tickerBadges, tickerSkills } from './content'
import { CompanyLogo, ProfileLogo } from './Visuals'

export function TestimonialTicker() {
  const [enhanced, setEnhanced] = useState(false)
  const [index, setIndex] = useState(0)
  useEffect(() => setEnhanced(true), [])
  const next = () => setIndex(current => (current + 1) % testimonials.length)
  return <>
    <div className="testimonial-ticker" role="region" aria-label="Testimonials" aria-roledescription={enhanced ? 'carousel' : undefined}>
      <div className="ticker-toolbar" hidden={!enhanced}><span aria-live="polite" aria-atomic="true">{index + 1} / {testimonials.length} · {testimonials[index].name}</span><button className="ticker-next" onClick={next} aria-controls="testimonial-slides">Next testimonial <span aria-hidden="true">→</span></button></div>
      <div id="testimonial-slides" className="testimonials-list">{testimonials.map((person, i) => <figure className={`testimonial ${enhanced && index === i ? 'testimonial-active' : ''}`} hidden={enhanced && index !== i} key={person.name}>
        <blockquote><button className="quote-switch" onClick={next} disabled={!enhanced}>{person.quote.split('\n\n').map((paragraph, i, all) => <span className="quote-paragraph" key={i}>{i === 0 ? '“' : ''}{paragraph}{i === all.length - 1 ? '”' : ''}</span>)}<span className="quote-switch-hint" hidden={!enhanced}>Click this quote to see the next testimonial <span aria-hidden="true">↗</span></span></button></blockquote>
        <figcaption><a className="testimonial-author" href={person.profile} target="_blank" rel="noopener noreferrer">{person.name} <span aria-hidden="true">↗</span></a><span className="testimonial-title">{person.title}</span><span className="testimonial-relationship">{person.relationship}</span><span className="testimonial-source">LinkedIn recommendation · <time dateTime={person.date}>{person.displayDate}</time></span></figcaption>
      </figure>)}</div>
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
    // Previous tape: 3315.648px / 100s. Maintain exactly 1.05 times that
    // travel speed even after reducing type size or changing the viewport.
    const measure = () => setDuration(group.getBoundingClientRect().width / 34.8143086)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(group)
    return () => observer.disconnect()
  }, [])
  return <div className="skills-window"><div className={`skills-track ${logos ? 'logos-track' : ''}`} ref={track} style={{ animationDuration: `${duration}s` }}>
    {[false, true].map(duplicate => <ul className={`skills-run ${logos ? 'logos-run' : ''}`} aria-hidden={duplicate || undefined} key={String(duplicate)}>{children}</ul>)}
  </div></div>
}

export function SkillsTicker() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(true), [])
  return <section className={`skills-ticker ${enabled ? 'skills-enabled' : ''}`} aria-labelledby="skills-ticker-heading">
    <div className="skills-ticker-header shell"><h2 id="skills-ticker-heading">Skills & tools</h2></div>
    <Tape>{tickerSkills.map(skill => <li key={skill}>{skill}<span aria-hidden="true">✦</span></li>)}</Tape>
    <div className="logo-tape" role="region" aria-label="Employers and recorded credential logos">
      <Tape logos>
        {['Microsoft', 'Mphasis', 'HCL Infotech', 'Wipro Infotech'].map(company => <li className="employer-tape-logo" key={company} aria-label={company} title={company}><CompanyLogo name={company}/></li>)}
        {tickerBadges.map(([file, label]) => <li className="credential-tape-logo" key={file} title={label}><img src={`${import.meta.env.BASE_URL}logos/certifications/${file}`} alt={label} width="92" height="92" loading="lazy" decoding="async"/></li>)}
      </Tape>
    </div>
    <p className="badge-tape-note shell">Credential artwork includes historical badges: AZ-104, AZ-700, AZ-720, Cisco and CCSA are marked expired on Credly. <a href="https://www.credly.com/users/naveed-khan.bc5811d0/badges" target="_blank" rel="noopener noreferrer">View badge records <span aria-hidden="true">↗</span></a></p>
  </section>
}

import { useEffect, useRef, useState, type SyntheticEvent } from 'react'
import { motion, MotionConfig, useReducedMotion, useScroll, useInView, useAnimate } from 'motion/react'
import { Character } from './Character'
import { CatMascot } from './mascot/CatMascot'
import { ProfileLogo, CompanyLogo, CredentialSymbols } from './Visuals'
import { StoryGallery } from './StoryGallery'
import { credentials, experience, expertise, profileLinks, roadLens } from './content'
import { TestimonialTicker, SkillsTicker } from './Tickers'

const resume = `${import.meta.env.BASE_URL}Naveed_Khan_Resume.pdf`
const navigation = [['about', 'About Me'], ['work', 'About My Work'], ['credentials', 'Credentials']] as const

// A casual-saving deterrent only; public assets remain retrievable.
function preventImageSave(event: SyntheticEvent) {
  if (event.target instanceof Element && event.target.closest('img, svg')) event.preventDefault()
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  const [scope, animate] = useAnimate()
  const entered = useInView(scope, { once: true, amount: .12 })
  const played = useRef(false)
  useEffect(() => {
    if (!entered || reduced || played.current) return
    played.current = true
    // Start only on intersection: SSR and failed/disabled JS never hide content.
    const story = className.includes('story')
    const side = className.includes('story-reverse') ? 24 : -24
    const controls = animate(scope.current, { opacity: [.35, 1], y: [story ? 20 : 48, 0], x: [story ? side : 0, 0] }, { duration: .8, ease: [.16, 1, .3, 1] })
    return () => controls.stop()
  }, [entered, reduced, animate, scope, className])
  return <div ref={scope} className={className}>{children}</div>
}

export function App() {
  const [active, setActive] = useState('about')
  const { scrollYProgress } = useScroll()
  useEffect(() => {
    const nodes = navigation.map(([id]) => document.getElementById(id)!).filter(Boolean)
    const check = () => {
      const line = window.innerHeight * .28
      const current = [...nodes].reverse().find(node => node.getBoundingClientRect().top <= line)
      setActive(current?.id ?? 'about')
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [])

  return <MotionConfig reducedMotion="user">
    <div className="portfolio-root" onContextMenuCapture={preventImageSave} onDragStartCapture={preventImageSave}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <a className="wordmark" href="#about" aria-label="nk. — Naveed Khan, back to introduction">nk<span>.</span></a>
      <nav aria-label="Main navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <a className="resume-link" href={resume} target="_blank" rel="noopener noreferrer" aria-label="Open Naveed Khan résumé PDF">Résumé <span aria-hidden="true">↗</span></a>
    </header>
    <CatMascot />
    <main id="main">
      <section id="about" className="about-section">
        <div className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line"/> A little about me</p>
            <h1>Naveed<br/><span>Khan.</span></h1>
            <p className="hero-line">Curious by nature.<br/>Determined in practice.</p>
            <p className="intro">I learn how things work, explore new possibilities and keep looking for a way forward.</p>
            <div className="hero-actions"><a className="button" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="#interests">Meet the person <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-scene"><Character /><span className="scene-caption">A curious mind. A personal perspective.</span></div>
          <div className="hero-bottom"><span>Based in India</span><a href="#interests">A few things that keep me curious <span aria-hidden="true">↓</span></a><span className="edition">Personal portfolio / 01</span></div>
        </div>
        <div id="interests" className="shell interests">
          <Reveal><div className="section-heading"><p className="eyebrow">01 / Beyond the work</p><h2>Room for curiosity.</h2><p>Learning also happens away from a screen.</p></div></Reveal>
          <Reveal className="personal-summary"><section aria-labelledby="personal-summary-heading"><p className="eyebrow">What keeps me curious</p><h3 id="personal-summary-heading">New places. Different perspectives.</h3><p>I enjoy travelling, taking photographs and trying experiences beyond my everyday routine. Whether I’m noticing a small detail through a lens, learning in a cockpit or exploring beneath the surface, curiosity is what draws me in.</p><ul aria-label="Personal interests"><li>Travel & photography</li><li>Aviation</li><li>Scuba & adventure</li></ul></section></Reveal>
          <Reveal className="story"><StoryGallery kind="flying" /><div className="story-copy"><p className="eyebrow">A different perspective</p><h3>Learning to fly.</h3><p>More than 10 hours of hands-on flight experience in a Cessna 172. My interest in aviation continues through flight simulation on VATSIM and IVAO.</p><span className="small-label">General aviation · Flight simulation</span></div></Reveal>
          <Reveal className="story story-reverse"><StoryGallery kind="diving" /><div className="story-copy"><p className="eyebrow">Another world to explore</p><h3>Below the surface.</h3><p>Scuba diving in the Indian Ocean is another part of my story.</p><span className="small-label">Scuba diving · Indian Ocean</span></div></Reveal>
          <Reveal className="story"><StoryGallery kind="photography" /><section id="photography" className="story-copy" aria-labelledby="photography-heading"><p className="eyebrow">Through my lens</p><h3 id="photography-heading">Photography</h3><p>I love travelling and finding a different perspective in the places I visit.<br/>Photography lets me capture the landscapes, light and small details that make each journey memorable.</p><span className="small-label">Travel · Photography · HBK</span></section></Reveal>
        </div>
      </section>
      <aside className="chapter-bridge" aria-labelledby="chapter-bridge-heading"><div className="shell"><Reveal><p className="eyebrow">From personal interests to professional work</p><h2 id="chapter-bridge-heading">A different setting.<br/><span>The same curiosity.</span></h2><p>Outside work, I look for new perspectives. At work, I put that curiosity into understanding technical problems and finding a practical way forward.</p><a className="text-link" href="#work">See how I approach my work <span aria-hidden="true">↓</span></a></Reveal></div></aside>
      <section id="work" className="work-section section-pad"><div className="shell">
        <Reveal><div className="section-heading"><p className="eyebrow">02 / About my work</p><h2>Making sense of<br/>complex problems.</h2><p>Senior Support Escalation Engineer at Microsoft, with more than 15 years across Azure networking, enterprise networking, network security and technical escalations.</p></div></Reveal>
        <Reveal className="work-intro"><p className="lead">From the first investigation to a practical way forward.</p><p>My work combines technical diagnosis, customer communication and collaboration with engineering teams. I also publish PowerShell tools and continue learning through practical labs.</p></Reveal>
        <div className="experience-list">{experience.map((job, i) => <Reveal key={`${job.company}-${job.date}`}><article className="experience"><div className="experience-index">0{i + 1}</div><div className="experience-content"><div className="role-meta"><h3 className="company-heading"><CompanyLogo name={job.company}/>{job.company}</h3><span>{job.date}</span></div><h4>{job.role}</h4><p>{job.summary}</p><details><summary>View experience details <span aria-hidden="true">+</span></summary><ul>{job.bullets.map(b => <li key={b}>{b}</li>)}</ul></details></div></article></Reveal>)}</div>
        <Reveal><section className="expertise" aria-labelledby="expertise-heading"><h3 id="expertise-heading">Technical capabilities</h3><dl>{expertise.map(([name, text]) => <div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl></section></Reveal>
      </div></section>
      <section id="credentials" className="section-pad"><div className="shell">
        <Reveal><div className="section-heading"><p className="eyebrow">03 / Professional development</p><h2>Credentials.</h2><p>Certifications and learning across cloud, networking and security.</p></div></Reveal>
        <section className="credentials-block" aria-labelledby="credentials-heading">
          <Reveal><h3 id="credentials-heading" className="chapter-heading">Credentials<span>Certifications & professional development</span></h3></Reveal>
          <div className="credential-list">{credentials.map(([name, text]) => <Reveal key={name}><article className="credential-group"><div className="credential-identity"><h4>{name === 'Microsoft' && <CompanyLogo name="Azure"/>}{name === 'Microsoft' ? 'Microsoft & Azure' : name}</h4>{name !== 'Microsoft' && <CredentialSymbols group={name}/>}</div><ul>{text.split('; ').map(item => <li key={item}>{item.replace(/\.$/, '')}</li>)}</ul></article></Reveal>)}</div>
          <div className="credential-footer"><p>Credentials are listed as recorded in my résumé.</p><a className="text-link" href={profileLinks[2][1]} target="_blank" rel="noopener noreferrer"><ProfileLogo name="Credly"/>View credential badges <span aria-hidden="true">↗</span></a></div>
        </section>
      </div></section>
      <section id="labs" className="practical-section section-pad" aria-labelledby="projects-heading"><div className="shell">
          <Reveal><div className="section-heading"><p className="eyebrow">04 / Building & exploring</p><h2 id="projects-heading">Projects & Practical Learning.</h2><p>I build tools to investigate technical problems and use my homelab to explore new ideas. Here are the projects, published modules and hands-on experiments behind that learning.</p></div></Reveal>
          <Reveal><article className="featured-project">
            <figure className="project-visual"><img draggable={false} src={`${import.meta.env.BASE_URL}photos/roadlens-preview.jpg`} srcSet={`${import.meta.env.BASE_URL}photos/roadlens-preview-small.jpg 640w, ${import.meta.env.BASE_URL}photos/roadlens-preview.jpg 1280w`} sizes="(max-width: 720px) calc(100vw - 48px), 40vw" width="1280" height="737" loading="lazy" decoding="async" alt="RoadLens preview showing dashcam footage alongside vehicle counts and search results"/><figcaption>RoadLens · User-supplied preview</figcaption></figure>
            <div className="project-copy"><p className="eyebrow">Public source / Computer vision</p><h4>{roadLens.title}</h4><p>{roadLens.summary}</p><ul className="project-benefits" aria-label="RoadLens benefits">{roadLens.benefits.map(([title, text]) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}</ul><ul className="technology-list" aria-label="Project technologies">{roadLens.technologies.map(t => <li key={t}>{t}</li>)}</ul><div className="project-links"><a className="text-link" href={roadLens.url} target="_blank" rel="noopener noreferrer"><ProfileLogo name="GitHub"/>View source <span aria-hidden="true">↗</span></a><a className="text-link" href={roadLens.demo} target="_blank" rel="noopener noreferrer">Watch walkthrough <span aria-hidden="true">↗</span></a></div></div>
          </article></Reveal>
        <div className="labs-grid">
          <Reveal className="lab-card"><p className="eyebrow">Open source / PowerShell</p><h3>Tools built to investigate.</h3><p>NetTrace for Windows diagnostics, DebugURL for DNS, TLS and HTTP analysis, and PrivateDNSZones for Azure DNS automation.</p><p className="card-note">Three published modules · 400+ combined downloads</p><a className="text-link" href={profileLinks[3][1]} target="_blank" rel="noopener noreferrer">Explore PowerShell modules <span aria-hidden="true">↗</span></a></Reveal>
          <Reveal className="lab-card"><p className="eyebrow">Applied learning / Homelab</p><h3>Learning by building.</h3><p>Ubuntu LTS and Docker for testing and hobby projects. Terraform and Git for repeatable lab deployments, version control and technical investigation.</p><p className="card-note">Lab experience only</p><details><summary>View lab and learning details <span aria-hidden="true">+</span></summary><p>These projects support my learning; they do not imply production ownership. I also built practical solutions at Microsoft Global Hackathon in 2024, 2025 and 2026.</p></details></Reveal>
        </div>
      </div></section>
      <section id="testimonials" className="testimonials-section section-pad" aria-labelledby="testimonials-heading"><div className="shell">
        <Reveal><div className="section-heading"><p className="eyebrow">05 / Working together</p><h2 id="testimonials-heading">Testimonials.</h2><p>Recommendations shared by people I’ve worked with, in their own words.</p></div></Reveal>
        <TestimonialTicker />
      </div></section>
      <section id="contact" className="contact-section section-pad"><div className="shell"><Reveal><p className="eyebrow">06 / Let’s connect</p><h2>A conversation<br/>is a good start.</h2><p>Want to talk about my work, exchange ideas or explore working together?</p><a className="contact-email" href="mailto:khannaveed2020@outlook.com">Send me an email <span aria-hidden="true">↗</span></a><div className="social-links">{profileLinks.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer"><ProfileLogo name={label} />{label}<span aria-hidden="true">↗</span></a>)}</div></Reveal></div></section>
    </main>
    <SkillsTicker />
    <footer className="shell"><span>Naveed Khan</span><span>Curiosity, in progress.</span><a href="#about">Back to top <span aria-hidden="true">↑</span></a></footer>
    </div>
  </MotionConfig>
}

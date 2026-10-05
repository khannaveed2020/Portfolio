import { useEffect, useState } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { Character } from './Character'
import { credentials, experience, expertise, profileLinks } from './content'

const resume = `${import.meta.env.BASE_URL}Naveed_Khan_Resume.pdf`
const navigation = [['about', 'About Me'], ['work', 'About My Work'], ['credentials', 'Credentials & Labs']] as const

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  // Visible in server-rendered HTML; enhancement adds movement without hiding content.
  return <motion.div className={className} initial={false} whileInView={reduced ? undefined : { y: [12, 0] }} viewport={{ once: true, amount: .15 }} transition={{ duration: .5 }}>{children}</motion.div>
}

export function App() {
  const [active, setActive] = useState('about')
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
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#about" aria-label="nk. — Naveed Khan, back to introduction">nk<span>.</span></a>
      <nav aria-label="Main navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <a className="resume-link" href={resume} target="_blank" rel="noopener noreferrer" aria-label="Open Naveed Khan résumé PDF">Résumé <span aria-hidden="true">↗</span></a>
    </header>
    <main id="main">
      <section id="about" className="about-section">
        <div className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line"/> A little about me</p>
            <h1>Naveed<br/><span>Khan.</span></h1>
            <p className="hero-line">Curious by nature.<br/>Determined in practice.</p>
            <p className="intro">I learn how things work, explore new possibilities and keep looking for a way forward.</p>
            <p className="draft-note">Personal introduction in progress.</p>
            <div className="hero-actions"><a className="button" href="#work">Explore my work <span aria-hidden="true">↗</span></a><a className="text-link" href="#interests">Meet the person <span aria-hidden="true">↓</span></a></div>
          </div>
          <Character />
          <div className="hero-bottom"><span>Based in India</span><a href="#interests">A few things that keep me curious <span aria-hidden="true">↓</span></a><span className="edition">Personal portfolio / 01</span></div>
        </div>
        <div id="interests" className="shell interests">
          <Reveal><div className="section-heading"><p className="eyebrow">01 / Beyond the work</p><h2>Room for curiosity.</h2><p>Learning also happens away from a screen.</p></div></Reveal>
          <Reveal className="story"><div className="photo-placeholder flying" role="img" aria-label="Placeholder for Naveed’s flying photograph"><span className="horizon"/><span className="photo-label">01 / In the air</span><span className="photo-caption">Flying photograph to follow</span></div><div className="story-copy"><p className="eyebrow">A different perspective</p><h3>Learning to fly.</h3><p>More than 10 hours of hands-on flight experience in a Cessna 172. My interest in aviation continues through flight simulation on VATSIM and IVAO.</p><span className="small-label">General aviation · Flight simulation</span></div></Reveal>
          <Reveal className="story story-reverse"><div className="photo-placeholder diving" role="img" aria-label="Placeholder for Naveed’s scuba-diving photograph"><span className="water-lines"/><span className="photo-label">02 / Under the surface</span><span className="photo-caption">Scuba photograph to follow</span></div><div className="story-copy"><p className="eyebrow">Another world to explore</p><h3>Below the surface.</h3><p>Scuba diving in the Indian Ocean is another part of my story. A personal photograph and the story behind it will follow.</p><span className="small-label">Scuba diving · Indian Ocean</span></div></Reveal>
        </div>
      </section>
      <section id="work" className="work-section section-pad"><div className="shell">
        <Reveal><div className="section-heading"><p className="eyebrow">02 / About my work</p><h2>Making sense of<br/>complex problems.</h2><p>Senior Support Escalation Engineer at Microsoft, with more than 15 years across Azure networking, enterprise networking, network security and technical escalations.</p></div></Reveal>
        <Reveal className="work-intro"><p className="lead">From the first investigation to a practical way forward.</p><p>My work combines technical diagnosis, customer communication and collaboration with engineering teams. I also publish PowerShell tools and continue learning through practical labs.</p></Reveal>
        <div className="experience-list">{experience.map((job, i) => <Reveal key={`${job.company}-${job.date}`}><article className="experience"><div className="experience-index">0{i + 1}</div><div className="experience-content"><div className="role-meta"><h3>{job.company}</h3><span>{job.date}</span></div><h4>{job.role}</h4><p>{job.summary}</p><details><summary>View experience details <span aria-hidden="true">+</span></summary><ul>{job.bullets.map(b => <li key={b}>{b}</li>)}</ul></details></div></article></Reveal>)}</div>
        <Reveal><details className="expertise"><summary>Explore technical capabilities <span aria-hidden="true">+</span></summary><dl>{expertise.map(([name, text]) => <div key={name}><dt>{name}</dt><dd>{text}</dd></div>)}</dl></details></Reveal>
      </div></section>
      <section id="credentials" className="section-pad"><div className="shell">
        <Reveal><div className="section-heading"><p className="eyebrow">03 / Credentials & Labs</p><h2>Keep learning.<br/>Make things useful.</h2><p>Professional credentials, open-source tools and hands-on experiments. Lab experience is labelled separately from production work.</p></div></Reveal>
        <div className="labs-grid">
          <Reveal className="lab-card"><p className="eyebrow">Open source / PowerShell</p><h3>Tools built to investigate.</h3><p>NetTrace for Windows diagnostics, DebugURL for DNS, TLS and HTTP analysis, and PrivateDNSZones for Azure DNS automation.</p><p className="card-note">Three published modules · 400+ combined downloads</p><a className="text-link" href={profileLinks[3][1]} target="_blank" rel="noopener noreferrer">Explore PowerShell modules <span aria-hidden="true">↗</span></a></Reveal>
          <Reveal className="lab-card"><p className="eyebrow">Applied learning / Homelab</p><h3>Learning by building.</h3><p>Ubuntu LTS and Docker for testing and hobby projects. Terraform and Git for repeatable lab deployments, version control and technical investigation.</p><p className="card-note">Lab experience only</p><details><summary>View lab and learning details <span aria-hidden="true">+</span></summary><p>These projects support my learning; they do not imply production ownership. I also built practical solutions at Microsoft Global Hackathon in 2024, 2025 and 2026.</p></details></Reveal>
        </div>
        <div className="credential-list">{credentials.map(([name, text]) => <Reveal key={name}><details><summary>{name}<span aria-hidden="true">+</span></summary><p>{text}</p></details></Reveal>)}</div>
        <div className="credential-footer"><p>Credentials are listed as recorded in my résumé.</p><a className="text-link" href={profileLinks[2][1]} target="_blank" rel="noopener noreferrer">View credential badges <span aria-hidden="true">↗</span></a></div>
        <details className="education"><summary>Education & languages <span aria-hidden="true">+</span></summary><p>Diploma in Computer Science Engineering — JSS PPH, Mysore, India, 2007–2010, GPA 8.3/10.</p><p>SSLC Class 10 — JVD High School, India, 2006–2007, GPA 6.1/10.</p><p>English, Hindi and Urdu (fluent); Kannada (professional working proficiency); Tamil, Arabic and Indian Sign Language (basic).</p></details>
      </div></section>
      <section id="contact" className="contact-section section-pad"><div className="shell"><Reveal><p className="eyebrow">04 / Let’s connect</p><h2>A conversation<br/>is a good start.</h2><p>Based in India and exploring opportunities in New Zealand, especially Auckland and the North Island. Relocation requires employer-supported AEWV sponsorship.</p><a className="contact-email" href="mailto:khannaveed2020@outlook.com">khannaveed2020@outlook.com <span aria-hidden="true">↗</span></a><div className="social-links">{profileLinks.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true">↗</span></a>)}</div></Reveal></div></section>
    </main>
    <footer className="shell"><span>Naveed Khan</span><span>Curiosity, in progress.</span><a href="#about">Back to top <span aria-hidden="true">↑</span></a></footer>
  </MotionConfig>
}

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

export function CompanyLogo({ name }: { name: string }) {
  if (name === 'Microsoft') return <svg className="company-logo microsoft-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#7fba00" d="M13 1h10v10H13z"/><path fill="#00a4ef" d="M1 13h10v10H1z"/><path fill="#ffb900" d="M13 13h10v10H13z"/></svg>
  const file = name.startsWith('Wipro') ? 'wipro' : name.startsWith('HCL') ? 'hcl' : name === 'Azure' ? 'azure' : 'mphasis'
  return <img className={`company-logo ${file}-logo`} src={`${import.meta.env.BASE_URL}logos/${file}.svg`} alt="" width="64" height="40" />
}

export function ProfileLogo({ name }: { name: string }) {
  // Local vector marks: no external requests or icon-library runtime.
  if (name === 'Credly') return <img className="profile-logo credly-logo" src={`${import.meta.env.BASE_URL}credly.svg`} alt="" width="44" height="24" />
  return <svg className={`profile-logo logo-${name.split(' ')[0].toLowerCase()}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {name === 'LinkedIn' ? <><rect x="1" y="1" width="22" height="22" rx="3" fill="currentColor"/><path d="M5 9h3v10H5zm1.5-4.3a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2M10 9h3v1.3c1-1.7 5.9-2.5 5.9 3.5V19h-3v-4.7c0-2.6-2.9-2.6-2.9 0V19h-3z" fill="#10191c"/></> : name === 'GitHub' ? <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.6 1.3 3.3 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.2 5 18.2 5.3 18.2 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7"/> : <><path fill="currentColor" d="M5 3h18l-4 18H1z"/><path d="m8 8 6 4-8 5m8 0h4" fill="none" stroke="#10191c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
  </svg>
}

export function OrganisationLogo({ name }: { name: string }) {
  const files: Record<string, string> = { Cisco: 'cisco.svg', 'Check Point': 'checkpoint.svg', ISC2: 'isc2.svg', 'Kepner-Tregoe': 'kepner-tregoe.png', 'Linux Academy': 'linuxacademy.png', 'Linux Foundation': 'linuxfoundation.svg', Wireshark: 'wireshark.svg' }
  return <img className={`organisation-logo organisation-${name.toLowerCase().replaceAll(' ', '-')}`} src={`${import.meta.env.BASE_URL}logos/${files[name]}`} alt={name} title={name} width="64" height="32" loading="lazy" decoding="async" />
}

export function CredentialSymbols({ group }: { group: string }) {
  const names = group === 'Security & networking' ? ['Cisco', 'Check Point', 'ISC2'] : ['Kepner-Tregoe', 'Linux Academy', 'Linux Foundation', 'Wireshark']
  return <div className="credential-symbols">{names.map(name => <OrganisationLogo name={name} key={name}/>)}</div>
}

export function StoryArt({ kind }: { kind: 'flying' | 'diving' }) {
  const [exploring, setExploring] = useState(false)
  const reduced = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const target = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [26, -26])
  const fly = kind === 'flying'
  return <div ref={target} className={`photo-placeholder story-art ${kind} ${exploring ? 'exploring' : ''}`}>
    <span className="photo-label">{fly ? '01 / In the air' : '02 / Under the surface'}</span>
    <motion.svg viewBox="0 0 500 340" className="story-illustration" style={{ y: reduced || !finePointer ? 0 : y }} aria-hidden="true">
      {fly ? <>
        <circle cx="385" cy="95" r="43" fill="#e6b278"/>
        <path d="M-30 255 135 155 265 248 395 169 530 270V380H-30Z" fill="#65717b"/><path d="m-30 280 150-55 155 68 95-42 160 25v104H-30Z" fill="#354754"/>
        <path d="M20 129Q168 18 393 135" className="flight-route" fill="none" stroke="#eedbc2" strokeWidth="1.5" strokeDasharray="5 7"/>
        <g className="aircraft" fill="#f6ead8" stroke="#27363d" strokeWidth="2"><path d="m238 130 11-42 12-5 4 50 59 29-2 9-63-14-5 28-18-2 7-27-34-13 2-8 30 5Z"/><path d="m250 99 13-2m-14 16 14-2"/></g>
      </> : <>
        <path d="m90-10 55 0 210 350h-180Z" fill="#a5dcd3" opacity=".08"/><path d="m265-10 22 0 85 350h-72Z" fill="#a5dcd3" opacity=".07"/>
        <path d="M-20 75Q75 30 165 75T350 75T530 75" fill="none" stroke="#a3d5d0" strokeWidth="2" opacity=".4"/>
        <g className="diver" fill="#ddc8ad" stroke="#12323c" strokeWidth="2"><ellipse cx="210" cy="153" rx="18" ry="17"/><path d="m226 153 65 17-9 18-58-16Zm55 32 42 23-4 10-49-18m16-17 52 7 1 11-54-2m-61-34-30 21-5-8 30-23"/><path d="m316 207 24 0-15 15-10-5m20-24 26 4-20 12-6-7" fill="#e9b478"/><rect x="235" y="145" width="37" height="14" rx="6" fill="#81adae"/></g>
        <g className="bubbles" fill="none" stroke="#b6dfd7" opacity=".6"><circle cx="191" cy="132" r="4"/><circle cx="183" cy="113" r="6"/><circle cx="193" cy="85" r="8"/></g>
        <path d="M0 326Q86 281 148 319T270 318T390 314T510 311V360H0Z" fill="#163139"/>
      </>}
    </motion.svg>
    <span className="photo-caption">Illustrated study · personal photograph to follow</span>
    <button className="art-control" aria-label={`${exploring ? 'Reset' : fly ? 'Bank the wings' : 'Take a dive'} — ${fly ? 'aircraft' : 'diving'} illustration`} aria-pressed={exploring} onClick={() => setExploring(!exploring)}>{exploring ? 'Reset' : fly ? 'Bank the wings' : 'Take a dive'} <span aria-hidden="true">↗</span></button>
  </div>
}

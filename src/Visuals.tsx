export function CompanyLogo({ name }: { name: string }) {
  if (name === 'Microsoft') return <svg className="company-logo microsoft-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#7fba00" d="M13 1h10v10H13z"/><path fill="#00a4ef" d="M1 13h10v10H1z"/><path fill="#ffb900" d="M13 13h10v10H13z"/></svg>
  const file = name.startsWith('Wipro') ? 'wipro' : name.startsWith('HCL') ? 'hcl' : name === 'Azure' ? 'azure' : 'mphasis'
  return <img draggable={false} className={`company-logo ${file}-logo`} src={`${import.meta.env.BASE_URL}logos/${file}.svg`} alt="" width="64" height="40" />
}

export function ProfileLogo({ name }: { name: string }) {
  // Local vector marks: no external requests or icon-library runtime.
  if (name === 'Credly') return <img draggable={false} className="profile-logo credly-logo" src={`${import.meta.env.BASE_URL}credly.svg`} alt="" width="44" height="24" />
  return <svg className={`profile-logo logo-${name.split(' ')[0].toLowerCase()}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {name === 'LinkedIn' ? <><rect x="1" y="1" width="22" height="22" rx="3" fill="currentColor"/><path d="M5 9h3v10H5zm1.5-4.3a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2M10 9h3v1.3c1-1.7 5.9-2.5 5.9 3.5V19h-3v-4.7c0-2.6-2.9-2.6-2.9 0V19h-3z" fill="#10191c"/></> : name === 'GitHub' ? <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.6 1.3 3.3 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.2 5 18.2 5.3 18.2 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7"/> : <><path fill="currentColor" d="M5 3h18l-4 18H1z"/><path d="m8 8 6 4-8 5m8 0h4" fill="none" stroke="#10191c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>}
  </svg>
}

export function OrganisationLogo({ name }: { name: string }) {
  const files: Record<string, string> = { Cisco: 'cisco.svg', 'Check Point': 'checkpoint.svg', ISC2: 'isc2.svg', 'Kepner-Tregoe': 'kepner-tregoe.png', 'Linux Academy': 'linuxacademy.png', 'Linux Foundation': 'linuxfoundation.svg', Wireshark: 'wireshark.svg' }
  return <img draggable={false} className={`organisation-logo organisation-${name.toLowerCase().replaceAll(' ', '-')}`} src={`${import.meta.env.BASE_URL}logos/${files[name]}`} alt={name} title={name} width="64" height="32" loading="lazy" decoding="async" />
}

export function CredentialSymbols({ group }: { group: string }) {
  const names = group === 'Security & networking' ? ['Cisco', 'Check Point', 'ISC2'] : ['Kepner-Tregoe', 'Linux Academy', 'Linux Foundation', 'Wireshark']
  return <div className="credential-symbols">{names.map(name => <OrganisationLogo name={name} key={name}/>)}</div>
}

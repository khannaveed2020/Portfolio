import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

export function Character() {
  const reduced = useReducedMotion()
  const host = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const pupilX = useSpring(x, { stiffness: 150, damping: 24 })
  const pupilY = useSpring(y, { stiffness: 150, damping: 24 })

  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    const follow = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = host.current?.getBoundingClientRect()
        if (!rect) return
        const dx = event.clientX - rect.left - rect.width / 2
        const dy = event.clientY - rect.top - rect.height / 2
        // The companion reacts only nearby, so it does not compete with reading.
        if (docked && Math.hypot(dx, dy) > 180) { x.set(0); y.set(0); return }
        x.set(Math.max(-5, Math.min(5, dx / 65)))
        y.set(Math.max(-4, Math.min(4, dy / 65)))
      })
    }
    const reset = () => { x.set(0); y.set(0) }
    window.addEventListener('pointermove', follow, { passive: true })
    document.addEventListener('pointerleave', reset)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', follow); document.removeEventListener('pointerleave', reset) }
  }, [reduced, docked, x, y])

  useEffect(() => {
    if (reduced) return
    const desktop = matchMedia('(min-width: 1100px) and (hover: hover) and (pointer: fine)')
    const check = () => setDocked(desktop.matches && window.scrollY > window.innerHeight * .72)
    check()
    window.addEventListener('scroll', check, { passive: true })
    desktop.addEventListener('change', check)
    return () => { window.removeEventListener('scroll', check); desktop.removeEventListener('change', check) }
  }, [reduced])

  return <div className="character-slot">
    <motion.div ref={host} className={`character ${docked ? 'character-docked' : ''}`} layout={!reduced} transition={{ duration: .45, ease: 'easeInOut' }} aria-hidden="true">
      <div className="portrait-halo" />
      <svg viewBox="0 0 400 420" className="portrait" focusable="false">
        <defs><linearGradient id="shirt" x2="0" y2="1"><stop stopColor="#40686e"/><stop offset="1" stopColor="#233d44"/></linearGradient></defs>
        <ellipse cx="200" cy="384" rx="142" ry="14" fill="#080f12" opacity=".45"/>
        <path d="M65 377 Q72 290 153 282 L247 282 Q328 290 335 377Z" fill="url(#shirt)"/>
        <path d="M166 259 V294 Q200 326 234 294 V259" fill="#bb8770"/>
        <path d="M147 290 L183 325 160 348 130 300 M253 290 L217 325 240 348 270 300" fill="#517c81"/>
        <motion.g style={{ rotate: pupilX, x: pupilX, y: pupilY, transformOrigin: '200px 245px' }}>
          <ellipse cx="114" cy="200" rx="17" ry="27" fill="#c79176"/><ellipse cx="286" cy="200" rx="17" ry="27" fill="#c79176"/>
          <path d="M111 153 Q109 79 200 77 Q291 79 289 153 L276 229 Q264 282 200 288 Q136 281 124 229Z" fill="#d6a286"/>
          <path d="M115 176 Q94 91 152 64 Q211 35 266 82 Q310 106 284 180 L268 126 Q224 132 181 102 Q153 130 126 134Z" fill="#293139"/>
          <path d="M139 171 Q155 163 171 170 M230 170 Q246 163 263 171" stroke="#3a3634" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <g className="eyes"><ellipse cx="155" cy="191" rx="17" ry="11" fill="#f4ece3"/><ellipse cx="246" cy="191" rx="17" ry="11" fill="#f4ece3"/>
            <motion.g style={{ x: pupilX, y: pupilY }}><circle cx="155" cy="191" r="6" fill="#27323a"/><circle cx="246" cy="191" r="6" fill="#27323a"/><circle cx="157" cy="189" r="2" fill="white"/><circle cx="248" cy="189" r="2" fill="white"/></motion.g>
          </g>
          <path d="M201 192 L192 221 Q201 225 210 220" stroke="#ae775f" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M132 229 Q143 267 200 276 Q256 267 268 229 Q239 249 200 246 Q161 249 132 229Z" fill="#343638"/>
          <path d="M179 239 Q200 253 221 239" stroke="#f4e5d9" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </motion.g>
        <circle cx="200" cy="351" r="3" fill="#87aaa9"/>
      </svg>
      <span className="portrait-note">Portrait study · placeholder</span>
    </motion.div>
  </div>
}

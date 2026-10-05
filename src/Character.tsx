import { useEffect, useId, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

const portrait = `${import.meta.env.BASE_URL}character/naveed-anime.webp`
const eyes = [
  { x: 427, y: 507, shape: 'M372 506 Q421 467 472 502 Q451 529 414 527 Q389 526 372 506Z', lid: 'M374 507 Q423 535 471 503' },
  { x: 638, y: 526, shape: 'M591 522 Q630 491 668 516 Q680 526 680 535 Q644 554 615 539Z', lid: 'M591 523 Q638 554 681 535' },
]

export function Character() {
  const reduced = useReducedMotion()
  const id = useId().replace(/:/g, '')
  const host = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const pupilX = useSpring(x, { stiffness: 150, damping: 24 })
  const pupilY = useSpring(y, { stiffness: 150, damping: 24 })
  const tilt = useTransform(pupilX, [-12, 12], [-1.4, 1.4])
  const headY = useTransform(pupilY, [-7, 7], [-3, 3])

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    const reset = () => {
      cancelAnimationFrame(frame)
      x.set(0); y.set(0)
      pupilX.jump(0); pupilY.jump(0)
    }
    const follow = (event: PointerEvent) => {
      if (reduced || !fine.matches || event.pointerType === 'touch') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = host.current?.getBoundingClientRect()
        if (!rect) return
        const dx = event.clientX - rect.left - rect.width / 2
        const dy = event.clientY - rect.top - rect.height * .35
        // Away from the hero, only react to a nearby pointer.
        if (docked && Math.hypot(dx, dy) > 180) { x.set(0); y.set(0); return }
        x.set(Math.max(-12, Math.min(12, dx / 30)))
        y.set(Math.max(-7, Math.min(7, dy / 40)))
      })
    }
    reset()
    window.addEventListener('pointermove', follow, { passive: true })
    window.addEventListener('blur', reset)
    document.addEventListener('pointerleave', reset)
    fine.addEventListener('change', reset)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', follow)
      window.removeEventListener('blur', reset)
      document.removeEventListener('pointerleave', reset)
      fine.removeEventListener('change', reset)
    }
  }, [reduced, docked, x, y, pupilX, pupilY])

  useEffect(() => {
    const desktop = matchMedia('(min-width: 1100px) and (hover: hover) and (pointer: fine)')
    const check = () => setDocked(!reduced && desktop.matches && window.scrollY > window.innerHeight * .72)
    check()
    window.addEventListener('scroll', check, { passive: true })
    desktop.addEventListener('change', check)
    return () => { window.removeEventListener('scroll', check); desktop.removeEventListener('change', check) }
  }, [reduced])

  return <div className="character-slot">
    <motion.div ref={host} className={`character ${docked ? 'character-docked' : ''}`} layout={!reduced} transition={{ duration: .45, ease: 'easeInOut' }} aria-hidden="true">
      <div className="portrait-halo" />
      <svg viewBox="-35 -20 1094 1576" className="portrait" focusable="false">
        <defs>
          <clipPath id={`${id}-body`}><path d="M0 880 H1024 V1536 H0Z" /></clipPath>
          <clipPath id={`${id}-head`}><path d="M0 0 H1024 V880 L720 880 680 950 330 950 280 880 H0Z" /></clipPath>
          <radialGradient id={`${id}-iris`}><stop stopColor="#9b7347"/><stop offset=".65" stopColor="#62462e"/><stop offset="1" stopColor="#292522"/></radialGradient>
          {eyes.map((eye, index) => <clipPath key={index} id={`${id}-eye-${index}`}><path d={eye.shape}/></clipPath>)}
        </defs>
        <image href={portrait} width="1024" height="1536" clipPath={`url(#${id}-body)`}/>
        <motion.g className="portrait-head" style={{ rotate: tilt, y: headY, originX: .5, originY: .605 }}>
          <image href={portrait} width="1024" height="1536" clipPath={`url(#${id}-head)`}/>
          {eyes.map((eye, index) => <g key={index} clipPath={`url(#${id}-eye-${index})`}>
            <motion.g className="portrait-pupils" style={{ x: pupilX, y: pupilY }}>
              <ellipse cx={eye.x} cy={eye.y} rx="21" ry="23" fill={`url(#${id}-iris)`}/>
              <ellipse cx={eye.x} cy={eye.y} rx="10" ry="13" fill="#191b1b"/>
              <circle cx={eye.x - 6} cy={eye.y - 8} r="5" fill="#fff5df"/>
              <circle cx={eye.x + 7} cy={eye.y + 8} r="2" fill="#dcb886"/>
            </motion.g>
            <g className="portrait-blink">
              <path d={eye.shape} fill="#c99163"/>
              <path d={eye.lid} fill="none" stroke="#483329" strokeWidth="5"/>
            </g>
          </g>)}
        </motion.g>
      </svg>
    </motion.div>
  </div>
}

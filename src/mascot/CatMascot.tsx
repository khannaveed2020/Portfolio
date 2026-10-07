import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './cat-mascot.css'

type CatState =
  | 'headerWalk'
  | 'docking'
  | 'sit'
  | 'pawLick'
  | 'headTilt'
  | 'yawn'
  | 'annoyed'
  | 'returning'
  | 'reducedStatic'
const SCROLL_THRESHOLD = 80
const YAWN_DELAY = 5000
const ANNOYED_DURATION = 1500
const WALK_CYCLE_DURATION = 0.96
const WALK_SPEED = 14.5
const TURN_PAUSE = 0.12

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function CatMascot() {
  const [ready, setReady] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const activateRef = useRef<() => void>(() => undefined)

  useEffect(() => {
    const layer = layerRef.current
    const button = buttonRef.current
    if (!layer || !button) return

    const svg = button.querySelector<SVGSVGElement>('svg')
    const catArt = button.querySelector<SVGGElement>('#catArt')
    const bodyRig = button.querySelector<SVGGElement>('#bodyRig')
    const headRig = button.querySelector<SVGGElement>('#headRig')
    const tail = button.querySelector<SVGGElement>('#tail')
    const earL = button.querySelector<SVGGElement>('#earL')
    const earR = button.querySelector<SVGGElement>('#earR')
    const pupils = button.querySelectorAll<SVGGElement>('#pupilL, #pupilR')
    const eyelids = button.querySelectorAll<SVGGElement>('#eyelidL, #eyelidR')
    const mouthOpen = button.querySelector<SVGEllipseElement>('.mouth-open')
    const legFL = button.querySelector<SVGGElement>('#legFL')
    const legFR = button.querySelector<SVGGElement>('#legFR')
    const legBL = button.querySelector<SVGGElement>('#legBL')
    const legBR = button.querySelector<SVGGElement>('#legBR')
    const motionFL = button.querySelector<SVGGElement>('#motionFL')
    const motionFR = button.querySelector<SVGGElement>('#motionFR')
    const motionBL = button.querySelector<SVGGElement>('#motionBL')
    const motionBR = button.querySelector<SVGGElement>('#motionBR')
    const upperFL = button.querySelector<SVGGElement>('#upperFL')
    const upperFR = button.querySelector<SVGGElement>('#upperFR')
    const upperBL = button.querySelector<SVGGElement>('#upperBL')
    const upperBR = button.querySelector<SVGGElement>('#upperBR')
    const lowerFL = button.querySelector<SVGGElement>('#lowerFL')
    const lowerFR = button.querySelector<SVGGElement>('#lowerFR')
    const lowerBL = button.querySelector<SVGGElement>('#lowerBL')
    const lowerBR = button.querySelector<SVGGElement>('#lowerBR')
    const pawFL = button.querySelector<SVGGElement>('#pawFL')
    const pawFR = button.querySelector<SVGGElement>('#pawFR')
    const pawBL = button.querySelector<SVGGElement>('#pawBL')
    const pawBR = button.querySelector<SVGGElement>('#pawBR')
    if (
      !svg ||
      !catArt ||
      !bodyRig ||
      !headRig ||
      !tail ||
      !earL ||
      !earR ||
      !mouthOpen ||
      !legFL ||
      !legFR ||
      !legBL ||
      !legBR ||
      !motionFL ||
      !motionFR ||
      !motionBL ||
      !motionBR ||
      !upperFL ||
      !upperFR ||
      !upperBL ||
      !upperBR ||
      !lowerFL ||
      !lowerFR ||
      !lowerBL ||
      !lowerBR ||
      !pawFL ||
      !pawFR ||
      !pawBL ||
      !pawBR
    ) return

    const legRigs = [
      { outer: motionBR, upper: upperBR, lower: lowerBR, paw: pawBR, offset: 0 },
      { outer: motionFR, upper: upperFR, lower: lowerFR, paw: pawFR, offset: 0.25 },
      { outer: motionBL, upper: upperBL, lower: lowerBL, paw: pawBL, offset: 0.5 },
      { outer: motionFL, upper: upperFL, lower: lowerFL, paw: pawFL, offset: 0.75 },
    ]

    const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerQuery = matchMedia('(hover: hover) and (pointer: fine)')
    let state: CatState = 'headerWalk'
    let cornerMode = window.scrollY > SCROLL_THRESHOLD
    let walkTimeline: gsap.core.Timeline | undefined
    let walkCycleTimeline: gsap.core.Timeline | undefined
    let sitTimeline: gsap.core.Tween | undefined
    let reactionTimeline: gsap.core.Timeline | undefined
    let positionTween: gsap.core.Tween | undefined
    let blinkTimeline: gsap.core.Timeline | undefined
    let earTimeline: gsap.core.Timeline | undefined
    let variationTimeline: gsap.core.Timeline | undefined
    let blinkTimer: number | undefined
    let earTimer: number | undefined
    let variationTimer: number | undefined
    let yawnTimer: number | undefined
    let annoyedTimer: number | undefined
    let resizeFrame = 0
    let pointerFrame = 0
    let pointerTargetX = 0
    let pointerTargetY = 0
    let pupilX = 0
    let pupilY = 0
    let hasYawnedSincePointer = false
    let variationIndex = 0

    const setState = (next: CatState) => {
      state = next
      button.dataset.state = next
    }

    const clearTimer = (timer: number | undefined) => {
      if (timer !== undefined) window.clearTimeout(timer)
    }

    const clearAmbientTimers = () => {
      clearTimer(blinkTimer)
      clearTimer(earTimer)
      clearTimer(variationTimer)
      blinkTimer = undefined
      earTimer = undefined
      variationTimer = undefined
    }

    const clearIdleTimers = () => {
      clearAmbientTimers()
      clearTimer(yawnTimer)
      yawnTimer = undefined
    }

    const stopPointerTracking = () => {
      cancelAnimationFrame(pointerFrame)
      pointerFrame = 0
      pointerTargetX = 0
      pointerTargetY = 0
      pupilX = 0
      pupilY = 0
      gsap.set(pupils, { x: 0, y: 0 })
    }

    const resetExpression = () => {
      gsap.set(headRig, { rotate: 0, x: 0, y: 0 })
      gsap.set([earL, earR], { rotate: 0 })
      gsap.set(tail, { rotate: 0 })
      gsap.set(bodyRig, { rotate: 0, x: 0, y: 0 })
      gsap.set(eyelids, { scaleY: 0 })
      gsap.set(mouthOpen, { opacity: 0, scaleY: 0.08 })
      gsap.set([motionFL, motionFR, motionBL, motionBR], { rotate: 0, x: 0, y: 0 })
      gsap.set([upperFL, upperFR, upperBL, upperBR], { rotate: 0 })
      gsap.set([lowerFL, lowerFR, lowerBL, lowerBR], { rotate: 0 })
      gsap.set([pawFL, pawFR, pawBL, pawBR], { rotate: 0 })
      gsap.set(catArt, { x: 0, y: 0, rotate: 0 })
    }

    const stopActivity = () => {
      clearIdleTimers()
      clearTimer(annoyedTimer)
      annoyedTimer = undefined
      walkTimeline?.kill()
      walkTimeline = undefined
      walkCycleTimeline?.kill()
      walkCycleTimeline = undefined
      sitTimeline?.kill()
      sitTimeline = undefined
      reactionTimeline?.kill()
      reactionTimeline = undefined
      positionTween?.kill()
      positionTween = undefined
      blinkTimeline?.kill()
      blinkTimeline = undefined
      earTimeline?.kill()
      earTimeline = undefined
      variationTimeline?.kill()
      variationTimeline = undefined
      stopPointerTracking()
      resetExpression()
    }

    const measure = () => {
      const wordmark = document.querySelector<HTMLElement>('.wordmark')
      const navigation = document.querySelector<HTMLElement>('.site-header nav')
      const resume = document.querySelector<HTMLElement>('.resume-link')
      const header = document.querySelector<HTMLElement>('.site-header')
      const wordmarkRect = wordmark?.getBoundingClientRect()
      const navigationRect = navigation?.getBoundingClientRect()
      const resumeRect = resume?.getBoundingClientRect()
      const headerRect = header?.getBoundingClientRect()
      const baseWidth = button.offsetWidth || 64
      const baseHeight = button.offsetHeight || 58
      const headerStartX = clamp((wordmarkRect?.right ?? 70) + 10, 12, window.innerWidth - baseWidth - 12)
      const firstObstacle = Math.min(
        navigationRect && navigationRect.top < 48 ? navigationRect.left : Number.POSITIVE_INFINITY,
        resumeRect?.left ?? Number.POSITIVE_INFINITY,
      )
      const availableEnd = Number.isFinite(firstObstacle) ? firstObstacle - baseWidth - 10 : window.innerWidth - baseWidth - 16
      const headerEndX = clamp(Math.max(headerStartX, availableEnd), headerStartX, window.innerWidth - baseWidth - 12)
      const headerY = clamp((headerRect?.top ?? 0) + 7, 5, 18)
      const cornerScale = window.innerWidth <= 650 ? 1.18 : 1.37
      const safeMargin = window.innerWidth <= 650 ? 12 : 18
      return {
        headerStartX,
        headerEndX,
        headerY,
        cornerScale,
        cornerX: window.innerWidth - baseWidth * cornerScale - safeMargin,
        cornerY: window.innerHeight - baseHeight * cornerScale - (window.innerWidth <= 650 ? 84 : safeMargin),
      }
    }

    const startPointerTracking = () => {
      if (!finePointerQuery.matches || reducedQuery.matches || pointerFrame) return
      const tick = () => {
        pupilX += (pointerTargetX - pupilX) * 0.14
        pupilY += (pointerTargetY - pupilY) * 0.14
        gsap.set(pupils, { x: pupilX, y: pupilY })
        if (Math.abs(pointerTargetX - pupilX) + Math.abs(pointerTargetY - pupilY) > 0.02) {
          pointerFrame = requestAnimationFrame(tick)
        } else {
          pupilX = pointerTargetX
          pupilY = pointerTargetY
          gsap.set(pupils, { x: pupilX, y: pupilY })
          pointerFrame = 0
        }
      }
      pointerFrame = requestAnimationFrame(tick)
    }

    const scheduleBlink = () => {
      clearTimer(blinkTimer)
      blinkTimer = window.setTimeout(() => {
        if (state !== 'sit') return
        blinkTimeline = gsap.timeline({ onComplete: () => { blinkTimeline = undefined } })
          .to(eyelids, { scaleY: 1, duration: 0.08, ease: 'power1.in' })
          .to(eyelids, { scaleY: 0, duration: 0.11, ease: 'power1.out' })
        scheduleBlink()
      }, gsap.utils.random(2800, 6200, 1))
    }

    const scheduleEarTwitch = () => {
      clearTimer(earTimer)
      earTimer = window.setTimeout(() => {
        if (state !== 'sit') return
        earTimeline = gsap.timeline({ onComplete: () => { earTimeline = undefined } })
          .to(earR, { rotate: 8, duration: 0.09, ease: 'power1.inOut' })
          .to(earR, { rotate: -3, duration: 0.09, ease: 'power1.inOut' })
          .to(earR, { rotate: 0, duration: 0.12, ease: 'power1.out' })
        scheduleEarTwitch()
      }, gsap.utils.random(4300, 8200, 1))
    }

    let startSit = () => undefined
    let scheduleVariation = () => undefined

    const playYawn = () => {
      if (state !== 'sit' || reducedQuery.matches) return
      clearIdleTimers()
      hasYawnedSincePointer = true
      setState('yawn')
      reactionTimeline = gsap.timeline({
        onComplete: () => {
          reactionTimeline = undefined
          resetExpression()
          startSit()
        },
      })
      reactionTimeline
        .to(headRig, { rotate: -5, y: -2, duration: 0.35, ease: 'power2.out' }, 0)
        .to(eyelids, { scaleY: 0.72, duration: 0.28, ease: 'power2.out' }, 0.08)
        .to(mouthOpen, { opacity: 1, scaleY: 2.5, duration: 0.42, ease: 'back.out(1.6)' }, 0.12)
        .to(mouthOpen, { opacity: 0, scaleY: 0.08, duration: 0.25, ease: 'power2.in' }, '>+0.5')
        .to(headRig, { rotate: 0, y: 0, duration: 0.3, ease: 'power2.inOut' }, '<')
        .to(eyelids, { scaleY: 0, duration: 0.3, ease: 'power2.inOut' }, '<')
    }

    const scheduleYawn = () => {
      clearTimer(yawnTimer)
      yawnTimer = undefined
      if (hasYawnedSincePointer) return
      yawnTimer = window.setTimeout(playYawn, YAWN_DELAY)
    }

    const finishVariation = () => {
      variationTimeline = undefined
      if (state !== 'pawLick' && state !== 'headTilt') return
      gsap.set(headRig, { rotate: 0, x: 0, y: 0 })
      gsap.set(motionFL, { rotate: 0, x: 0, y: 0 })
      gsap.set([upperFL, lowerFL, pawFL], { rotate: 0 })
      gsap.set(eyelids, { scaleY: 0 })
      setState('sit')
      scheduleBlink()
      scheduleEarTwitch()
      scheduleVariation()
    }

    const playPawLick = () => {
      if (state !== 'sit') return
      clearAmbientTimers()
      setState('pawLick')
      variationTimeline = gsap.timeline({ onComplete: finishVariation })
        .to(motionFL, {
          x: -5,
          y: -16,
          duration: 0.45,
          ease: 'power2.inOut',
        }, 0)
        .to(upperFL, {
          rotate: -34,
          duration: 0.45,
          ease: 'power2.inOut',
        }, 0)
        .to(lowerFL, {
          rotate: 48,
          duration: 0.45,
          ease: 'power2.inOut',
        }, 0)
        .to(pawFL, {
          rotate: -12,
          duration: 0.45,
          ease: 'power2.inOut',
        }, 0)
        .to(headRig, {
          rotate: -7,
          x: -2,
          y: 3,
          duration: 0.5,
          ease: 'sine.inOut',
        }, 0.1)
        .to(eyelids, {
          scaleY: 0.18,
          duration: 0.25,
          ease: 'power1.out',
        }, 0.2)
        .to(headRig, {
          rotate: -10,
          y: 5,
          duration: 0.22,
          repeat: 3,
          yoyo: true,
          ease: 'sine.inOut',
        }, 0.62)
        .to([headRig, motionFL, upperFL, lowerFL, pawFL], {
          rotate: 0,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 1.55)
        .to(eyelids, {
          scaleY: 0,
          duration: 0.3,
          ease: 'power1.inOut',
        }, 1.55)
    }

    const playHeadTilt = () => {
      if (state !== 'sit') return
      clearAmbientTimers()
      setState('headTilt')
      variationTimeline = gsap.timeline({ onComplete: finishVariation })
        .to(headRig, {
          rotate: -4,
          y: 1,
          duration: 0.72,
          ease: 'sine.inOut',
        })
        .to(headRig, {
          rotate: 2,
          y: 0,
          duration: 0.65,
          ease: 'sine.inOut',
          delay: 0.35,
        })
        .to(headRig, {
          rotate: 0,
          duration: 0.55,
          ease: 'sine.inOut',
        })
    }

    scheduleVariation = () => {
      clearTimer(variationTimer)
      variationTimer = undefined
      if (!hasYawnedSincePointer || state !== 'sit') return
      variationTimer = window.setTimeout(() => {
        if (state !== 'sit') return
        variationIndex += 1
        if (variationIndex % 2 === 0) playHeadTilt()
        else playPawLick()
      }, gsap.utils.random(5500, 9000, 1))
    }

    startSit = () => {
      stopActivity()
      setState('sit')
      gsap.set(svg, { scaleX: 1 })
      sitTimeline = gsap.to(tail, { rotate: 4, duration: 2.35, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      startPointerTracking()
      scheduleBlink()
      scheduleEarTwitch()
      scheduleYawn()
      scheduleVariation()
    }

    const walkLegPose = (sample: number, offset: number) => {
      const phase = (sample / 8 + offset) % 1
      if (phase < 0.72) {
        const progress = phase / 0.72
        return {
          x: -18 + 36 * progress,
          y: 0,
          upper: -10 + 18 * progress,
          lower: 14 - 19 * progress,
          paw: -2 - 2 * Math.sin(Math.PI * progress),
        }
      }

      const progress = (phase - 0.72) / 0.28
      return {
        x: 18 - 36 * progress,
        y: -6 * Math.sin(Math.PI * progress),
        upper: 8 - 18 * progress,
        lower: -5 + 21 * Math.sin(Math.PI * progress),
        paw: -4 + 8 * progress,
      }
    }

    const createWalkCycle = () => {
      const bodyY = [0, 1.5, 0, -1, 0, 1.5, 0, -1, 0]
      const bodyRotation = [-0.6, -0.3, 0.2, 0.6, 0.5, 0.2, -0.2, -0.6, -0.6]
      walkCycleTimeline = gsap.timeline({ repeat: -1, paused: true })

      for (const rig of legRigs) {
        const poses = Array.from(
          { length: 9 },
          (_, sample) => walkLegPose(sample % 8, rig.offset),
        )
        walkCycleTimeline
          .to(rig.outer, {
            keyframes: {
              x: poses.map((pose) => pose.x),
              y: poses.map((pose) => pose.y),
              easeEach: 'sine.inOut',
            },
            duration: WALK_CYCLE_DURATION,
            ease: 'none',
          }, 0)
          .to(rig.upper, {
            keyframes: {
              rotation: poses.map((pose) => pose.upper),
              easeEach: 'sine.inOut',
            },
            duration: WALK_CYCLE_DURATION,
            ease: 'none',
          }, 0)
          .to(rig.lower, {
            keyframes: {
              rotation: poses.map((pose) => pose.lower),
              easeEach: 'sine.inOut',
            },
            duration: WALK_CYCLE_DURATION,
            ease: 'none',
          }, 0)
          .to(rig.paw, {
            keyframes: {
              rotation: poses.map((pose) => pose.paw),
              easeEach: 'sine.inOut',
            },
            duration: WALK_CYCLE_DURATION,
            ease: 'none',
          }, 0)
      }

      walkCycleTimeline
        .to(bodyRig, {
          keyframes: {
            y: bodyY,
            rotation: bodyRotation,
            easeEach: 'sine.inOut',
          },
          duration: WALK_CYCLE_DURATION,
          ease: 'none',
        }, 0)
        .to(headRig, {
          keyframes: {
            rotation: bodyRotation.map((rotation) => rotation * -0.45),
            easeEach: 'sine.inOut',
          },
          duration: WALK_CYCLE_DURATION,
          ease: 'none',
        }, 0)
        .to(tail, {
          keyframes: {
            rotation: bodyRotation.map((rotation) => rotation * -2.2),
            easeEach: 'sine.inOut',
          },
          duration: WALK_CYCLE_DURATION,
          ease: 'none',
        }, 0)
    }

    const startWalk = (resumeX?: number, resumeRight = true) => {
      stopActivity()
      setState('headerWalk')
      const targets = measure()
      const distance = Math.max(1, targets.headerEndX - targets.headerStartX)
      const currentX = clamp(
        resumeX ?? targets.headerStartX,
        targets.headerStartX,
        targets.headerEndX,
      )
      const movingRight = resumeRight && currentX < targets.headerEndX - 1
      const firstDestination = movingRight ? targets.headerEndX : targets.headerStartX
      const secondDestination = movingRight ? targets.headerStartX : targets.headerEndX
      const quantizedDuration = (pixels: number) => Math.max(
        WALK_CYCLE_DURATION,
        Math.round((pixels / WALK_SPEED) / WALK_CYCLE_DURATION) * WALK_CYCLE_DURATION,
      )
      const firstDuration = quantizedDuration(Math.abs(firstDestination - currentX))
      const fullDuration = quantizedDuration(distance)
      gsap.set(button, { x: currentX, y: targets.headerY, scale: 1, opacity: 1 })
      createWalkCycle()
      walkTimeline = gsap.timeline({ repeat: -1 })
        .set(svg, { scaleX: movingRight ? -1 : 1 })
        .call(() => walkCycleTimeline?.play(0))
        .to(button, { x: firstDestination, duration: firstDuration, ease: 'none' })
        .call(() => walkCycleTimeline?.pause(0))
        .to({}, { duration: TURN_PAUSE })
        .set(svg, { scaleX: movingRight ? 1 : -1 })
        .call(() => walkCycleTimeline?.play(0))
        .to(button, { x: secondDestination, duration: fullDuration, ease: 'none' })
        .call(() => walkCycleTimeline?.pause(0))
        .to({}, { duration: TURN_PAUSE })
    }

    const setReducedPosition = () => {
      stopActivity()
      setState('reducedStatic')
      const targets = measure()
      gsap.set(svg, { scaleX: 1 })
      gsap.set(button, cornerMode
        ? { x: targets.cornerX, y: targets.cornerY, scale: targets.cornerScale, opacity: 1 }
        : { x: targets.headerStartX, y: targets.headerY, scale: 1, opacity: 1 })
    }

    const dock = (immediate = false) => {
      cornerMode = true
      if (reducedQuery.matches) {
        setReducedPosition()
        return
      }
      stopActivity()
      if (!immediate) hasYawnedSincePointer = false
      setState('docking')
      const targets = measure()
      gsap.set(svg, { scaleX: 1 })
      positionTween = gsap.to(button, {
        x: targets.cornerX,
        y: targets.cornerY,
        scale: targets.cornerScale,
        opacity: 1,
        duration: immediate ? 0 : 0.72,
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          positionTween = undefined
          startSit()
        },
      })
    }

    const returnToHeader = (immediate = false) => {
      cornerMode = false
      if (reducedQuery.matches) {
        setReducedPosition()
        return
      }
      stopActivity()
      setState('returning')
      const targets = measure()
      gsap.set(svg, { scaleX: 1 })
      positionTween = gsap.to(button, {
        x: targets.headerStartX,
        y: targets.headerY,
        scale: 1,
        opacity: 1,
        duration: immediate ? 0 : 0.66,
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          positionTween = undefined
          startWalk()
        },
      })
    }

    const annoy = () => {
      if (state === 'annoyed' || state === 'docking' || state === 'returning' || state === 'yawn') return
      const resumeX = state === 'headerWalk'
        ? Number(gsap.getProperty(button, 'x'))
        : undefined
      const resumeRight = Number(gsap.getProperty(svg, 'scaleX')) < 0
      if (reducedQuery.matches) {
        setState('annoyed')
        gsap.set(eyelids, { scaleY: 0.5 })
        clearTimer(annoyedTimer)
        annoyedTimer = window.setTimeout(() => {
          gsap.set(eyelids, { scaleY: 0 })
          setReducedPosition()
        }, ANNOYED_DURATION)
        return
      }

      stopActivity()
      hasYawnedSincePointer = false
      setState('annoyed')
      reactionTimeline = gsap.timeline({
        onComplete: () => {
          reactionTimeline = undefined
          resetExpression()
          if (cornerMode) startSit()
          else startWalk(resumeX, resumeRight)
        },
      })
      reactionTimeline
        .to(eyelids, { scaleY: 0.55, duration: 0.12, ease: 'power2.out' }, 0)
        .to(earL, { rotate: -28, duration: 0.18, ease: 'power2.out' }, 0)
        .to(earR, { rotate: 28, duration: 0.18, ease: 'power2.out' }, 0)
        .to(tail, { rotate: -16, duration: 0.12, repeat: 6, yoyo: true, ease: 'power1.inOut' }, 0)
        .to(catArt, { x: -2, duration: 0.06, repeat: 8, yoyo: true, ease: 'none' }, 0.12)
        .to([earL, earR, tail, catArt], { rotate: 0, x: 0, duration: 0.2, ease: 'power2.out' }, ANNOYED_DURATION / 1000 - 0.2)
        .to(eyelids, { scaleY: 0, duration: 0.18, ease: 'power2.out' }, '<')
    }

    activateRef.current = annoy

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !finePointerQuery.matches || state !== 'sit') return
      const rect = button.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width * 0.42)
      const dy = event.clientY - (rect.top + rect.height * 0.37)
      pointerTargetX = clamp(dx / 45, -3.2, 3.2)
      pointerTargetY = clamp(dy / 55, -2.2, 2.2)
      startPointerTracking()
      hasYawnedSincePointer = false
      clearTimer(variationTimer)
      variationTimer = undefined
      scheduleYawn()
    }

    const onResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(() => {
        const resumeX = Number(gsap.getProperty(button, 'x'))
        const resumeRight = Number(gsap.getProperty(svg, 'scaleX')) < 0
        if (reducedQuery.matches) setReducedPosition()
        else if (cornerMode) dock(true)
        else startWalk(resumeX, resumeRight)
      })
    }

    const onMotionPreferenceChange = () => {
      if (reducedQuery.matches) setReducedPosition()
      else if (cornerMode) dock(true)
      else startWalk()
    }

    const onPointerCapabilityChange = () => {
      if (state === 'sit') {
        stopPointerTracking()
        startPointerTracking()
      }
    }

    const onScroll = () => {
      const shouldDock = window.scrollY > SCROLL_THRESHOLD
      if (shouldDock === cornerMode) return
      if (shouldDock) dock()
      else returnToHeader()
    }

    const context = gsap.context(() => {
      gsap.set(eyelids, { scaleY: 0 })
      gsap.set(mouthOpen, { opacity: 0, scaleY: 0.08 })
      if (reducedQuery.matches) setReducedPosition()
      else if (cornerMode) dock(true)
      else startWalk()
    }, layer)
    setReady(true)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    reducedQuery.addEventListener('change', onMotionPreferenceChange)
    finePointerQuery.addEventListener('change', onPointerCapabilityChange)

    return () => {
      activateRef.current = () => undefined
      stopActivity()
      cancelAnimationFrame(resizeFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      reducedQuery.removeEventListener('change', onMotionPreferenceChange)
      finePointerQuery.removeEventListener('change', onPointerCapabilityChange)
      context.revert()
    }
  }, [])

  return <div ref={layerRef} className="cat-mascot-layer" data-ready={ready} aria-hidden={!ready}>
    <button
      ref={buttonRef}
      className="cat-mascot"
      type="button"
      disabled={!ready}
      aria-label="Grey cat mascot — activate for an annoyed reaction"
      data-state="headerWalk"
      onClick={() => activateRef.current()}
    >
      <svg viewBox="0 0 260 180" aria-hidden="true" focusable="false">
        <g id="catArt">
          <g id="tail">
            <path d="M206 112 C238 118 247 96 239 75 C231 55 247 45 253 60" fill="none" stroke="#343a3d" strokeWidth="27" strokeLinecap="round"/>
            <path d="M206 112 C238 118 247 96 239 75 C231 55 247 45 253 60" fill="none" stroke="#bec4c2" strokeWidth="19" strokeLinecap="round"/>
            <path d="M208 108 C231 113 236 96 232 84" fill="none" stroke="#e3e6e2" strokeWidth="5" strokeLinecap="round" opacity=".86"/>
          </g>
          <g id="legBL" transform="translate(183 119)">
            <g id="motionBL">
              <g id="upperBL">
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#343a3d" strokeWidth="19" strokeLinecap="round"/>
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#aeb5b3" strokeWidth="13" strokeLinecap="round"/>
                <g transform="translate(2 16)">
                  <g id="lowerBL">
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#343a3d" strokeWidth="16" strokeLinecap="round"/>
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#aeb5b3" strokeWidth="10" strokeLinecap="round"/>
                    <g transform="translate(-1 19)">
                      <g id="pawBL">
                        <path d="M-7 -2 C-3 -5 7 -5 11 -1 C12 3 7 6 0 6 C-6 6 -9 2 -7 -2Z" fill="#aeb5b3" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="legBR" transform="translate(206 116)">
            <g id="motionBR">
              <g id="upperBR">
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#343a3d" strokeWidth="19" strokeLinecap="round"/>
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#969e9c" strokeWidth="13" strokeLinecap="round"/>
                <g transform="translate(2 16)">
                  <g id="lowerBR">
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#343a3d" strokeWidth="16" strokeLinecap="round"/>
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#969e9c" strokeWidth="10" strokeLinecap="round"/>
                    <g transform="translate(-1 19)">
                      <g id="pawBR">
                        <path d="M-7 -2 C-3 -5 7 -5 11 -1 C12 3 7 6 0 6 C-6 6 -9 2 -7 -2Z" fill="#969e9c" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="bodyRig">
            <g id="body">
              <path d="M77 83 C99 57 162 55 201 76 C226 89 229 121 211 138 C192 156 113 157 79 137 C58 125 56 103 77 83Z" fill="#bec4c2" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M101 73 C130 62 176 66 200 82 C178 76 139 78 112 91 C91 101 82 119 87 136 C65 124 66 96 101 73Z" fill="#e3e6e2" opacity=".88"/>
              <path d="M118 145 C143 150 180 148 198 141" fill="none" stroke="#8e9694" strokeWidth="5" strokeLinecap="round" opacity=".9"/>
            </g>
          </g>
          <g id="legFL" transform="translate(82 119)">
            <g id="motionFL">
              <g id="upperFL">
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#343a3d" strokeWidth="19" strokeLinecap="round" opacity="0"/>
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#c9cecc" strokeWidth="13" strokeLinecap="round" opacity="0"/>
                <g transform="translate(2 16)">
                  <g id="lowerFL">
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#343a3d" strokeWidth="16" strokeLinecap="round" opacity="0"/>
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#c9cecc" strokeWidth="10" strokeLinecap="round" opacity="0"/>
                    <g transform="translate(-1 10)">
                      <g id="pawFL">
                        <path d="M-9 -7 C-5 -10 5 -10 10 -5 C12 -2 13 2 11 5 C8 10 -5 12 -10 6 C-12 3 -12 0 -9 -7Z" fill="#c9cecc"/>
                        <path d="M-11 0 C-12 4 -9 8 -5 10 C0 12 8 10 11 5 C12 3 12 1 11 -1" fill="none" stroke="#343a3d" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M-3 6 L-2 9 M3 6 L4 9" fill="none" stroke="#747c7a" strokeWidth="2" strokeLinecap="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="legFR" transform="translate(108 116)">
            <g id="motionFR">
              <g id="upperFR">
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#343a3d" strokeWidth="19" strokeLinecap="round" opacity="0"/>
                <path d="M0 0 C-2 6 -1 12 2 18" fill="none" stroke="#a5adab" strokeWidth="13" strokeLinecap="round" opacity="0"/>
                <g transform="translate(2 16)">
                  <g id="lowerFR">
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#343a3d" strokeWidth="16" strokeLinecap="round" opacity="0"/>
                    <path d="M0 0 C2 6 1 13 -1 20" fill="none" stroke="#a5adab" strokeWidth="10" strokeLinecap="round" opacity="0"/>
                    <g transform="translate(-1 10)">
                      <g id="pawFR">
                        <path d="M-9 -7 C-5 -10 5 -10 10 -5 C12 -2 13 2 11 5 C8 10 -5 12 -10 6 C-12 3 -12 0 -9 -7Z" fill="#a5adab"/>
                        <path d="M-11 0 C-12 4 -9 8 -5 10 C0 12 8 10 11 5 C12 3 12 1 11 -1" fill="none" stroke="#343a3d" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M-3 6 L-2 9 M3 6 L4 9" fill="none" stroke="#747c7a" strokeWidth="2" strokeLinecap="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="headRig">
            <g id="earL">
              <path d="M38 55 L42 13 Q44 5 52 12 L72 38Z" fill="#bec4c2" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M45 42 L47 21 L61 38Z" fill="#a87985"/>
            </g>
            <g id="earR">
              <path d="M91 38 L113 11 Q119 5 120 15 L118 58Z" fill="#bec4c2" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M101 39 L114 21 L113 45Z" fill="#a87985"/>
            </g>
            <g id="head">
              <path d="M40 45 C55 31 91 29 109 44 C123 56 124 84 112 101 C98 120 55 120 39 102 C25 87 25 58 40 45Z" fill="#c4c9c7" stroke="#343a3d" strokeWidth="4" strokeLinejoin="round"/>
              <path d="M43 48 C57 38 81 36 98 42 C78 43 55 54 44 73 C38 83 38 97 44 105 C27 91 28 61 43 48Z" fill="#e5e8e4" opacity=".92"/>
              <path d="M76 92 C86 102 101 104 111 96 C105 112 88 118 72 112Z" fill="#969e9c" opacity=".78"/>
            </g>
            <g id="eyeL">
              <path d="M42 70 Q55 57 69 69 Q57 84 43 74Z" fill="#d9f45c" stroke="#343a3d" strokeWidth="2.5"/>
              <circle cx="49" cy="66" r="2.6" fill="#f7ffd0" opacity=".85"/>
              <g id="pupilL"><path d="M55 62 Q60 69 55 78 Q50 69 55 62Z" fill="#090a0a"/></g>
            </g>
            <g id="eyeR">
              <path d="M78 68 Q93 54 107 67 Q96 82 80 73Z" fill="#d9f45c" stroke="#343a3d" strokeWidth="2.5"/>
              <circle cx="87" cy="64" r="2.6" fill="#f7ffd0" opacity=".85"/>
              <g id="pupilR"><path d="M93 59 Q98 67 93 76 Q88 67 93 59Z" fill="#090a0a"/></g>
            </g>
            <g id="eyelidL"><path d="M40 58 H71 V78 Q56 87 41 76Z" fill="#b8bebc"/></g>
            <g id="eyelidR"><path d="M77 56 H109 V76 Q94 85 78 75Z" fill="#b8bebc"/></g>
            <g id="mouth">
              <path d="M70 86 L77 82 L84 87 L77 92Z" fill="#8c717a" stroke="#090a0a" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M77 92 C73 99 66 98 63 95 M77 92 C81 99 89 99 92 95" fill="none" stroke="#8f979a" strokeWidth="2.2" strokeLinecap="round"/>
              <ellipse className="mouth-open" cx="78" cy="99" rx="11" ry="6" fill="#371f29" stroke="#8f979a" strokeWidth="2"/>
            </g>
            <g id="whiskers" fill="none" stroke="#eef1ec" strokeWidth="1.5" strokeLinecap="round" opacity=".88">
              <path d="M61 91 C43 87 29 88 19 92 M62 96 C43 96 29 101 21 107 M93 90 C111 84 127 84 139 87 M93 96 C112 94 129 98 140 103"/>
            </g>
          </g>
        </g>
      </svg>
    </button>
  </div>
}

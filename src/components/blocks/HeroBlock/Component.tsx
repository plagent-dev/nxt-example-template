'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type {
  HeroBlockProps,
  HeroCarouselProps,
  HeroSize,
  HeroStaticProps,
} from './types'

// ─── Full: Carousel (auto-advance, dots, arrows, swipe) ─────────────────────

function FullCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pointerStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrent(index)
        setIsTransitioning(false)
      }, 300)
    },
    [isTransitioning],
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo, slides.length])

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo, slides.length])

  useEffect(() => {
    timerRef.current = setTimeout(goNext, 5000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, goNext])

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return
    const delta = e.clientX - pointerStartX.current
    if (delta > 48) goPrev()
    else if (delta < -48) goNext()
    pointerStartX.current = null
  }

  const slide = slides[current]

  return (
    <section
      className="group/hero relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[80vh]"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Background images — cross-fade */}
      {slides.map((s, i) => (
        <div
          key={s.id ?? s.image.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image.src}
            alt={s.image.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay — gradient stronger at bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content — bottom-anchored */}
      <div className="relative z-20 w-full pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isTransitioning ? 0 : 1 }}
          >
            {slide?.heading && (
              <h1 className="mb-6 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl">
                {slide.heading}
              </h1>
            )}
            {slide?.subtitle && (
              <p className="mb-8 max-w-xl text-base leading-8 text-white/88 md:text-lg">
                {slide.subtitle}
              </p>
            )}
            {slide?.ctaLabel && slide?.ctaUrl && (
              <Link
                href={slide.ctaUrl}
                className="inline-block rounded-lg bg-brand-alt px-8 py-4 text-base font-semibold text-brand-primary transition-colors duration-200 hover:bg-white hover:text-brand-primary"
              >
                {slide.ctaLabel}
              </Link>
            )}
          </div>

          {/* Dot navigation — bar style */}
          {slides.length > 1 && (
            <div className="mt-10 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-brand-alt'
                      : 'w-4 bg-white/50 hover:bg-brand-alt'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Arrow buttons — appear on hover */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white opacity-60 backdrop-blur-sm transition-all duration-200 hover:bg-brand-alt hover:text-brand-primary focus:opacity-100 group-hover/hero:opacity-100 hover:opacity-100 md:left-8 md:opacity-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white opacity-60 backdrop-blur-sm transition-all duration-200 hover:bg-brand-alt hover:text-brand-primary focus:opacity-100 group-hover/hero:opacity-100 hover:opacity-100 md:right-8 md:opacity-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </section>
  )
}

// ─── Medium / Short: Static header ──────────────────────────────────────────

const sizeClasses: Record<string, string> = {
  medium: 'h-[320px] md:h-[400px]',
  short: 'h-[200px] md:h-[260px]',
}

const paddingClasses: Record<string, string> = {
  medium: 'pb-10 md:pb-14',
  short: 'pb-6 md:pb-8',
}

const titleClasses: Record<string, string> = {
  medium: 'text-4xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.02] max-w-4xl',
  short: 'text-2xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl',
}

const subtitleClasses: Record<string, string> = {
  medium: 'mt-4 text-base md:text-lg leading-7 max-w-3xl text-white/95',
  short: 'mt-3 text-sm md:text-base leading-6 max-w-3xl text-white/95',
}

function StaticHeader({
  size,
  title,
  subtitle,
  image,
  headingAlignment,
  children,
  childrenPosition = 'below',
}: HeroStaticProps) {
  const hasImage = Boolean(image?.src)
  const alignment =
    headingAlignment === 'center'
      ? 'text-center mx-auto'
      : headingAlignment === 'right'
        ? 'text-right ml-auto'
        : 'text-left'

  return (
    <section
      className={`relative overflow-hidden text-white ${sizeClasses[size] || sizeClasses.medium}${
        hasImage ? '' : ' bg-[var(--brand-primary)]'
      }`}
    >
      {hasImage && image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 ${
          paddingClasses[size] || paddingClasses.medium
        }`}
      >
        <div className={alignment}>
          {children && childrenPosition === 'above' && children}

          {title && <h1 className={titleClasses[size] || titleClasses.medium}>{title}</h1>}

          {subtitle && (
            <p className={subtitleClasses[size] || subtitleClasses.medium}>{subtitle}</p>
          )}

          {children && childrenPosition === 'below' && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </section>
  )
}

// ─── Top-level dispatcher ───────────────────────────────────────────────────

export function HeroBlock(props: HeroBlockProps) {
  const size = (props.size || 'medium') as HeroSize

  // Full size → carousel
  if (size === 'full' && props.slides && props.slides.length > 0) {
    return <FullCarousel slides={props.slides} />
  }

  // Medium / short → static header
  return (
    <StaticHeader
      size={size === 'short' ? 'short' : 'medium'}
      title={props.title}
      subtitle={props.subtitle}
      image={props.image}
      headingAlignment={props.headingAlignment}
      childrenPosition={props.childrenPosition}
    >
      {props.children}
    </StaticHeader>
  )
}

export default HeroBlock

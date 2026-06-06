import type { ReactNode } from 'react'

/** A plain image reference. Replaces the Payload `Media` type. */
export type HeroImage = {
  src: string
  alt: string
}

/** The three hero layouts this block supports. */
export type HeroSize = 'full' | 'medium' | 'short'

export type HeadingAlignment = 'left' | 'center' | 'right'

/** One slide in the `full` carousel variant. */
export type HeroSlide = {
  image: HeroImage
  heading: string
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
  /** Optional stable key. Falls back to the image src when omitted. */
  id?: string
}

/** Props for the medium / short static variants. */
export type HeroStaticProps = {
  size: Extract<HeroSize, 'medium' | 'short'>
  title?: string
  subtitle?: string
  image?: HeroImage
  headingAlignment?: HeadingAlignment
  children?: ReactNode
  childrenPosition?: 'above' | 'below'
}

/** Props for the full-bleed carousel variant. */
export type HeroCarouselProps = {
  slides: HeroSlide[]
}

/** Unified props accepted by the top-level `HeroBlock` component. */
export type HeroBlockProps = {
  size?: HeroSize
  title?: string
  subtitle?: string
  image?: HeroImage
  headingAlignment?: HeadingAlignment
  slides?: HeroSlide[]
  children?: ReactNode
  childrenPosition?: 'above' | 'below'
}

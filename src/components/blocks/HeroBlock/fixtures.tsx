import type { HeroBlockProps, HeroSlide } from './types'

/**
 * Demo data for previewing each Hero Block variant in the showcase.
 *
 * Images live in `public/images/`. Swap these for your own content when you
 * promote the block to a working project.
 */

const carouselSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: { src: '/images/plagent_hero1@1x.png', alt: 'Abstract gradient backdrop' },
    heading: 'Build interfaces with confidence',
    subtitle:
      'Design and preview every block in isolation before it reaches production.',
    ctaLabel: 'Get started',
    ctaUrl: '#',
  },
  {
    id: 'slide-2',
    image: { src: '/images/plagent_hero2@1x.png', alt: 'Layered geometric shapes' },
    heading: 'Preview every variant at a glance',
    subtitle: 'See exactly how a component behaves across its full range of states.',
    ctaLabel: 'View components',
    ctaUrl: '#',
  },
  {
    id: 'slide-3',
    image: { src: '/images/plagent_hero3@1x.png', alt: 'Soft flowing color field' },
    heading: 'Ship blocks that just work',
    subtitle: 'Promote approved blocks to your project knowing they render correctly.',
    ctaLabel: 'Read the guide',
    ctaUrl: '#',
  },
]

export const heroFullFixture: HeroBlockProps = {
  size: 'full',
  slides: carouselSlides,
}

export const heroMediumFixture: HeroBlockProps = {
  size: 'medium',
  title: 'Medium page header',
  subtitle:
    'A standard fixed-height header for landing and section pages, with a dark overlay over the background image.',
  image: { src: '/images/plagent_hero2@1x.png', alt: 'Layered geometric shapes' },
  headingAlignment: 'left',
}

export const heroShortFixture: HeroBlockProps = {
  size: 'short',
  title: 'Short detail header',
  subtitle: 'A compact header for detail and item pages.',
  image: { src: '/images/plagent_hero3@1x.png', alt: 'Soft flowing color field' },
  headingAlignment: 'left',
}

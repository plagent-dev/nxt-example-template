import type { HeroBlockProps, HeroImage } from './types'

export const heroImages: { label: string; image: HeroImage }[] = [
  {
    label: 'Interface Layers',
    image: {
      src: '/images/plagent_hero1@1x.png',
      alt: 'Layered abstract interface artwork',
    },
  },
  {
    label: 'Structured Canvas',
    image: {
      src: '/images/plagent_hero2@1x.png',
      alt: 'Structured abstract canvas with geometric forms',
    },
  },
  {
    label: 'Soft Gradient',
    image: {
      src: '/images/plagent_hero3@1x.png',
      alt: 'Soft abstract gradient field',
    },
  },
]

export const heroBackgroundFixture: HeroBlockProps = {
  variant: 'background',
  eyebrow: 'Visual sandbox',
  title: 'Build the block before it reaches production.',
  subtitle:
    'Use fixtures to review layout, copy length, image behavior, and responsive states before adapting the block to Payload data.',
  image: heroImages[0].image,
  alignment: 'left',
  actions: [
    { label: 'Review variants', href: '#presets', tone: 'primary' },
    { label: 'Review field map', href: '#field-reference', tone: 'secondary' },
  ],
}

export const heroSplitFixture: HeroBlockProps = {
  variant: 'split',
  eyebrow: 'Fixture first',
  title: 'Keep content portable while the design is still moving.',
  subtitle:
    'The showcase uses static data shaped like real CMS fields, then the working repo provides the Payload integration.',
  image: heroImages[1].image,
  alignment: 'left',
  actions: [{ label: 'Review presets', href: '#presets', tone: 'primary' }],
}

export const heroCompactFixture: HeroBlockProps = {
  variant: 'compact',
  eyebrow: 'Page header',
  title: 'Compact hero for detail pages',
  subtitle: 'A smaller header pattern for collection items, admin previews, or focused content pages.',
  image: heroImages[2].image,
  alignment: 'center',
}

export const heroPresets = [
  {
    name: 'Background Image Hero',
    description: 'Full-width block with image backdrop, overlay, copy, and CTA actions.',
    data: heroBackgroundFixture,
  },
  {
    name: 'Split Image/Text Hero',
    description: 'Two-column layout for pages that need a visible image and denser copy.',
    data: heroSplitFixture,
  },
  {
    name: 'Compact Page Hero',
    description: 'Short page header for details, index pages, or admin-preview style pages.',
    data: heroCompactFixture,
  },
]

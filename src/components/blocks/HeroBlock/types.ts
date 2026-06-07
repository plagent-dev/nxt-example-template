export type HeroImage = {
  src: string
  alt: string
}

export type HeroVariant = 'background' | 'split' | 'compact'

export type HeroAlignment = 'left' | 'center' | 'right'

export type HeroAction = {
  label: string
  href: string
  tone?: 'primary' | 'secondary'
}

export type HeroBlockProps = {
  variant: HeroVariant
  eyebrow?: string
  title: string
  subtitle?: string
  image?: HeroImage
  alignment?: HeroAlignment
  actions?: HeroAction[]
}

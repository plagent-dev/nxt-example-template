import type { Metadata } from 'next'

import { HeroBlock } from '@/components/blocks/HeroBlock/Component'
import { heroBlockMeta } from '@/components/blocks/HeroBlock/meta'
import {
  heroFullFixture,
  heroMediumFixture,
  heroShortFixture,
} from '@/components/blocks/HeroBlock/fixtures'

export const metadata: Metadata = {
  title: heroBlockMeta.name,
  description: heroBlockMeta.description,
}

function VariantLabel({ title, note }: { title: string; note: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-foreground/60">{note}</p>
    </div>
  )
}

export default function HeroBlockPage() {
  return (
    <div className="py-12">
      <header className="mx-auto max-w-6xl px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {heroBlockMeta.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/60">
          {heroBlockMeta.description}
        </p>
      </header>

      <div className="mt-12 space-y-16">
        <section className="space-y-5">
          <VariantLabel
            title="Full — carousel"
            note="Immersive full-bleed hero. Auto-advances every 5s, with dot navigation, hover arrows, and swipe support."
          />
          <HeroBlock {...heroFullFixture} />
        </section>

        <section className="space-y-5">
          <VariantLabel
            title="Medium — static header"
            note="Standard fixed-height page header with a dark overlay over a single background image."
          />
          <HeroBlock {...heroMediumFixture} />
        </section>

        <section className="space-y-5">
          <VariantLabel
            title="Short — static header"
            note="Compact header for detail and item pages."
          />
          <HeroBlock {...heroShortFixture} />
        </section>

        <section className="space-y-5">
          <VariantLabel
            title="Medium — no image (brand fallback)"
            note="When no background image is provided, the static variants fall back to a solid var(--brand-primary) background."
          />
          <HeroBlock
            size="medium"
            title="Brand-color fallback"
            subtitle="No image supplied — the section uses the primary brand color as its background."
            headingAlignment="left"
          />
        </section>
      </div>
    </div>
  )
}

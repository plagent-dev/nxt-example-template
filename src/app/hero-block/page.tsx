'use client'

import { useMemo, useState } from 'react'

import { HeroBlock } from '@/components/blocks/HeroBlock/Component'
import {
  heroBackgroundFixture,
  heroImages,
  heroPresets,
} from '@/components/blocks/HeroBlock/fixtures'
import { heroBlockMeta } from '@/components/blocks/HeroBlock/meta'
import type { HeroAlignment, HeroVariant } from '@/components/blocks/HeroBlock/types'
import { FieldControl } from '@/components/showcase/FieldControl'
import {
  PayloadFieldReference,
  type FieldGroup,
} from '@/components/showcase/PayloadFieldReference'
import { PlaygroundPanel } from '@/components/showcase/PlaygroundPanel'
import { PromotionGuide } from '@/components/showcase/PromotionGuide'

const selectClass =
  'w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand-primary'

const useCases = [
  'Review landing page heroes with image, headline, supporting copy, and actions.',
  'Test split image/text page intros for service, product, or campaign pages.',
  'Check compact page headers for collection items and detail pages.',
  'Validate copy length, image choice, and alignment before mapping fields in Payload.',
]

const fieldGroups: FieldGroup[] = [
  {
    title: 'Block Fields',
    description: 'Fields that control the overall hero layout and text content.',
    fields: [
      {
        name: 'variant',
        type: 'select',
        required: true,
        description: 'Chooses the hero layout.',
        defaultValue: 'background',
        options: ['background', 'split', 'compact'],
      },
      {
        name: 'eyebrow',
        type: 'text',
        description: 'Small label shown above the main heading.',
      },
      {
        name: 'title',
        type: 'text',
        required: true,
        description: 'Primary hero heading.',
      },
      {
        name: 'subtitle',
        type: 'textarea',
        description: 'Supporting copy below the heading.',
      },
      {
        name: 'alignment',
        type: 'select',
        description: 'Text alignment for supported variants.',
        defaultValue: 'left',
        options: ['left', 'center', 'right'],
      },
      {
        name: 'image',
        type: 'upload',
        description: 'Background or supporting image, depending on variant.',
      },
    ],
  },
  {
    title: 'CTA Fields',
    description: 'Optional repeatable action links for background and split variants.',
    fields: [
      {
        name: 'actions[].label',
        type: 'text',
        required: true,
        description: 'Visible button label.',
      },
      {
        name: 'actions[].href',
        type: 'text',
        required: true,
        description: 'Internal or external link URL.',
      },
      {
        name: 'actions[].tone',
        type: 'select',
        description: 'Controls primary vs secondary button treatment.',
        defaultValue: 'primary',
        options: ['primary', 'secondary'],
      },
    ],
  },
]

export default function HeroBlockPage() {
  const [variant, setVariant] = useState<HeroVariant>('background')
  const [imageIndex, setImageIndex] = useState(0)
  const [alignment, setAlignment] = useState<HeroAlignment>('left')

  const playgroundProps = useMemo(
    () => ({
      ...heroBackgroundFixture,
      variant,
      image: heroImages[imageIndex].image,
      alignment,
      actions: variant === 'compact' ? undefined : heroBackgroundFixture.actions,
    }),
    [alignment, imageIndex, variant],
  )

  return (
    <div className="bg-white">
      <section className="border-b border-black/10 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground/45">
            <span>{heroBlockMeta.category}</span>
            <span>/</span>
            <span>{heroBlockMeta.status}</span>
            <span>/</span>
            <span>{heroBlockMeta.promoteTarget}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            {heroBlockMeta.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-foreground/65">
            {heroBlockMeta.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-12">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/65">
            {useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>

        <PlaygroundPanel
          description="Change the editor-controlled axes and confirm the block stays usable across variants."
          controls={
            <>
              <FieldControl label="Variant" required description="Choose the layout family.">
                <select
                  value={variant}
                  onChange={(event) => setVariant(event.target.value as HeroVariant)}
                  className={selectClass}
                >
                  <option value="background">Background image</option>
                  <option value="split">Split image/text</option>
                  <option value="compact">Compact page hero</option>
                </select>
              </FieldControl>

              <FieldControl label="Image Fixture" required description="Swap bundled template images.">
                <select
                  value={imageIndex}
                  onChange={(event) => setImageIndex(Number(event.target.value))}
                  className={selectClass}
                >
                  {heroImages.map((item, index) => (
                    <option key={item.image.src} value={index}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </FieldControl>

              <FieldControl label="Text Alignment" description="Mirrors a common Payload select field.">
                <select
                  value={alignment}
                  onChange={(event) => setAlignment(event.target.value as HeroAlignment)}
                  className={selectClass}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </FieldControl>
            </>
          }
          preview={<HeroBlock {...playgroundProps} />}
        />

        <section id="presets" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Presets</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/60">
              Saved hero configurations for reviewing the main variants before promotion.
            </p>
          </div>
          <div className="space-y-8">
            {heroPresets.map((preset) => (
              <article key={preset.name} className="overflow-hidden rounded-lg border border-black/10">
                <div className="border-b border-black/10 bg-white px-5 py-4">
                  <h3 className="text-base font-semibold text-foreground">{preset.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-foreground/60">{preset.description}</p>
                </div>
                <HeroBlock {...preset.data} />
              </article>
            ))}
          </div>
        </section>

        <PayloadFieldReference groups={fieldGroups} />

        <PromotionGuide
          target="Payload block: hero"
          sourceFiles={[
            'src/components/blocks/HeroBlock/Component.tsx',
            'src/components/blocks/HeroBlock/types.ts',
            'src/components/blocks/HeroBlock/fixtures.tsx',
            'src/components/blocks/HeroBlock/meta.ts',
          ]}
        />
      </main>
    </div>
  )
}

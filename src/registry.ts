import type { ComponentMeta } from '@/types/registry'

export const registry: ComponentMeta[] = [
  {
    name: 'Header Component',
    slug: 'header-component',
    category: 'Layout',
    status: 'ready',
    description:
      'Portable header global example with primary and utility nav, layout controls, dropdowns, mobile drawer, and mock search.',
    presetCount: 3,
    fixtureCount: 3,
    promoteTarget: 'Payload global',
  },
  {
    name: 'Hero Block',
    slug: 'hero-block',
    category: 'Blocks',
    status: 'ready',
    description:
      'Fixture-driven hero block with background, split, and compact variants using the bundled template images.',
    presetCount: 3,
    fixtureCount: 3,
    promoteTarget: 'Payload block',
  },
]

export function getComponentBySlug(slug: string) {
  return registry.find((component) => component.slug === slug)
}

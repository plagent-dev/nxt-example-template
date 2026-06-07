import type { ShowcaseCategory, ShowcaseStatus } from '@/types/registry'

export type { ShowcaseCategory, ShowcaseStatus } from '@/types/registry'

export type ShowcasePage = {
  name: string
  slug: string
  description: string
  status: ShowcaseStatus
  category: ShowcaseCategory
  promoteTarget: string
}

export const categoryOrder: ShowcaseCategory[] = [
  'Layout',
  'Blocks',
  'Collections',
  'Pages',
  'Admin',
]

export const showcasePages: ShowcasePage[] = [
  {
    name: 'Header Component',
    slug: 'header-component',
    description:
      'Reusable header global pattern with layout controls, dropdown navigation, mobile behavior, and static search.',
    status: 'ready',
    category: 'Layout',
    promoteTarget: 'Payload global',
  },
  {
    name: 'Hero Block',
    slug: 'hero-block',
    description:
      'Reusable hero block with fixtures, image variants, alignment controls, presets, and Payload field notes.',
    status: 'ready',
    category: 'Blocks',
    promoteTarget: 'Payload block',
  },
]

export function categoryToAnchor(category: ShowcaseCategory) {
  return category.toLowerCase().replace(/\s+/g, '-')
}

export function getPagesByCategory(): { category: ShowcaseCategory; pages: ShowcasePage[] }[] {
  return categoryOrder.map((category) => ({
    category,
    pages: showcasePages.filter((page) => page.category === category),
  }))
}

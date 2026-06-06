/**
 * The catalog of showcase pages — the single source of truth for navigation
 * and the front-page catalog.
 *
 * To add a page:
 *   1. Create `src/app/<slug>/page.tsx`
 *   2. Add an entry to the `showcasePages` array below
 *
 * It then appears automatically in the header nav and the catalog.
 */

export type ShowcaseStatus = 'ready' | 'in-progress' | 'planned'

export type ShowcaseCategory =
  | 'Heroes'
  | 'Navigation'
  | 'Content'
  | 'Media'
  | 'Commerce'

export type ShowcasePage = {
  /** Display name, shown in the nav and on the catalog card. */
  name: string
  /** URL segment. The page lives at `/${slug}` (`src/app/<slug>/page.tsx`). */
  slug: string
  /** One-line summary shown on the catalog card. */
  description: string
  /** Build status, surfaced as a badge on the catalog card. */
  status: ShowcaseStatus
  /** Grouping used to organize the catalog and nav. */
  category: ShowcaseCategory
}

export const showcasePages: ShowcasePage[] = [
  {
    name: 'Hero Block',
    slug: 'hero-block',
    description:
      'Full-bleed auto-advancing carousel plus medium and short static variants, with a dark overlay and a brand-color fallback.',
    status: 'ready',
    category: 'Heroes',
  },
]

/**
 * Group the showcase pages by category, preserving the order in which each
 * category first appears in `showcasePages`.
 */
export function getPagesByCategory(): Record<string, ShowcasePage[]> {
  return showcasePages.reduce<Record<string, ShowcasePage[]>>((groups, page) => {
    ;(groups[page.category] ??= []).push(page)
    return groups
  }, {})
}

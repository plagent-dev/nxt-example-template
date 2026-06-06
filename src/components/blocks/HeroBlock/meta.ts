/**
 * Showcase catalog metadata for the Hero Block.
 *
 * Follows the shared block-meta pattern:
 *   { name, description, category, variants, presetCount }
 */
export const heroBlockMeta = {
  name: 'Hero Block',
  description:
    'A page hero with three layouts: a full-bleed auto-advancing carousel, plus medium and short static headers. Supports a dark overlay, optional background image, and a brand-color fallback.',
  category: 'Heroes',
  variants: ['full', 'medium', 'short'] as const,
  presetCount: 3,
}

export default heroBlockMeta

/**
 * Centralized site identity.
 *
 * EngAI updates these values from PMAI/PLAI direction. The layout, header,
 * catalog page, and document metadata read from here so brand names render
 * exactly as written.
 *
 * Brand colors live in `src/app/globals.css` as CSS variables. Keep colors
 * there as the single source of truth for visual styling.
 */

export type SiteConfig = {
  /** Configured showcase name. Rendered exactly as written in the header and homepage H1. */
  name: string
  /** Short supporting copy shown on the homepage and used in metadata. */
  tagline: string
  /** Longer description used for document metadata. */
  description: string
  /** Path to the logo image in `public/`. */
  logo: string
}

export const siteConfig: SiteConfig = {
  name: 'Project Showcase',
  tagline:
    'A visual sandbox for reviewing components, pages, and Payload UI patterns before they move into the working repo.',
  description:
    'A configurable Next.js showcase for fixture-driven component review before promotion into a Payload CMS working repo.',
  logo: '/logo.svg',
}

export default siteConfig

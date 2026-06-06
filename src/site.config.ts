/**
 * Centralized site identity.
 *
 * This is the single source of truth for the showcase's brand. The layout,
 * header, catalog page, and document metadata all read from here — nothing is
 * hardcoded in components. Change these values to make the template your own.
 *
 * The two `colors` values mirror the `--brand-primary` and `--brand-alt` CSS
 * variables in `src/app/globals.css`. Keep them in sync: the CSS variables
 * drive Tailwind utilities (`bg-brand-primary`, `text-brand-alt`), and the
 * values here are available to any code that needs the colors in JavaScript.
 */

export type SiteColors = {
  /** Primary brand color. Mirrors `--brand-primary` in globals.css. */
  primary: string
  /** Accent / alternate brand color. Mirrors `--brand-alt` in globals.css. */
  alt: string
}

export type SiteConfig = {
  /** Project name, shown in the header and used in page titles. */
  name: string
  /** Short one-line positioning statement. */
  tagline: string
  /** Longer description used for document metadata. */
  description: string
  /** Path to the logo image in `public/`. */
  logo: string
  colors: SiteColors
}

export const siteConfig: SiteConfig = {
  name: 'Block Showcase',
  tagline: 'Build and preview UI blocks before you ship them.',
  description:
    'A static Next.js component showcase. Design, preview, and review UI blocks in isolation before promoting them to a working project.',
  logo: '/logo.svg',
  colors: {
    primary: '#18181b',
    alt: '#fafafa',
  },
}

export default siteConfig

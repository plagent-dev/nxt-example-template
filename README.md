# nxt-example-template

## What This Is

A static Next.js component showcase template. Part of the PL Agent framework. Used to build, preview, and test UI blocks before promoting them to a Payload CMS working project.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the catalog.

## Customize Your Brand

Edit `src/site.config.ts` — set your project name, tagline, logo path, and brand colors. Edit `--brand-primary` and `--brand-alt` in `src/app/globals.css` to match.

## How to Add a New Block (the 4-file convention)

Every block is a folder under `src/components/blocks/<BlockName>/` with 4 files:

- `Component.tsx` — the React component
- `types.ts` — TypeScript props/types
- `meta.ts` — metadata for the showcase catalog
- `fixtures.tsx` — demo data for previewing variants

## How to Add a Page to the Catalog

1. Create `src/app/<slug>/page.tsx`
2. Add an entry to `src/showcase-pages.ts`
3. It auto-appears in the header nav and the front-page catalog

## Workflow — How This Template Fits Into a Project

This showcase is **not** your production site. It's a sandbox for building components.

1. Clone this template at the same Next.js version as your working project
2. Build blocks here using the 4-file convention
3. Preview and review each block visually in the showcase
4. Once approved, promote the block to your working project (copy the component folder, adapt imports for Payload CMS data)
5. Verify the block renders correctly in the working project

**Important:** Keep the Next.js version in this showcase aligned with your working project. Version drift between the two causes bugs when promoting blocks.

## Version Pinning

Create a `VERSION_LOCK.md` in the root after cloning (rename `VERSION_LOCK.template.md`):

```markdown
Working repo: {your-repo-name}
Next.js: {version}
Last synced: {date}
```

Check this before every visual milestone. If versions have drifted, update the showcase first.

## Brand Colors

The two CSS variables `--brand-primary` and `--brand-alt` in `globals.css` control the site-wide color scheme. Change these to match your project's brand. Components use these via Tailwind utilities (`bg-brand-primary`, `text-brand-alt`).

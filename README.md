# nxt-example-template

Slim showcase scaffold for reviewing UI outside the production app.

## What This Is

This repo is a disposable visual sandbox between PMAI planning and EngAI
promotion into a Payload CMS working repo. It lets blocks, components, pages,
collections, and admin UI patterns be built, viewed, compared, and approved
before production code is touched.

The showcase should stay small, generic, and reusable. EngAI applies project
identity and branding from PMAI/PLAI direction; the UI renders the configured
showcase name exactly as written.

## What This Is Not

This is not the production site, not a Payload app, and not the source of truth
for existing production behavior. When improving an existing production page or
component, inspect the working repo first, then use this showcase to iterate
visually.

## Local Agent Run

This template currently includes an npm lockfile.

```bash
npm install
npm run dev
```

For local validation, agents can run the app and open
[http://localhost:3000](http://localhost:3000).

## Site Identity And Branding

EngAI configures identity and branding from PMAI/PLAI direction:

- `src/site.config.ts` holds `name`, `tagline`, `description`, and `logo`.
- `name` is the showcase name rendered in the header and homepage H1, such as
  `rePlay Showcase`, `ExampleCo Showcase`, or `ClientName Design System`.
- `src/app/globals.css` holds brand color CSS variables.

Brand colors have one source of truth: `--brand-primary` and `--brand-alt` in
`src/app/globals.css`. `src/site.config.ts` does not duplicate those color
values.

Agents maintain brand names through `siteConfig` so casing-sensitive names like
`rePlay` render correctly in shared chrome and the homepage.

## PL Agent Roles

- PMAI defines planned work, review goals, and acceptance criteria.
- EngAI creates or updates showcase examples.
- PLAI reviews direction and process, making sure the showcase matches the
  plan and remains useful.
- The Developer reviews visually and approves, rejects, or gives feedback.

Normal Developer review is visual: inspect the showcase, approve, reject, or
give feedback. File creation, code movement, and version alignment are agent
responsibilities.

## Showcase Workflow

1. PMAI defines what needs to be built or reviewed.
2. EngAI builds the showcase example with static fixtures and meaningful states.
3. PLAI checks whether the implementation matches the plan and review intent.
4. The Developer opens the showcase, reviews visually, and gives feedback.
5. EngAI iterates in the showcase until the example is approved.
6. EngAI promotes approved code into the Payload working repo and replaces
   fixtures with Payload fields, globals, relationships, or collection data.
7. EngAI verifies the promoted component in the working repo.

## Source Of Truth

For new components, the showcase can start from scratch.

For existing production work, the working repo is the source of truth. EngAI
should not preserve old showcase code just because it already exists.

## Catalog Shape

The catalog is driven by:

- `src/showcase-pages.ts` for visible showcase pages and category navigation
- `src/registry.ts` for static component metadata
- `src/types/registry.ts` for portable metadata types

Agents maintain `src/showcase-pages.ts` so items appear in the homepage catalog
and site menu. Agents maintain reusable component metadata in `src/registry.ts`
when the item is a reusable block or component.

Payload-oriented categories are:

- Layout
- Blocks
- Collections
- Pages
- Admin

## Category Expectations

- Layout: layout-level UI such as Header, Footer, navigation, search, and shell
  patterns.
- Blocks: reusable Payload block sections. Include dynamic controls above the
  preview when options are meaningful.
- Collections: collection listing, detail, and admin-facing UI patterns if
  added.
- Pages: full page layouts. A page showcase should render the page as exactly
  as possible, with the real design intent and block composition.
- Admin: dashboard, editor, workflow, and admin UI patterns.

## Design Review Rules

- If the showcase item is a Page, show the full page layout exactly. Do not turn
  a page into a tiny block demo.
- If the showcase item is not a Page, show dynamic options above the preview
  when options are meaningful.
- Previews should use realistic width and must not be squeezed by sidebars.
- Pixel-perfect or near pixel-perfect review is expected when the showcase is
  based on a production page or approved design.
- Use fixtures and presets to expose edge cases, content length, responsive
  states, and editor-controlled variants.

## How To Add A Showcase Item

EngAI uses the 4-file convention for reusable examples:

```txt
src/components/<area>/<ComponentName>/
  Component.tsx
  types.ts
  fixtures.ts
  meta.ts
```

Fixtures should be plain static data shaped like the expected CMS data. Payload
imports do not belong inside showcase components.

EngAI then adds the review page and registry entries:

1. EngAI creates `src/app/<slug>/page.tsx`.
2. EngAI adds the page to `src/showcase-pages.ts` with `name`, `slug`,
   `description`, `status`, `category`, and `promoteTarget`.
3. EngAI places it in one supported category: Layout, Blocks, Collections,
   Pages, or Admin.
4. EngAI adds or updates metadata in `src/registry.ts` when it is a reusable
   component or block.
5. Fixtures and presets stay in the component folder so future EngAI sessions
   can understand the reviewed states.
6. Showcase pages include use cases, an interactive playground where useful, a
   Payload field reference when Payload mapping matters, presets, and handoff
   notes.

Required metadata:

- `name`: visible example name.
- `slug`: route segment under `src/app/<slug>/page.tsx`.
- `description`: what the example demonstrates.
- `status`: `ready`, `in-progress`, or `draft`.
- `category`: Layout, Blocks, Collections, Pages, or Admin.
- `promoteTarget`: expected Payload destination such as `Payload block`,
  `Payload global`, `Page layout`, or `Admin pattern`.

## Fixture And Preset Guidance

Fixtures model the data shape that will later come from Payload. Presets are
named fixture combinations used for visual review. Use them to show common,
edge, and responsive states without connecting to live CMS data.

For blocks and layout components:

- Put controls above the preview.
- Let controls change meaningful axes such as variant, alignment, image,
  spacing, navigation position, sticky behavior, or search visibility.
- Keep the preview wide enough to evaluate layout quality.

For pages:

- Render the whole page composition as close to the target design as possible.
- Avoid reducing a page into isolated block previews.
- Use fixtures to represent realistic page data and block order.

## Version Alignment

`VERSION_LOCK.md` is an AI/process artifact for EngAI and PLAI. It records the
working repo path, commits, and framework versions used during review and
promotion.

For project work, EngAI can create it from the template:

```bash
cp VERSION_LOCK.template.md VERSION_LOCK.md
```

`VERSION_LOCK.md` remains outside normal Developer visual review.

EngAI records the working repo path, working repo commit, showcase commit,
Next.js version, React version, Payload version if applicable, and last
verified date.

## Promotion Checklist Into Payload

For EngAI promotion passes:

- Confirm version alignment is current.
- Move only the component files needed by the working repo.
- Replace static fixtures with Payload data boundaries.
- Map component props to block fields, global fields, relationships, or
  collection data.
- Remove showcase-only playground code.
- Verify rendering, mobile behavior, editor-controlled variants, and empty
  states inside the working repo.

## Existing Examples

- Header Component: portable Header global example with primary/utility nav,
  layout controls, dropdowns, mobile menu, and static search.
- Hero Block: simplified block example using bundled template images, variants,
  fixtures, playground controls, presets, and field notes.

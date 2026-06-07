import Link from 'next/link'

import { registry } from '@/registry'
import { siteConfig } from '@/site.config'
import { categoryToAnchor, getPagesByCategory, showcasePages, type ShowcaseStatus } from '@/showcase-pages'

const statusStyles: Record<ShowcaseStatus, string> = {
  ready: 'bg-green-100 text-green-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  draft: 'bg-zinc-100 text-zinc-600',
}

const statusLabels: Record<ShowcaseStatus, string> = {
  ready: 'Ready',
  'in-progress': 'In progress',
  draft: 'Draft',
}

export default function Home() {
  const grouped = getPagesByCategory()

  return (
    <div className="bg-white">
      <section className="bg-brand-primary text-brand-alt">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-alt/80">
            {siteConfig.tagline}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-7 text-brand-alt/65">
            Use the catalog to inspect variants, presets, field mappings, and responsive
            behavior before a component is promoted into the Payload repo.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <div className="text-2xl font-semibold">{showcasePages.length}</div>
              <div className="mt-1 text-sm text-brand-alt/60">Showcase pages</div>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/10 p-4">
              <div className="text-2xl font-semibold">{registry.length}</div>
              <div className="mt-1 text-sm text-brand-alt/60">Registered examples</div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Fixture coverage',
              text: 'Static data keeps examples portable while reviewers compare useful states before Payload data is connected.',
            },
            {
              title: 'Review surfaces',
              text: 'Open an example to inspect its use cases, presets, field mappings, and responsive behavior.',
            },
            {
              title: 'Catalog structure',
              text: 'Items are grouped by Payload area so future sessions can quickly find existing layout, block, page, collection, and admin patterns.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-black/10 bg-white p-5">
              <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-foreground/60">{item.text}</p>
            </div>
          ))}
        </section>

        <div className="mt-12 space-y-14">
          {grouped.map(({ category, pages }) => (
            <section key={category} id={categoryToAnchor(category)} className="scroll-mt-24">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{category}</h2>
                  <p className="mt-1 text-sm text-foreground/55">
                    {pages.length > 0
                      ? `${pages.length} implemented example${pages.length === 1 ? '' : 's'}`
                      : 'Future Payload area'}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
                  {pages.length}
                </span>
              </div>

              {pages.length > 0 ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="group flex min-h-56 flex-col rounded-lg border border-black/10 bg-white p-6 transition-colors hover:border-brand-primary/40 hover:bg-zinc-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{page.name}</h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[page.status]}`}
                        >
                          {statusLabels[page.status]}
                        </span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-6 text-foreground/60">
                        {page.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
                        <span className="text-foreground/45">{page.promoteTarget}</span>
                        <span className="font-semibold text-foreground/75 transition-colors group-hover:text-foreground">
                          Open example
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-lg border border-dashed border-black/15 bg-zinc-50 px-6 py-10">
                  <h3 className="text-sm font-semibold text-foreground">Coming soon</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/55">
                    Keep this category visible so new projects have a clear place for future
                    fixtures, pages, collection previews, and admin-facing patterns.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'

import { siteConfig } from '@/site.config'
import { getPagesByCategory, showcasePages, type ShowcaseStatus } from '@/showcase-pages'

const statusStyles: Record<ShowcaseStatus, string> = {
  ready: 'bg-green-100 text-green-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  planned: 'bg-zinc-100 text-zinc-600',
}

const statusLabels: Record<ShowcaseStatus, string> = {
  ready: 'Ready',
  'in-progress': 'In progress',
  planned: 'Planned',
}

export default function Home() {
  const grouped = getPagesByCategory()
  const categories = Object.keys(grouped)
  const isEmpty = showcasePages.length === 0

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/70">{siteConfig.tagline}</p>
        <p className="mt-2 text-base leading-7 text-foreground/60">{siteConfig.description}</p>
      </header>

      {isEmpty ? (
        <div className="mt-16 rounded-xl border border-dashed border-black/15 bg-zinc-50 px-8 py-16 text-center">
          <h2 className="text-lg font-medium text-foreground">No showcase pages yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground/60">
            Add an entry to{' '}
            <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">
              src/showcase-pages.ts
            </code>{' '}
            and create a matching{' '}
            <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">
              src/app/&lt;slug&gt;/page.tsx
            </code>{' '}
            to see it listed here.
          </p>
        </div>
      ) : (
        <div className="mt-16 space-y-14">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                {category}
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="group flex flex-col rounded-xl border border-black/10 bg-white p-6 transition-colors hover:border-brand-primary/40 hover:bg-zinc-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-medium text-foreground">{page.name}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[page.status]}`}
                      >
                        {statusLabels[page.status]}
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-6 text-foreground/60">
                      {page.description}
                    </p>
                    <span className="mt-4 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                      View block →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

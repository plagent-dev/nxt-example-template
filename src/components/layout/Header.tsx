'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/site.config'
import { categoryOrder, getPagesByCategory, showcasePages } from '@/showcase-pages'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const groupedPages = getPagesByCategory()

  const isActive = (slug: string) => pathname === `/${slug}`

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={siteConfig.logo}
            alt={`${siteConfig.name} logo`}
            width={28}
            height={28}
            priority
          />
          <span className="text-base font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          <li>
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-brand-primary text-brand-alt'
                  : 'text-foreground/70 hover:bg-black/5 hover:text-foreground'
              }`}
            >
              Catalog
            </Link>
          </li>
          {categoryOrder.map((category) => (
            <li key={category} className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground group-focus-within:bg-black/5 group-hover:bg-black/5"
              >
                {category}
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m4 6 4 4 4-4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
              </button>

              <div className="invisible absolute left-0 top-full z-30 w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-lg border border-black/10 bg-white p-2 shadow-xl shadow-black/10">
                  {groupedPages.find((group) => group.category === category)?.pages.length ? (
                    groupedPages
                      .find((group) => group.category === category)
                      ?.pages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/${page.slug}`}
                          aria-current={isActive(page.slug) ? 'page' : undefined}
                          className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${
                            isActive(page.slug)
                              ? 'bg-brand-primary text-brand-alt'
                              : 'text-foreground/75 hover:bg-zinc-50 hover:text-foreground'
                          }`}
                        >
                          <span className="block font-semibold">{page.name}</span>
                          <span className="mt-0.5 block text-xs opacity-70">{page.promoteTarget}</span>
                        </Link>
                      ))
                  ) : (
                    <div className="rounded-md px-3 py-3 text-sm text-foreground/45">
                      <span className="block font-semibold">Coming soon</span>
                      <span className="mt-0.5 block text-xs">No examples registered yet.</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-black/5 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/10 px-4 py-4 md:hidden">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
            className={`mb-4 block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              pathname === '/'
                ? 'bg-brand-primary text-brand-alt'
                : 'text-foreground/75 hover:bg-black/5 hover:text-foreground'
            }`}
          >
            Catalog
          </Link>
          <div className="space-y-4">
            {groupedPages.map(({ category, pages }) => (
              <section key={category}>
                <h2 className="px-3 py-2 text-xs font-semibold text-foreground/50">
                  {category}
                </h2>
                {pages.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {pages.map((page) => (
                      <li key={page.slug}>
                        <Link
                          href={`/${page.slug}`}
                          aria-current={isActive(page.slug) ? 'page' : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive(page.slug)
                              ? 'bg-brand-primary text-brand-alt'
                              : 'text-foreground/70 hover:bg-black/5 hover:text-foreground'
                          }`}
                        >
                          {page.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mx-3 mt-1 rounded-md bg-zinc-50 px-3 py-2 text-sm text-foreground/45">
                    Coming soon
                  </div>
                )}
              </section>
            ))}
          </div>
          <p className="mt-5 border-t border-black/10 pt-4 text-xs leading-5 text-foreground/50">
            {showcasePages.length} implemented examples. Empty categories mark future showcase areas.
          </p>
        </div>
      )}
    </header>
  )
}

export default Header

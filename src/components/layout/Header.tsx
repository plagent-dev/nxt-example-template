'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/site.config'
import { showcasePages } from '@/showcase-pages'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

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

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {showcasePages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                aria-current={isActive(page.slug) ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
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

        {/* Mobile menu toggle */}
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

      {/* Mobile collapsible menu */}
      {menuOpen && (
        <ul className="space-y-1 border-t border-black/10 px-4 py-3 md:hidden">
          {showcasePages.map((page) => (
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
      )}
    </header>
  )
}

export default Header

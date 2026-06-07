'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import type { HeaderComponentProps, HeaderNavItem } from './types'

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
      <path
        d="m14 14 3 3m-1.5-8.5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function ChevronIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  )
}

function DesktopMenuItem({ item }: { item: HeaderNavItem }) {
  const hasMenu = item.submenuItems && item.submenuItems.length > 0
  const isMega = item.submenuType === 'mega'

  if (!hasMenu) {
    return (
      <Link href={item.href} className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950">
        {item.label}
      </Link>
    )
  }

  return (
    <div className="group relative">
      <div className="flex items-center gap-1.5">
        <Link href={item.href} className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950">
          {item.label}
        </Link>
        <button
          type="button"
          className="rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          aria-label={`Open ${item.label} menu`}
        >
          <ChevronIcon />
        </button>
      </div>

      <div
        className={`invisible absolute top-full z-30 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
          isMega ? 'left-1/2 w-[520px] -translate-x-1/2' : 'left-0 w-72'
        }`}
      >
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-xl shadow-black/10">
          {isMega && item.megaMenu ? (
            <div className="grid grid-cols-[minmax(0,1fr)_190px]">
              <div className="p-4">
                <div className="grid gap-2">
                  {item.submenuItems?.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className="block rounded-md p-3 transition-colors hover:bg-zinc-50"
                    >
                      <span className="text-sm font-semibold text-zinc-900">{subItem.label}</span>
                      {subItem.description && (
                        <span className="mt-1 block text-xs leading-5 text-zinc-500">
                          {subItem.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-50 p-4">
                <h3 className="text-sm font-semibold text-zinc-900">{item.megaMenu.title}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-600">{item.megaMenu.description}</p>
                <Link
                  href={item.megaMenu.ctaHref}
                  className="mt-4 inline-flex rounded-md bg-brand-primary px-3 py-2 text-xs font-semibold text-brand-alt"
                >
                  {item.megaMenu.ctaLabel}
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {item.submenuItems?.map((subItem) => (
                <Link
                  key={subItem.id}
                  href={subItem.href}
                  className="block rounded-md p-3 transition-colors hover:bg-zinc-50"
                >
                  <span className="text-sm font-semibold text-zinc-900">{subItem.label}</span>
                  {subItem.description && (
                    <span className="mt-1 block text-xs leading-5 text-zinc-500">
                      {subItem.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SearchExpansion({
  suggestions,
}: {
  suggestions: HeaderComponentProps['searchSuggestions']
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const visibleSuggestions = useMemo(() => {
    if (!query.trim()) return suggestions
    const normalized = query.toLowerCase()
    return suggestions.filter((suggestion) => suggestion.label.toLowerCase().includes(normalized))
  }, [query, suggestions])

  if (!open) {
    return (
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
        aria-label="Open search"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </button>
    )
  }

  return (
    <div className="absolute inset-x-4 top-3 z-40 rounded-lg border border-black/10 bg-white p-2 shadow-lg shadow-black/10 lg:left-auto lg:right-8 lg:w-[360px]">
      <div className="flex items-center gap-2 rounded-md bg-zinc-50 px-3 py-2">
        <SearchIcon />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the demo..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
          autoFocus
        />
        <button
          type="button"
          className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
          aria-label="Close search"
          onClick={() => {
            setOpen(false)
            setQuery('')
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="mt-2 overflow-hidden rounded-md border border-black/10 bg-white">
        {visibleSuggestions.length > 0 ? (
          visibleSuggestions.map((suggestion) => (
            <Link
              key={suggestion.id}
              href={suggestion.href}
              className="flex items-center justify-between gap-3 border-b border-black/5 px-3 py-2.5 text-sm last:border-0 hover:bg-zinc-50"
            >
              <span className="font-medium text-zinc-800">{suggestion.label}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">
                {suggestion.type}
              </span>
            </Link>
          ))
        ) : (
          <p className="px-3 py-4 text-sm text-zinc-500">No static suggestions match.</p>
        )}
      </div>
    </div>
  )
}

export function HeaderComponent({
  brand,
  navItems,
  navPosition,
  separator,
  stickyDesktop,
  stickyMobile,
  searchDisplay,
  searchSuggestions,
}: HeaderComponentProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null)

  const primaryItems = navItems.filter((item) => item.navGroup === 'primary')
  const utilityItems = navItems.filter((item) => item.navGroup === 'utility')
  const mobileQuickItems = navItems.filter((item) => item.showOnMobile).slice(0, 2)
  const showSearch = searchDisplay === 'icon'

  const stickyClass =
    stickyDesktop && stickyMobile
      ? 'sticky top-0'
      : stickyDesktop
        ? 'relative lg:sticky lg:top-0'
        : stickyMobile
          ? 'sticky top-0 lg:relative'
          : 'relative'

  const navPositionClass = {
    left: 'lg:mr-auto',
    center: 'lg:absolute lg:left-1/2 lg:-translate-x-1/2',
    right: 'lg:ml-auto',
  }[navPosition]

  return (
    <header
      className={`${stickyClass} z-20 bg-white ${
        separator === 'border' ? 'border-b border-black/10' : ''
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center gap-5 px-4 sm:px-6">
        <Link href={brand.href} className="flex shrink-0 items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-primary text-xs font-bold text-brand-alt">
            {brand.mark ?? brand.name.slice(0, 2)}
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-950">{brand.name}</span>
        </Link>

        <div className={`hidden items-center gap-6 lg:flex ${navPositionClass}`}>
          {primaryItems.map((item) => (
            <DesktopMenuItem key={item.id} item={item} />
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          {utilityItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
          {showSearch && <SearchExpansion suggestions={searchSuggestions} />}
        </div>

        <div className="ml-auto flex items-center gap-3 lg:hidden">
          {mobileQuickItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-semibold text-zinc-700"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {showSearch && <SearchExpansion suggestions={searchSuggestions} />}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            aria-label="Close menu overlay"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-black/10 px-5">
              <span className="text-sm font-semibold text-zinc-950">{brand.name}</span>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="space-y-2 p-5">
              {showSearch && (
                <div className="mb-4 rounded-lg border border-black/10 bg-zinc-50 px-3 py-2 text-sm text-zinc-500">
                  Search is shown as a static demo in the header controls.
                </div>
              )}
              {navItems.map((item) => {
                const hasMenu = item.submenuItems && item.submenuItems.length > 0
                const isOpen = openMobileSubmenu === item.id

                if (!hasMenu) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-base font-semibold text-zinc-800 hover:bg-zinc-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                }

                return (
                  <div key={item.id} className="rounded-md">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-semibold text-zinc-800 hover:bg-zinc-50"
                      onClick={() => setOpenMobileSubmenu(isOpen ? null : item.id)}
                    >
                      {item.label}
                      <ChevronIcon open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="ml-3 border-l border-black/10 pl-3">
                        <Link
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                          onClick={() => setMobileOpen(false)}
                        >
                          Overview
                        </Link>
                        {item.submenuItems?.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.href}
                            className="block rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
                            onClick={() => setMobileOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>
        </div>
      )}
    </header>
  )
}

export default HeaderComponent

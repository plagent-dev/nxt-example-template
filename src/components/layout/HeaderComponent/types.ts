export type NavPosition = 'left' | 'center' | 'right'
export type SeparatorStyle = 'none' | 'border'
export type SearchDisplay = 'icon' | 'hidden'
export type NavGroup = 'primary' | 'utility'
export type SubmenuType = 'none' | 'dropdown' | 'mega'

export type HeaderSubmenuItem = {
  id: string
  label: string
  href: string
  description?: string
}

export type HeaderMegaMenu = {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export type HeaderNavItem = {
  id: string
  key: string
  label: string
  href: string
  navGroup: NavGroup
  description?: string
  showOnMobile?: boolean
  submenuType?: SubmenuType
  submenuItems?: HeaderSubmenuItem[]
  megaMenu?: HeaderMegaMenu
}

export type HeaderSearchSuggestion = {
  id: string
  label: string
  href: string
  type: string
}

export type HeaderBrand = {
  name: string
  href: string
  mark?: string
}

export type HeaderComponentProps = {
  brand: HeaderBrand
  navItems: HeaderNavItem[]
  navPosition: NavPosition
  separator: SeparatorStyle
  stickyDesktop: boolean
  stickyMobile: boolean
  searchDisplay: SearchDisplay
  searchSuggestions: HeaderSearchSuggestion[]
}

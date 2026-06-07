import type { HeaderComponentProps, HeaderNavItem } from './types'

const navItems: HeaderNavItem[] = [
  {
    id: 'nav-platform',
    key: 'platform',
    label: 'Platform',
    href: '#platform',
    navGroup: 'primary',
    showOnMobile: true,
    submenuType: 'mega',
    description: 'Core product areas and implementation paths.',
    submenuItems: [
      {
        id: 'platform-ui',
        label: 'Interface Blocks',
        href: '#interface-blocks',
        description: 'Reusable components with fixture-driven previews.',
      },
      {
        id: 'platform-content',
        label: 'Content Models',
        href: '#content-models',
        description: 'Payload-ready fields and editor-facing structure.',
      },
      {
        id: 'platform-review',
        label: 'Visual Review',
        href: '#visual-review',
        description: 'Review states before promoting into the working repo.',
      },
    ],
    megaMenu: {
      title: 'Build in the showcase first',
      description:
        'Use static fixtures to validate layout, responsive behavior, and editor-controlled variants before promotion.',
      ctaLabel: 'Review workflow',
      ctaHref: '#workflow',
    },
  },
  {
    id: 'nav-solutions',
    key: 'solutions',
    label: 'Solutions',
    href: '#solutions',
    navGroup: 'primary',
    submenuType: 'dropdown',
    submenuItems: [
      {
        id: 'solutions-marketing',
        label: 'Marketing Site',
        href: '#marketing-site',
        description: 'Landing pages, rich blocks, and campaign pages.',
      },
      {
        id: 'solutions-operations',
        label: 'Operations',
        href: '#operations',
        description: 'Dashboards, collection views, and admin-facing UI.',
      },
    ],
  },
  {
    id: 'nav-pricing',
    key: 'pricing',
    label: 'Pricing',
    href: '#pricing',
    navGroup: 'primary',
  },
  {
    id: 'nav-docs',
    key: 'docs',
    label: 'Docs',
    href: '#docs',
    navGroup: 'utility',
  },
  {
    id: 'nav-contact',
    key: 'contact',
    label: 'Contact',
    href: '#contact',
    navGroup: 'utility',
    showOnMobile: true,
  },
]

const searchSuggestions = [
  { id: 'search-1', label: 'Hero Block fields', href: '#hero-fields', type: 'Block' },
  { id: 'search-2', label: 'Header global settings', href: '#header-global', type: 'Global' },
  { id: 'search-3', label: 'Review checklist', href: '#review', type: 'Guide' },
]

export const headerDefaultFixture: HeaderComponentProps = {
  brand: {
    name: 'Project Name',
    href: '#',
    mark: 'PN',
  },
  navItems,
  navPosition: 'center',
  separator: 'border',
  stickyDesktop: true,
  stickyMobile: true,
  searchDisplay: 'icon',
  searchSuggestions,
}

export const headerLeftFixture: HeaderComponentProps = {
  ...headerDefaultFixture,
  navPosition: 'left',
  brand: {
    name: 'Studio Kit',
    href: '#',
    mark: 'SK',
  },
}

export const headerUtilityFixture: HeaderComponentProps = {
  ...headerDefaultFixture,
  navPosition: 'right',
  separator: 'none',
  stickyDesktop: false,
  stickyMobile: true,
  brand: {
    name: 'Admin Preview',
    href: '#',
    mark: 'AP',
  },
}

export const headerPresets = [
  {
    name: 'Centered Product Header',
    description: 'Balanced desktop header with centered primary navigation and utility links.',
    data: headerDefaultFixture,
  },
  {
    name: 'Left Navigation',
    description: 'Primary navigation sits directly after the brand for denser sites.',
    data: headerLeftFixture,
  },
  {
    name: 'Utility Heavy',
    description: 'Right-positioned primary navigation with no separator and mobile sticky behavior.',
    data: headerUtilityFixture,
  },
]

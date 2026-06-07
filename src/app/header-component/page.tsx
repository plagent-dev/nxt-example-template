'use client'

import { useState } from 'react'

import { HeaderComponent } from '@/components/layout/HeaderComponent/Component'
import { headerComponentMeta } from '@/components/layout/HeaderComponent/meta'
import { headerPresets } from '@/components/layout/HeaderComponent/fixtures'
import type {
  NavPosition,
  SearchDisplay,
  SeparatorStyle,
} from '@/components/layout/HeaderComponent/types'
import { FieldControl } from '@/components/showcase/FieldControl'
import {
  PayloadFieldReference,
  type FieldGroup,
} from '@/components/showcase/PayloadFieldReference'
import { PlaygroundPanel } from '@/components/showcase/PlaygroundPanel'
import { PromotionGuide } from '@/components/showcase/PromotionGuide'

const selectClass =
  'w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-brand-primary'

const checkboxClass = 'h-4 w-4 rounded border-black/20 text-brand-primary'

const useCases = [
  'Preview the Header global before connecting it to Payload data.',
  'Check primary navigation, utility links, and brand text in one place.',
  'Verify dropdown, mega-menu, and mobile drawer behavior before promotion.',
  'Test the search expansion layout with static suggestions and no API dependency.',
]

const fieldGroups: FieldGroup[] = [
  {
    title: 'Header Settings',
    description: 'Global-level fields that affect the whole header.',
    fields: [
      {
        name: 'brand.name',
        type: 'text',
        required: true,
        description: 'Site or project name displayed next to the mark.',
      },
      {
        name: 'navPosition',
        type: 'select',
        required: true,
        description: 'Primary navigation placement on desktop.',
        defaultValue: 'center',
        options: ['left', 'center', 'right'],
      },
      {
        name: 'separator',
        type: 'select',
        description: 'Visual divider below the header.',
        defaultValue: 'border',
        options: ['none', 'border'],
      },
      {
        name: 'stickyDesktop',
        type: 'checkbox',
        description: 'Controls sticky behavior on desktop viewports.',
        defaultValue: 'true',
      },
      {
        name: 'stickyMobile',
        type: 'checkbox',
        description: 'Controls sticky behavior on mobile viewports.',
        defaultValue: 'true',
      },
      {
        name: 'searchDisplay',
        type: 'select',
        description: 'Shows or hides the mock search trigger.',
        defaultValue: 'icon',
        options: ['icon', 'hidden'],
      },
    ],
  },
  {
    title: 'Navigation Items',
    description: 'Repeatable rows that become primary or utility navigation.',
    fields: [
      {
        name: 'navItems[].label',
        type: 'text',
        required: true,
        description: 'Visible navigation label.',
      },
      {
        name: 'navItems[].href',
        type: 'text',
        required: true,
        description: 'Destination for the main item.',
      },
      {
        name: 'navItems[].navGroup',
        type: 'select',
        required: true,
        description: 'Places the item in primary or utility navigation.',
        options: ['primary', 'utility'],
      },
      {
        name: 'navItems[].submenuType',
        type: 'select',
        description: 'Optional dropdown treatment for primary nav items.',
        defaultValue: 'none',
        options: ['none', 'dropdown', 'mega'],
      },
      {
        name: 'navItems[].showOnMobile',
        type: 'checkbox',
        description: 'Allows 1-2 high-priority links outside the mobile drawer.',
      },
    ],
  },
  {
    title: 'Submenu And Search Fixtures',
    description: 'Static showcase data that becomes real editor/API data in the working repo.',
    fields: [
      {
        name: 'submenuItems[].label',
        type: 'text',
        required: true,
        description: 'Visible submenu row label.',
      },
      {
        name: 'submenuItems[].description',
        type: 'text',
        description: 'Short helper copy in dropdown and mega-menu rows.',
      },
      {
        name: 'searchSuggestions[].label',
        type: 'text',
        description: 'Static suggestion label used only for the showcase mock.',
      },
    ],
  },
]

export default function HeaderComponentPage() {
  const [presetIndex, setPresetIndex] = useState(0)
  const activePreset = headerPresets[presetIndex].data
  const [navPosition, setNavPosition] = useState<NavPosition>(activePreset.navPosition)
  const [separator, setSeparator] = useState<SeparatorStyle>(activePreset.separator)
  const [stickyDesktop, setStickyDesktop] = useState(activePreset.stickyDesktop)
  const [stickyMobile, setStickyMobile] = useState(activePreset.stickyMobile)
  const [searchDisplay, setSearchDisplay] = useState<SearchDisplay>(activePreset.searchDisplay)

  const playgroundData = {
    ...activePreset,
    navPosition,
    separator,
    stickyDesktop,
    stickyMobile,
    searchDisplay,
  }

  function applyPreset(index: number) {
    const preset = headerPresets[index].data
    setPresetIndex(index)
    setNavPosition(preset.navPosition)
    setSeparator(preset.separator)
    setStickyDesktop(preset.stickyDesktop)
    setStickyMobile(preset.stickyMobile)
    setSearchDisplay(preset.searchDisplay)
  }

  return (
    <div className="bg-white">
      <section className="border-b border-black/10 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground/45">
            <span>{headerComponentMeta.category}</span>
            <span>/</span>
            <span>{headerComponentMeta.status}</span>
            <span>/</span>
            <span>{headerComponentMeta.promoteTarget}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            {headerComponentMeta.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-foreground/65">
            {headerComponentMeta.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-6 py-12">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/65">
            {useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>

        <PlaygroundPanel
          description="This is a portable stand-in for a Payload Header global. The controls mirror fields the working repo can expose to editors."
          previewClassName="min-h-[240px] bg-zinc-100 p-4"
          controls={
            <>
              <FieldControl label="Preset" required description="Switch fixture sets.">
                <select
                  value={presetIndex}
                  onChange={(event) => applyPreset(Number(event.target.value))}
                  className={selectClass}
                >
                  {headerPresets.map((preset, index) => (
                    <option key={preset.name} value={index}>
                      {preset.name}
                    </option>
                  ))}
                </select>
              </FieldControl>

              <FieldControl label="Nav Position" required description="Primary nav placement.">
                <select
                  value={navPosition}
                  onChange={(event) => setNavPosition(event.target.value as NavPosition)}
                  className={selectClass}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </FieldControl>

              <FieldControl label="Separator" description="Visual separation below header.">
                <select
                  value={separator}
                  onChange={(event) => setSeparator(event.target.value as SeparatorStyle)}
                  className={selectClass}
                >
                  <option value="border">Border</option>
                  <option value="none">None</option>
                </select>
              </FieldControl>

              <FieldControl label="Sticky Desktop">
                <span className="flex items-center gap-2 text-sm text-foreground/70">
                  <input
                    type="checkbox"
                    checked={stickyDesktop}
                    onChange={(event) => setStickyDesktop(event.target.checked)}
                    className={checkboxClass}
                  />
                  Enabled on large viewports
                </span>
              </FieldControl>

              <FieldControl label="Sticky Mobile">
                <span className="flex items-center gap-2 text-sm text-foreground/70">
                  <input
                    type="checkbox"
                    checked={stickyMobile}
                    onChange={(event) => setStickyMobile(event.target.checked)}
                    className={checkboxClass}
                  />
                  Enabled below desktop
                </span>
              </FieldControl>

              <FieldControl label="Mock Search" description="Static suggestions only.">
                <span className="flex items-center gap-2 text-sm text-foreground/70">
                  <input
                    type="checkbox"
                    checked={searchDisplay === 'icon'}
                    onChange={(event) => setSearchDisplay(event.target.checked ? 'icon' : 'hidden')}
                    className={checkboxClass}
                  />
                  Show search trigger
                </span>
              </FieldControl>
            </>
          }
          preview={
            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <HeaderComponent {...playgroundData} />
              <div className="px-6 py-10 text-sm leading-6 text-zinc-500">
                Use this preview to test dropdowns, search expansion, sticky behavior, and the
                mobile drawer before EngAI adapts the approved pattern in the Payload repo.
              </div>
            </div>
          }
        />

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Presets</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/60">
              Saved header configurations for checking common navigation layouts and mobile states.
            </p>
          </div>
          <div className="space-y-8">
            {headerPresets.map((preset) => (
              <article key={preset.name} className="overflow-hidden rounded-lg border border-black/10">
                <div className="border-b border-black/10 bg-white px-5 py-4">
                  <h3 className="text-base font-semibold text-foreground">{preset.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-foreground/60">{preset.description}</p>
                </div>
                <div className="bg-zinc-100 p-4">
                  <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
                    <HeaderComponent {...preset.data} stickyDesktop={false} stickyMobile={false} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <PayloadFieldReference groups={fieldGroups} />

        <PromotionGuide
          target="Payload global: header"
          sourceFiles={[
            'src/components/layout/HeaderComponent/Component.tsx',
            'src/components/layout/HeaderComponent/types.ts',
            'src/components/layout/HeaderComponent/fixtures.ts',
            'src/components/layout/HeaderComponent/meta.ts',
          ]}
        />
      </main>
    </div>
  )
}

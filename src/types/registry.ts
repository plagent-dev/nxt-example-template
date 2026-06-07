export type ShowcaseCategory = 'Layout' | 'Blocks' | 'Collections' | 'Pages' | 'Admin'

export type ShowcaseStatus = 'draft' | 'in-progress' | 'ready'

export type ComponentMeta = {
  name: string
  slug: string
  category: ShowcaseCategory
  status: ShowcaseStatus
  description: string
  presetCount: number
  fixtureCount: number
  promoteTarget: 'Payload block' | 'Payload global' | 'Payload collection' | 'Page composition'
}

import type { ReactNode } from 'react'

type PlaygroundPanelProps = {
  title?: string
  description?: string
  controls: ReactNode
  preview: ReactNode
  previewLabel?: string
  previewClassName?: string
}

export function PlaygroundPanel({
  title = 'Interactive Playground',
  description,
  controls,
  preview,
  previewLabel = 'Live preview',
  previewClassName = 'bg-zinc-50',
}: PlaygroundPanelProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5">
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-sm leading-6 text-foreground/60">{description}</p>
          )}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{controls}</div>
      </section>

      <section className="overflow-hidden rounded-lg border border-black/10 bg-white">
        <div className="border-b border-black/10 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">{previewLabel}</h3>
        </div>
        <div className={previewClassName}>{preview}</div>
      </section>
    </div>
  )
}

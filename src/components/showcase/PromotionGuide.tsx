type PromotionStep = {
  title: string
  detail: string
}

type PromotionGuideProps = {
  title?: string
  target: string
  sourceFiles: string[]
  steps?: PromotionStep[]
}

const defaultSteps: PromotionStep[] = [
  {
    title: 'Confirm approval scope',
    detail: 'Use the approved showcase state as the reference for what should move into the working repo.',
  },
  {
    title: 'Keep the component boundary clear',
    detail: 'Separate reusable component code from showcase-only playground controls, fixtures, and review notes.',
  },
  {
    title: 'Map fixture data to Payload',
    detail: 'Translate reviewed fixture props into block fields, globals, relationships, or collection data.',
  },
  {
    title: 'Verify in the working repo',
    detail: 'EngAI should confirm rendering, responsive behavior, and editor-controlled states after promotion.',
  },
]

export function PromotionGuide({
  title = 'Payload Handoff Notes',
  target,
  sourceFiles,
  steps = defaultSteps,
}: PromotionGuideProps) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-foreground/60">Target: {target}</p>
        </div>
        <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
          EngAI handoff notes
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-brand-alt">
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-foreground/60">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-md bg-zinc-50 p-4">
          <h3 className="text-xs font-semibold text-foreground/50">
            Implementation files
          </h3>
          <ul className="mt-3 space-y-2">
            {sourceFiles.map((file) => (
              <li key={file}>
                <code className="rounded bg-white px-1.5 py-1 text-xs text-foreground/75 ring-1 ring-black/10">
                  {file}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

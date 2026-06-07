export type FieldSpec = {
  name: string
  type: string
  required?: boolean
  description: string
  defaultValue?: string
  options?: string[]
}

export type FieldGroup = {
  title: string
  description?: string
  fields: FieldSpec[]
}

type PayloadFieldReferenceProps = {
  groups: FieldGroup[]
}

export function PayloadFieldReference({ groups }: PayloadFieldReferenceProps) {
  const totalFields = groups.reduce((sum, group) => sum + group.fields.length, 0)
  const requiredFields = groups.reduce(
    (sum, group) => sum + group.fields.filter((field) => field.required).length,
    0,
  )

  return (
    <section id="field-reference" className="scroll-mt-24 space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Payload Field Reference
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/60">
          Field map for PMAI, PLAI, and EngAI to review before the component is adapted in the working repo.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-foreground/50">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">{totalFields} fields</span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">
            {requiredFields} required
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1">
            {totalFields - requiredFields} optional
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <article key={group.title} className="overflow-hidden rounded-lg border border-black/10 bg-white">
            <div className="border-b border-black/10 bg-zinc-50 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                  {group.description && (
                    <p className="mt-1 text-xs leading-5 text-foreground/55">{group.description}</p>
                  )}
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-foreground/45 ring-1 ring-black/10">
                  {group.fields.length} fields
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-black/10 text-xs text-foreground/45">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Field</th>
                    <th className="px-5 py-3 font-semibold">Type</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {group.fields.map((field) => (
                    <tr key={field.name} className="border-b border-black/5 last:border-0">
                      <td className="px-5 py-3 align-top">
                        <code className="rounded bg-zinc-100 px-1.5 py-1 text-xs text-foreground">
                          {field.name}
                        </code>
                      </td>
                      <td className="px-5 py-3 align-top">
                        <span className="rounded bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-100">
                          {field.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 align-top">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                            field.required
                              ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-100'
                              : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200'
                          }`}
                        >
                          {field.required ? 'Required' : 'Optional'}
                        </span>
                      </td>
                      <td className="px-5 py-3 align-top text-foreground/60">
                        {field.description}
                        {field.defaultValue && (
                          <span className="ml-1 text-foreground/40">
                            Default: {field.defaultValue}.
                          </span>
                        )}
                        {field.options?.length ? (
                          <span className="mt-1 block text-xs text-foreground/40">
                            Options: {field.options.join(', ')}
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

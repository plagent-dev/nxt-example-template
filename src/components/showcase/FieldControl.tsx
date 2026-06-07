import type { ReactNode } from 'react'

type FieldControlProps = {
  label: string
  description?: string
  required?: boolean
  children: ReactNode
}

export function FieldControl({
  label,
  description,
  required = false,
  children,
}: FieldControlProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
        {label}
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            required
              ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
              : 'bg-zinc-100 text-zinc-500 ring-1 ring-zinc-200'
          }`}
        >
          {required ? 'Required' : 'Optional'}
        </span>
      </span>
      {description && (
        <span className="mt-1 block text-xs leading-5 text-foreground/55">{description}</span>
      )}
      <span className="mt-2 block">{children}</span>
    </label>
  )
}

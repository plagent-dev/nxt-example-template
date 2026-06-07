import Image from 'next/image'
import Link from 'next/link'

import type { HeroAction, HeroAlignment, HeroBlockProps } from './types'

const alignmentClasses: Record<HeroAlignment, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
}

const splitAlignmentClasses: Record<HeroAlignment, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

function Actions({ actions, inverse = false }: { actions?: HeroAction[]; inverse?: boolean }) {
  if (!actions?.length) return null

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {actions.map((action) => {
        const isSecondary = action.tone === 'secondary'
        const classes = inverse
          ? isSecondary
            ? 'border border-white/40 bg-white/10 text-white hover:bg-white/20'
            : 'bg-white text-zinc-950 hover:bg-zinc-100'
          : isSecondary
            ? 'border border-black/15 bg-white text-zinc-800 hover:bg-zinc-50'
            : 'bg-brand-primary text-brand-alt hover:bg-zinc-800'

        return (
          <Link
            key={`${action.label}-${action.href}`}
            href={action.href}
            className={`rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${classes}`}
          >
            {action.label}
          </Link>
        )
      })}
    </div>
  )
}

function Eyebrow({ children, inverse = false }: { children?: string; inverse?: boolean }) {
  if (!children) return null

  return (
    <p
      className={`mb-4 text-xs font-semibold ${
        inverse ? 'text-white/75' : 'text-foreground/50'
      }`}
    >
      {children}
    </p>
  )
}

function BackgroundHero({ eyebrow, title, subtitle, image, alignment = 'left', actions }: HeroBlockProps) {
  const alignmentClass = alignmentClasses[alignment]

  return (
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-zinc-950 text-white">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className={`flex max-w-3xl flex-col ${alignmentClass}`}>
          <Eyebrow inverse>{eyebrow}</Eyebrow>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">{subtitle}</p>}
          <Actions actions={actions} inverse />
        </div>
      </div>
    </section>
  )
}

function SplitHero({ eyebrow, title, subtitle, image, alignment = 'left', actions }: HeroBlockProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-center lg:py-20">
        <div className={`flex flex-col ${splitAlignmentClasses[alignment]}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/65">{subtitle}</p>}
          <Actions actions={actions} />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100">
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}

function CompactHero({ eyebrow, title, subtitle, image, alignment = 'center' }: HeroBlockProps) {
  const alignmentClass = alignmentClasses[alignment]

  return (
    <section className="overflow-hidden bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
        <div className={`flex max-w-3xl flex-col ${alignmentClass}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/60 md:text-base">{subtitle}</p>}
        </div>
        {image && (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-white md:block">
            <Image src={image.src} alt={image.alt} fill sizes="220px" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}

export function HeroBlock(props: HeroBlockProps) {
  if (props.variant === 'split') return <SplitHero {...props} />
  if (props.variant === 'compact') return <CompactHero {...props} />
  return <BackgroundHero {...props} />
}

export default HeroBlock

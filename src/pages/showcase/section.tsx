import type { ReactNode } from "react"

interface SectionProps {
  index: string
  title: string
  body: string
  children: ReactNode
  id?: string
}

function Section({ index, title, body, children, id }: SectionProps) {
  const step = index.split(" · ")[0]
  const sectionId = id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return (
    <section id={sectionId} aria-labelledby={`${sectionId}-title`} className="mx-auto w-full max-w-5xl scroll-mt-20">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
          {step}
        </span>
        <h2 id={`${sectionId}-title`} className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      <p className="mt-2 max-w-2xl text-muted-foreground">{body}</p>
      <div className="mt-5 rounded-xl border bg-background p-6 shadow-xs">
        {children}
      </div>
    </section>
  )
}

export { Section }

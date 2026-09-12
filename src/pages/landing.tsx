import { ArrowRight, Blocks, Check, Code2, ExternalLink, LayoutGrid, Palette, Zap } from "lucide-react"
import { Link } from "react-router"

import { BrandMark } from "@/components/layout/brand-mark"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const BENEFITS = [
  "Responsive shell with desktop and mobile navigation",
  "Theme-aware primitives built for real product surfaces",
  "A complete showcase to copy from while you build",
]

const STACK_ITEMS = [
  { label: "Vite + React", detail: "Fast typed foundation", icon: Code2 },
  { label: "TypeScript + Tailwind", detail: "Clear, compact styling", icon: Palette },
  { label: "shadcn + Base UI", detail: "Accessible primitives and tooling", icon: Blocks },
  { label: "Lucide + PWA", detail: "Icons, offline shell and tokens", icon: Zap },
] as const

function LandingHeader() {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" aria-label="Alvor home" className="flex shrink-0 items-center gap-2.5">
          <BrandMark className="size-8 rounded-[8px]" />
          <span className="font-heading text-base font-semibold tracking-tight">Alvor</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          <Link
            to="/"
            aria-current="page"
            className="rounded-lg bg-muted px-3 py-2 type-caption font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            Landing
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-2 type-caption text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            to="/showcase"
            className="rounded-lg px-3 py-2 type-caption text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Showcase
          </Link>
        </nav>
        <Button size="sm" render={<a href="/login" target="_blank" rel="noopener noreferrer" />}>
          Preview sign-in
          <ExternalLink data-icon="inline-end" />
        </Button>
      </div>
    </header>
  )
}

function Landing() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed top-2 left-2 z-50 rounded-md bg-primary px-3 py-2 type-caption font-medium text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content">
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <Badge variant="outline" className="gap-1.5 px-3 py-1">
              <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
              A calm React starting point
            </Badge>
            <h1 className="font-heading mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-[2.75rem]">
              Start with clarity. Build with confidence.
            </h1>
            <p className="mt-5 max-w-xl type-body text-muted-foreground text-pretty">
              Alvor is a polished Vite and React template for products that need a steady visual language from their first screen to their daily workflow.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" render={<Link to="/showcase" />}>
                Explore the showcase
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="outline" render={<Link to="/dashboard" />}>
                View dashboard
              </Button>
            </div>
            <ul className="mt-8 grid max-w-xl gap-3 type-caption text-muted-foreground sm:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" aria-hidden="true" />
            <Card className="relative overflow-hidden border-border/80 shadow-2xl shadow-primary/10">
              <CardHeader className="border-b bg-card/80 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <BrandMark className="size-7 rounded-[7px]" />
                    <div>
                      <p className="type-caption font-semibold">Dashboard</p>
                      <p className="type-caption text-muted-foreground">A focused place to begin</p>
                    </div>
                  </div>
                  <span className="size-2 rounded-full bg-success" aria-label="Preview surface" />
                </div>
              </CardHeader>
              <CardContent className="grid gap-5 p-5 sm:p-6">
                <div>
                  <p className="type-caption font-medium text-muted-foreground">Good morning, Ada</p>
                  <p className="mt-1 font-heading text-2xl font-semibold tracking-tight">Keep momentum without noise.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <div className="flex items-center gap-2 type-caption font-medium">
                      <LayoutGrid className="size-4 text-primary" aria-hidden="true" />
                      Recent work
                    </div>
                    <p className="mt-4 font-heading text-2xl font-semibold">A short list</p>
                    <p className="mt-1 type-caption text-muted-foreground">Items ready for review</p>
                  </div>
                  <div className="rounded-xl border bg-muted/40 p-4">
                    <p className="type-caption font-medium">Next up</p>
                    <p className="mt-4 truncate font-medium">Shape your first view</p>
                    <p className="mt-1 type-caption text-muted-foreground">A small step, clearly shown</p>
                  </div>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="type-caption font-medium">Design language</p>
                    <Badge variant="secondary">Graphite</Badge>
                  </div>
                  <div className="mt-4 flex gap-2" aria-hidden="true">
                    <span className="h-2 flex-1 rounded-full bg-primary" />
                    <span className="h-2 w-1/3 rounded-full bg-muted" />
                    <span className="h-2 w-1/5 rounded-full bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="stack-title" className="border-y bg-card/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-caption font-semibold uppercase tracking-[0.12em] text-primary">Included</p>
                <h2 id="stack-title" className="mt-1 font-heading text-xl font-semibold tracking-tight">A focused stack, ready to shape.</h2>
              </div>
              <Link to="/showcase" className="type-caption font-medium text-muted-foreground hover:text-foreground">See it in action →</Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STACK_ITEMS.map(({ detail, icon: Icon, label }) => (
                <div key={label} className="rounded-xl border bg-background p-4">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                  <p className="mt-4 type-body font-medium">{label}</p>
                  <p className="mt-1 type-caption text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-card/50">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-10">
            <div>
              <p className="type-caption font-semibold text-primary">01</p>
              <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight">Quiet visual system</h2>
              <p className="mt-2 type-caption text-muted-foreground">Graphite surfaces, restrained depth and readable type keep attention on work.</p>
            </div>
            <div>
              <p className="type-caption font-semibold text-primary">02</p>
              <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight">Useful from day one</h2>
              <p className="mt-2 type-caption text-muted-foreground">The dashboard shows one practical composition instead of a wall of empty metrics.</p>
            </div>
            <div>
              <p className="type-caption font-semibold text-primary">03</p>
              <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight">Easy to make yours</h2>
              <p className="mt-2 type-caption text-muted-foreground">Browse every shipped primitive in Showcase, then carry the patterns into your product.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 type-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>Alvor — a composed starting point for your next product.</span>
        <Link to="/showcase" className="font-medium text-foreground hover:underline">Browse components</Link>
      </footer>
    </div>
  )
}

export { Landing }

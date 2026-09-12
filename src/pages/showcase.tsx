import type { ReactNode } from "react"
import { Link } from "react-router"

import { Separator } from "@/components/ui/separator"
import { Section } from "@/pages/showcase/section"
import { DataTableDemo } from "@/pages/showcase/data-table-demo"
import { AccountSection } from "@/pages/showcase/account-demo"
import { AsyncStatesSection } from "@/pages/showcase/async-states-demo"
import {
  ButtonsSection,
  CardsSection,
  IndicatorsSection,
  InventoryTableSection,
  ListGroupsSection,
  SemanticRolesSection,
  TypographySection,
} from "@/pages/showcase/basics"
import {
  DialogSection,
  OverlaysSection,
  TabsAccordionSection,
} from "@/pages/showcase/disclosure"
import { FormsSection } from "@/pages/showcase/forms-demo"
import { NavigationSection } from "@/pages/showcase/navigation-demo"
import { ToastsSection } from "@/pages/showcase/toasts-demo"
import { SHOWCASE_SECTIONS } from "@/pages/showcase/section-registry"

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex min-w-5 items-center justify-center rounded border bg-muted px-1.5 py-px font-sans text-[11px]">
      {children}
    </kbd>
  )
}

function Showcase() {
  return (
    <div className="flex flex-col gap-10 py-6 lg:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <p className="w-fit rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          Showcase
        </p>
        <h1 className="font-heading mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem]">
          Every element, one page.
        </h1>
        <p className="mt-3 max-w-xl type-body text-muted-foreground text-pretty">
          The template&apos;s building blocks in its own Graphite voice — gallery
          structure inspired by classic theme previews, styling entirely Alvor.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 type-caption text-muted-foreground">
          <span>
            <Kbd>/</Kbd> focuses search
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span>Search finds sections and destinations</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Theme button toggles light and dark</span>
        </div>
      </div>

      <ShowcaseIndex />
      <ButtonsSection />
      <TypographySection />
      <InventoryTableSection />
      <FormsSection />
      <TabsAccordionSection />
      <IndicatorsSection />
      <CardsSection />
      <DialogSection />
      <SemanticRolesSection />
      <NavigationSection />
      <OverlaysSection />
      <ListGroupsSection />
      <AsyncStatesSection />
      <DataTableSection />
      <AccountSection />
      <ToastsSection />
    </div>
  )
}

function ShowcaseIndex() {
  return (
    <section aria-labelledby="showcase-index-title" className="mx-auto w-full max-w-5xl rounded-xl border bg-card p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="type-caption font-semibold uppercase tracking-[0.12em] text-primary">Quick index</p>
          <h2 id="showcase-index-title" className="mt-1 font-heading text-xl font-semibold tracking-tight">Find a pattern</h2>
        </div>
        <p className="type-caption text-muted-foreground">Jump straight to any component family.</p>
      </div>
      <nav aria-label="Showcase sections" className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {SHOWCASE_SECTIONS.map((section) => (
          <Link
            key={section.id}
            to={`/showcase#${section.id}`}
            className="rounded-lg border bg-background px-3 py-2.5 type-caption font-medium transition-colors hover:border-primary/40 hover:bg-muted"
          >
            {section.label}
          </Link>
        ))}
      </nav>
    </section>
  )
}

function DataTableSection() {
  return (
    <Section
      index="14 · Data table"
      title="Data table"
      body="Live filter, sortable columns, and paging composed from installed primitives — no table library."
    >
      <DataTableDemo />
    </Section>
  )
}

export { Showcase }

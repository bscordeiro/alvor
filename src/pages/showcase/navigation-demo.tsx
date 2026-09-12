import { useState } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Section } from "@/pages/showcase/section"

function NavigationSection() {
  const [pill, setPill] = useState("Overview")
  const [page, setPage] = useState(2)

  return (
    <Section
      index="10 · Navigation"
      id="navigation"
      title="Navigation"
      body="Pills, breadcrumbs, and working pagination for moving between pages."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-1">
          {["Overview", "Analytics", "Reports", "Disabled"].map((label) => (
            <button
              key={label}
              type="button"
              disabled={label === "Disabled"}
              aria-pressed={pill === label}
              onClick={() => setPill(label)}
              className={`rounded-full px-3.5 py-1.5 type-body font-medium transition-colors disabled:opacity-50 ${
                pill === label
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Library</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#navigation"
                onClick={(event) => {
                  event.preventDefault()
                  setPage((current) => Math.max(1, current - 1))
                }}
              />
            </PaginationItem>
            {[1, 2, 3].map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#navigation"
                  isActive={page === number}
                  onClick={(event) => {
                    event.preventDefault()
                    setPage(number)
                  }}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#navigation"
                onClick={(event) => {
                  event.preventDefault()
                  setPage((current) => Math.min(3, current + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Section>
  )
}

export { NavigationSection }

import { useMemo, useState, type FormEvent } from "react"
import { Activity, ArrowDown, ArrowUp, ArrowUpDown, BarChart3, Plus, Search } from "lucide-react"
import { toast } from "sonner"
import { useSearchParams } from "react-router"

import { ActivityLineChart, WorkloadBarChart } from "@/components/dashboard/inline-charts"
import { MetricCard } from "@/components/dashboard/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ACTIVITY_DATA, DASHBOARD_METRICS, WORKLOAD_DATA } from "@/data/dashboard"

interface WorkItem {
  id: string
  name: string
  type: string
  status: "In progress" | "Ready" | "Draft"
  updated: string
}

type SortKey = "name" | "status"

const INITIAL_WORK_ITEMS: WorkItem[] = [
  { id: "product-launch", name: "Product launch", type: "Project", status: "In progress", updated: "Today" },
  { id: "onboarding-flow", name: "Onboarding flow", type: "Design", status: "Ready", updated: "Yesterday" },
  { id: "workspace-defaults", name: "Workspace defaults", type: "Settings", status: "Draft", updated: "Mon" },
  { id: "release-notes", name: "Release notes", type: "Document", status: "Ready", updated: "Fri" },
  { id: "navigation-audit", name: "Navigation audit", type: "Research", status: "In progress", updated: "Thu" },
  { id: "empty-states", name: "Empty states", type: "Design", status: "Draft", updated: "Wed" },
  { id: "invite-flow", name: "Invite flow", type: "Project", status: "Ready", updated: "Tue" },
]

const WORK_TYPES = ["Project", "Design", "Settings", "Document", "Research"] as const

const PAGE_SIZE = 4

function statusVariant(status: WorkItem["status"]) {
  if (status === "Ready") return "default" as const
  if (status === "In progress") return "secondary" as const
  return "outline" as const
}

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [workItems, setWorkItems] = useState(INITIAL_WORK_ITEMS)
  const [newItemOpen, setNewItemOpen] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemType, setNewItemType] = useState<(typeof WORK_TYPES)[number]>("Project")
  const query = searchParams.get("q") ?? ""
  const requestedSort = searchParams.get("sort")
  const sortKey: SortKey | null = requestedSort === "status" || requestedSort === "name" ? requestedSort : null
  const sortDirection = searchParams.get("dir") === "desc" ? -1 : 1
  const requestedPage = Number(searchParams.get("page") ?? "1")
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const items = workItems.filter((item) =>
      !normalizedQuery ||
      [item.name, item.type, item.status].some((value) => value.toLowerCase().includes(normalizedQuery)),
    )
    if (!sortKey) return items
    return [...items].sort((left, right) => left[sortKey].localeCompare(right[sortKey]) * sortDirection)
  }, [query, sortDirection, sortKey, workItems])

  const pages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))
  const safePage = Math.min(page, pages)
  const visibleItems = filteredItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function updateParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") next.delete(key)
      else next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  function toggleSort(nextKey: SortKey) {
    const nextDirection = nextKey === sortKey && sortDirection === 1 ? "desc" : null
    updateParams({
      sort: nextKey === "name" ? null : nextKey,
      dir: nextDirection,
      page: null,
    })
  }

  function handleNewItemOpen(nextOpen: boolean) {
    setNewItemOpen(nextOpen)
    if (!nextOpen) {
      setNewItemName("")
      setNewItemType("Project")
    }
  }

  function addWorkItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = newItemName.trim()
    if (!name) return

    setWorkItems((current) => [
      {
        id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        name,
        type: newItemType,
        status: "Draft",
        updated: "Just now",
      },
      ...current,
    ])
    updateParams({ page: null })
    handleNewItemOpen(false)
    toast.success("Work item added", { description: `${name} is ready to shape.` })
  }

  return (
    <div className="flex w-full flex-col gap-6 py-6 lg:py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="w-fit rounded-full border bg-card px-3 py-1 type-caption font-medium text-muted-foreground">Dashboard</p>
          <h1 className="font-heading mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem]">Your workspace at a glance</h1>
          <p className="mt-3 max-w-xl type-body text-muted-foreground text-pretty">Track current work, team capacity, and what needs attention today.</p>
        </div>
        <Dialog open={newItemOpen} onOpenChange={handleNewItemOpen}>
          <DialogTrigger render={<Button />}>
            <Plus data-icon="inline-start" />
            New work item
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New work item</DialogTitle>
              <DialogDescription>Add an item to your current workspace.</DialogDescription>
            </DialogHeader>
            <form onSubmit={addWorkItem} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-work-item-name">Name</Label>
                <Input
                  id="new-work-item-name"
                  value={newItemName}
                  onChange={(event) => setNewItemName(event.target.value)}
                  placeholder="e.g. Q3 planning"
                  autoFocus
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-work-item-type">Type</Label>
                <Select value={newItemType} onValueChange={(value) => setNewItemType(value ?? "Project")}>
                  <SelectTrigger id="new-work-item-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
                <Button type="submit">Add item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <section aria-labelledby="dashboard-metrics-title">
        <div className="mb-3">
          <h2 id="dashboard-metrics-title" className="font-heading text-xl font-semibold tracking-tight">Workspace overview</h2>
          <p className="mt-1 type-caption text-muted-foreground">Current work and team capacity at a glance.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_METRICS.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>

      <section aria-labelledby="activity-title">
        <div className="mb-3">
          <h2 id="activity-title" className="font-heading text-xl font-semibold tracking-tight">Activity</h2>
          <p className="mt-1 type-caption text-muted-foreground">Signals across current work and team capacity.</p>
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="size-4 text-muted-foreground" aria-hidden="true" />Weekly activity</CardTitle>
              <CardDescription>Items moved through the workspace.</CardDescription>
            </CardHeader>
            <CardContent><ActivityLineChart data={ACTIVITY_DATA} title="Weekly workspace activity" /></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="size-4 text-muted-foreground" aria-hidden="true" />Workload mix</CardTitle>
              <CardDescription>Current capacity by work type.</CardDescription>
            </CardHeader>
            <CardContent><WorkloadBarChart data={WORKLOAD_DATA} title="Current workload mix" /></CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="recent-work-title">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="recent-work-title" className="font-heading text-xl font-semibold tracking-tight">Recent work</h2>
            <p className="mt-1 type-caption text-muted-foreground">Items recently created or updated in your workspace.</p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => updateParams({ q: event.target.value, page: null })}
              placeholder="Filter work items…"
              aria-label="Filter work items"
              className="pl-9"
            />
          </div>
        </div>
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead aria-sort={sortKey === "name" ? (sortDirection === 1 ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => toggleSort("name")} className="inline-flex min-h-8 items-center gap-1 rounded-md font-medium hover:text-foreground" aria-label={`Sort by name, currently ${sortKey === "name" ? (sortDirection === 1 ? "ascending" : "descending") : "unsorted"}`}>
                    Name {sortIcon("name", sortKey, sortDirection)}
                  </button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead aria-sort={sortKey === "status" ? (sortDirection === 1 ? "ascending" : "descending") : "none"}>
                  <button type="button" onClick={() => toggleSort("status")} className="inline-flex min-h-8 items-center gap-1 rounded-md font-medium hover:text-foreground" aria-label={`Sort by status, currently ${sortKey === "status" ? (sortDirection === 1 ? "ascending" : "descending") : "unsorted"}`}>
                    Status {sortIcon("status", sortKey, sortDirection)}
                  </button>
                </TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.type}</TableCell>
                  <TableCell><Badge variant={statusVariant(item.status)}>{item.status}</Badge></TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.updated}</TableCell>
                </TableRow>
              ))}
              {visibleItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">No work matches “{query}”.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="type-caption text-muted-foreground">Showing {visibleItems.length} of {filteredItems.length}</p>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <Button size="sm" variant="outline" disabled={safePage === 1} onClick={() => updateParams({ page: String(safePage - 1) })}>Previous</Button>
              <span className="min-w-24 text-center type-caption text-muted-foreground">Page {safePage} of {pages}</span>
              <Button size="sm" variant="outline" disabled={safePage === pages} onClick={() => updateParams({ page: String(safePage + 1) })}>Next</Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}

function sortIcon(key: SortKey, sortKey: SortKey | null, sortDirection: 1 | -1) {
  if (key !== sortKey) return <ArrowUpDown className="size-3.5 opacity-50" aria-hidden="true" />
  return sortDirection === 1 ? <ArrowUp className="size-3.5" aria-hidden="true" /> : <ArrowDown className="size-3.5" aria-hidden="true" />
}

export { Dashboard }

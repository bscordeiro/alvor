import { useMemo, useState } from "react"
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type SortKey = "name" | "role"

const TEAM = [
  { name: "Ada Lovelace", email: "ada@alvor.dev", role: "Engineer", status: "Active" },
  { name: "Grace Hopper", email: "grace@alvor.dev", role: "Designer", status: "Active" },
  { name: "Alan Turing", email: "alan@alvor.dev", role: "Engineer", status: "Invited" },
  { name: "Katherine Johnson", email: "katherine@alvor.dev", role: "Manager", status: "Active" },
  { name: "Margaret Hamilton", email: "margaret@alvor.dev", role: "Engineer", status: "Suspended" },
  { name: "Tim Berners-Lee", email: "tim@alvor.dev", role: "Designer", status: "Active" },
  { name: "Barbara Liskov", email: "barbara@alvor.dev", role: "Manager", status: "Invited" },
  { name: "Donald Knuth", email: "donald@alvor.dev", role: "Engineer", status: "Active" },
]

const TEAM_PAGE_SIZE = 5

function statusVariant(status: string) {
  if (status === "Active") return "default" as const
  if (status === "Invited") return "secondary" as const
  return "destructive" as const
}

function DataTableDemo() {
  const [query, setQuery] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<1 | -1>(1)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = TEAM.filter(
      (member) =>
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q),
    )
    rows.sort((a, b) => a[sortKey].localeCompare(b[sortKey]) * sortDir)
    return rows
  }, [query, sortKey, sortDir])
  const pages = Math.max(1, Math.ceil(filtered.length / TEAM_PAGE_SIZE))
  const safePage = Math.min(page, pages)
  const rows = filtered.slice(
    (safePage - 1) * TEAM_PAGE_SIZE,
    safePage * TEAM_PAGE_SIZE,
  )

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 1 ? -1 : 1))
    } else {
      setSortKey(key)
      setSortDir(1)
    }
    setPage(1)
  }

  function sortIcon(key: SortKey) {
    if (key !== sortKey) {
      return <ArrowUpDown className="size-3.5 opacity-50" />
    }
    return sortDir === 1 ? (
      <ArrowUp className="size-3.5" />
    ) : (
      <ArrowDown className="size-3.5" />
    )
  }

  return (
    <>
      <Input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setPage(1)
        }}
        placeholder="Filter by name, email, or role…"
        aria-label="Filter team"
        className="mt-2 max-w-xs"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              aria-sort={
                sortKey === "name"
                  ? sortDir === 1
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() => toggleSort("name")}
                aria-label={`Sort by name, currently ${sortKey === "name" ? (sortDir === 1 ? "ascending" : "descending") : "unsorted"}`}
                className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
              >
                Name {sortIcon("name")}
              </button>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead
              aria-sort={
                sortKey === "role"
                  ? sortDir === 1
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() => toggleSort("role")}
                aria-label={`Sort by role, currently ${sortKey === "role" ? (sortDir === 1 ? "ascending" : "descending") : "unsorted"}`}
                className="inline-flex cursor-pointer items-center gap-1 hover:text-foreground"
              >
                Role {sortIcon("role")}
              </button>
            </TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((member) => (
            <TableRow key={member.email}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {member.email}
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell className="text-right">
                <Badge variant={statusVariant(member.status)}>
                  {member.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No team members match “{query}”.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="type-caption text-muted-foreground">
          Showing {rows.length} of {filtered.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={safePage === 1}
            onClick={() => setPage(safePage - 1)}
          >
            Previous
          </Button>
          <span className="type-caption text-muted-foreground">
            Page {safePage} of {pages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={safePage === pages}
            onClick={() => setPage(safePage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}

export { DataTableDemo }

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Search } from "lucide-react"

import { NAV_ITEMS } from "@/components/layout/nav-items"
import { SHOWCASE_SECTIONS } from "@/pages/showcase/section-registry"
import { cn } from "@/lib/utils"

interface SearchEntry {
  id: string
  label: string
  hint?: string
  path: string
}

interface HeaderSearchProps {
  activeId: string | null
  onNavigate: (path: string) => void
}

interface PanelRect {
  top: number
  left: number
  width: number
}

function HeaderSearch({ activeId, onNavigate }: HeaderSearchProps) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null)
  const inputWrapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const entries = useMemo<SearchEntry[]>(() => {
    const q = query.trim().toLowerCase()
    const matches = (value: string) => !q || value.toLowerCase().includes(q)
    const list: SearchEntry[] = []
    for (const item of NAV_ITEMS) {
      if (matches(item.label)) {
        list.push({ id: item.id, label: item.label, path: item.path })
      }
    }
    for (const section of SHOWCASE_SECTIONS) {
      if (matches(section.label) || matches(section.hint)) {
        list.push({
          id: section.id,
          label: section.label,
          hint: section.hint,
          path: `/showcase#${section.id}`,
        })
      }
    }
    return list
  }, [query])

  const safeCursor = entries.length === 0 ? 0 : Math.min(cursor, entries.length - 1)

  useEffect(() => {
    function handleSlash(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleSlash)
    return () => window.removeEventListener("keydown", handleSlash)
  }, [])

  useEffect(() => {
    if (!open) return
    function dismiss(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        (panelRef.current?.contains(event.target) || inputWrapRef.current?.contains(event.target))
      ) {
        return
      }
      setOpen(false)
    }
    function dismissOnScroll(event: Event) {
      if (event.target instanceof Node && panelRef.current?.contains(event.target)) {
        return
      }
      setOpen(false)
    }
    document.addEventListener("pointerdown", dismiss)
    document.addEventListener("scroll", dismissOnScroll, true)
    window.addEventListener("resize", dismissOnScroll)
    return () => {
      document.removeEventListener("pointerdown", dismiss)
      document.removeEventListener("scroll", dismissOnScroll, true)
      window.removeEventListener("resize", dismissOnScroll)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    document.getElementById(`search-result-${safeCursor}`)?.scrollIntoView({ block: "nearest" })
  }, [open, safeCursor])

  function measure(): PanelRect | null {
    const element = inputWrapRef.current
    if (!element) return null
    const rect = element.getBoundingClientRect()
    return { top: rect.bottom + 8, left: rect.left, width: rect.width }
  }

  function openPanel() {
    setPanelRect(measure())
    setOpen(true)
  }

  function select(index: number) {
    const entry = entries[index]
    if (!entry) return
    onNavigate(entry.path)
    setQuery("")
    setCursor(0)
    setOpen(false)
    inputRef.current?.blur()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      openPanel()
      setCursor(!open || entries.length === 0 ? 0 : (safeCursor + 1) % entries.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      openPanel()
      setCursor(!open || entries.length === 0 ? Math.max(entries.length - 1, 0) : (safeCursor - 1 + entries.length) % entries.length)
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (!open) {
        openPanel()
        return
      }
      select(safeCursor)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div ref={inputWrapRef} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setCursor(0)
            openPanel()
          }}
          onFocus={openPanel}
          onKeyDown={handleKeyDown}
          placeholder="Search pages and components…"
          aria-label="Search pages and components"
          role="combobox"
          aria-expanded={open}
          aria-controls="header-search-results"
          aria-autocomplete="list"
          aria-keyshortcuts="/"
          aria-activedescendant={open && entries.length > 0 ? `search-result-${safeCursor}` : undefined}
          className="h-10 w-full rounded-lg border border-border bg-card pr-12 pl-9 type-body shadow-xs outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
        />
        <kbd aria-hidden="true" className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 font-sans text-[11px] text-muted-foreground">
          /
        </kbd>
      </div>

      {open && panelRect && createPortal(
        <div
          ref={panelRef}
          id="header-search-results"
          role="listbox"
          aria-label="Search results"
          style={{ top: panelRect.top, left: panelRect.left, width: panelRect.width }}
          className="animate-pop fixed z-50 overflow-hidden rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-xl"
        >
          {entries.length === 0 && (
            <p className="px-3 py-5 text-center type-caption text-muted-foreground">No results for “{query}”.</p>
          )}
          <div className="max-h-72 overflow-y-auto">
            {entries.map((entry, index) => (
              <button
                key={entry.id}
                id={`search-result-${index}`}
                type="button"
                role="option"
                aria-selected={index === safeCursor}
                aria-current={entry.id === activeId ? "page" : undefined}
                onClick={() => select(index)}
                onMouseEnter={() => setCursor(index)}
                className={cn(
                  "flex min-h-10 w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left type-caption transition-colors",
                  index === safeCursor ? "bg-muted text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-current opacity-40" />
                </span>
                {entry.label}
                {entry.hint && <span className="ml-auto type-caption opacity-60">{entry.hint}</span>}
              </button>
            ))}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

export { HeaderSearch }

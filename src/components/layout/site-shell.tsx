import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { ExternalLink, Moon, Sun } from "lucide-react"
import { Link, useLocation, useNavigate, useNavigationType } from "react-router"

import { BrandMark } from "@/components/layout/brand-mark"
import { HeaderSearch } from "@/components/layout/header-search"
import { UserProfile } from "@/components/layout/user-profile"
import { NAV_ITEMS, getNavIdByPath } from "@/components/layout/nav-items"
import type { ThemeState } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SiteShellProps extends ThemeState {
  children: ReactNode
  contentLayout?: "fluid" | "boxed"
}

function isItemActive(itemId: string, activeId: string | null): boolean {
  return itemId === activeId
}

function getHashTargetId(hash: string): string {
  if (!hash) return ""
  try {
    return decodeURIComponent(hash.slice(1))
  } catch {
    return hash.slice(1)
  }
}

function SiteShell({ children, contentLayout = "fluid", theme, resolvedTheme, cycleTheme }: SiteShellProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const { pathname, hash, key } = location
  const activeId = getNavIdByPath(pathname)
  const mainRef = useRef<HTMLElement>(null)
  const scrollPositionsRef = useRef<Record<string, number>>({})
  const previousRouteRef = useRef<{ pathname: string; hash: string } | null>(null)

  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const savePosition = () => {
      scrollPositionsRef.current[key] = main.scrollTop
    }
    main.addEventListener("scroll", savePosition, { passive: true })
    return () => {
      savePosition()
      main.removeEventListener("scroll", savePosition)
    }
  }, [key])

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const previousRoute = previousRouteRef.current
    previousRouteRef.current = { pathname, hash }
    const routeChanged =
      previousRoute === null ||
      previousRoute.pathname !== pathname ||
      previousRoute.hash !== hash

    // Query-only replacements (for example, table filters) must not steal focus
    // or reset the user's reading position. POP still restores browser history.
    if (!routeChanged && navigationType !== "POP") return

    let observer: MutationObserver | null = null
    let frame = 0
    const reveal = () => {
      const targetId = getHashTargetId(hash)
      const target = targetId ? document.getElementById(targetId) : null
      if (target) {
        target.scrollIntoView({ block: "start" })
        observer?.disconnect()
        main.focus({ preventScroll: true })
        return true
      }
      if (hash) return false

      const savedPosition = navigationType === "POP" ? scrollPositionsRef.current[key] : undefined
      main.scrollTo({ top: savedPosition ?? 0 })
      main.focus({ preventScroll: true })
      return true
    }

    frame = requestAnimationFrame(() => {
      if (reveal() || !hash) return
      observer = new MutationObserver(reveal)
      observer.observe(main, { childList: true, subtree: true })
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [hash, key, navigationType, pathname])

  function selectAndReveal(path: string) {
    navigate(path)
  }

  const themeLabel = theme === "system" ? "system preference" : `${theme} mode`
  const nextThemeLabel = resolvedTheme === "dark" ? "light mode" : "dark mode"

  return (
    <div className="relative h-svh overflow-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed top-2 left-2 z-[60] rounded-md bg-primary px-3 py-2 type-caption font-medium text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <header className="absolute inset-x-0 top-0 z-20 border-b border-border/70 bg-background/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_32px_-16px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_-16px_rgba(0,0,0,0.6)]">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-5">
          <Link to="/" aria-label="Alvor home" className="flex shrink-0 items-center gap-2">
            <BrandMark className="size-7 rounded-[8px]" />
            <span className="hidden font-heading type-caption font-medium text-muted-foreground sm:inline">Alvor</span>
          </Link>
          <div className="flex min-w-0 flex-1 justify-center">
            <HeaderSearch activeId={activeId} onNavigate={selectAndReveal} />
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Theme is ${themeLabel}. Switch to ${nextThemeLabel}.`}
              title={`Theme: ${themeLabel}`}
              onClick={cycleTheme}
            >
              {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              render={<a href="/login" target="_blank" rel="noopener noreferrer" />}
            >
              Preview sign-in
              <ExternalLink data-icon="inline-end" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="sm:hidden"
              aria-label="Open sign-in preview in a new tab"
              render={<a href="/login" target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink />
            </Button>
            <UserProfile name="Ada Lovelace" email="ada@alvor.dev" initials="AL" />
          </div>
        </div>
      </header>

      <div className="flex h-full w-full">
        <aside className="relative hidden w-16 shrink-0 lg:block">
          <div className="group absolute inset-y-0 left-0 z-10 flex w-16 flex-col overflow-x-hidden overflow-y-auto border-r border-border/70 bg-sidebar/70 p-1.5 pt-16 backdrop-blur-xl backdrop-saturate-150 transition-[width,box-shadow] duration-150 ease-out motion-reduce:transition-none hover:w-60 hover:shadow-xl focus-within:w-60 focus-within:shadow-xl">
            <p className="max-w-0 overflow-hidden whitespace-nowrap px-2 pb-2 type-caption font-semibold uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition-[max-width,opacity] duration-150 motion-reduce:transition-none group-hover:max-w-40 group-hover:opacity-100 group-focus-within:max-w-40 group-focus-within:opacity-100">Workspace</p>
            <nav aria-label="Primary" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = isItemActive(item.id, activeId)
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 w-full items-center justify-center rounded-lg px-2 py-2 type-body transition-[gap,justify-content] duration-150 motion-reduce:transition-none group-hover:justify-start group-focus-within:justify-start group-hover:gap-3 group-focus-within:gap-3",
                      isActive
                        ? "bg-primary font-medium text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <item.icon className="size-5 shrink-0" aria-hidden="true" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-150 motion-reduce:transition-none group-hover:ml-1.5 group-hover:max-w-40 group-hover:opacity-100 group-focus-within:ml-1.5 group-focus-within:max-w-40 group-focus-within:opacity-100">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="mt-auto max-h-0 overflow-hidden rounded-xl border bg-background/50 p-0 opacity-0 transition-[max-height,opacity,padding] duration-150 motion-reduce:transition-none group-hover:max-h-40 group-hover:p-3 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:p-3 group-focus-within:opacity-100">
              <p className="type-caption font-medium">Building with Alvor?</p>
              <p className="mt-1 type-caption text-muted-foreground">Use Showcase as your component reference.</p>
              <Link to="/showcase" className="mt-3 inline-flex type-caption font-medium text-primary hover:underline">Open Showcase <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </aside>

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="animate-enter min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pt-[4.5rem] pb-28 outline-none sm:px-6 lg:pb-10"
        >
          <div className={cn("w-full", contentLayout === "boxed" && "mx-auto max-w-5xl")}>
            {children}
          </div>
        </main>
      </div>

      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/85 shadow-[0_-12px_32px_-16px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 dark:shadow-[0_-12px_32px_-16px_rgba(0,0,0,0.6)] lg:hidden">
        <div className="flex px-2 pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item.id, activeId)
            return (
              <Link
                key={item.id}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 type-caption transition-colors",
                  isActive
                    ? "bg-primary font-medium text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <item.icon className="size-5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export { SiteShell }

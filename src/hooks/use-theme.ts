import { useCallback, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = Exclude<Theme, "system">

interface ThemeState {
  theme: Theme
  resolvedTheme: ResolvedTheme
  cycleTheme: () => void
}

const STORAGE_KEY = "alvor-theme"
const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: "#F7F8FA",
  dark: "#121417",
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system"
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "light" || stored === "dark" || stored === "system") return stored
  } catch {
    // Private mode: use system preference without persistence.
  }
  return "system"
}

function getSystemTheme(): ResolvedTheme {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme
}

function applyTheme(theme: Theme) {
  const resolvedTheme = resolveTheme(theme)
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark")
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private mode: persist nothing, keep in-memory theme.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[resolvedTheme])
}

function useTheme(): ThemeState {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [systemTheme, theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const currentResolvedTheme = current === "system" ? systemTheme : current
      return currentResolvedTheme === "dark" ? "light" : "dark"
    })
  }, [systemTheme])

  return {
    theme,
    resolvedTheme: theme === "system" ? systemTheme : theme,
    cycleTheme,
  }
}

export { useTheme }
export type { Theme, ResolvedTheme, ThemeState }

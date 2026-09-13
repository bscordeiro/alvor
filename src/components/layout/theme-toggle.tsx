import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ThemeState } from "@/hooks/use-theme"

type ThemeToggleProps = Pick<ThemeState, "theme" | "resolvedTheme" | "cycleTheme">

function ThemeToggle({ theme, resolvedTheme, cycleTheme }: ThemeToggleProps) {
  const themeLabel = theme === "system" ? "system preference" : `${theme} mode`
  const nextThemeLabel = resolvedTheme === "dark" ? "light mode" : "dark mode"

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={`Theme is ${themeLabel}. Switch to ${nextThemeLabel}.`}
      title={`Theme: ${themeLabel}`}
      onClick={cycleTheme}
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}

export { ThemeToggle }
export type { ThemeToggleProps }

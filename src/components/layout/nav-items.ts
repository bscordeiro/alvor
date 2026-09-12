import { Component, House, LayoutDashboard } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  id: string
  label: string
  path: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: "landing", label: "Landing", path: "/", icon: House },
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { id: "showcase", label: "Showcase", path: "/showcase", icon: Component },
]

function getNavPath(id: string): string {
  return NAV_ITEMS.find((item) => item.id === id)?.path ?? "/"
}

function getNavIdByPath(pathname: string): string | null {
  return NAV_ITEMS.find((item) => item.path === pathname)?.id ?? null
}

export { NAV_ITEMS, getNavPath, getNavIdByPath }
export type { NavItem }

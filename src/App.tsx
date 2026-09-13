import { Component, Suspense, lazy, useEffect } from "react"
import type { ErrorInfo, ReactNode } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router"

import { SiteShell } from "@/components/layout/site-shell"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from "@/hooks/use-theme"
import type { ThemeState } from "@/hooks/use-theme"
import { useToastPosition } from "@/hooks/use-toast-position"
import { NotFoundPage } from "@/pages/not-found"

const Landing = lazy(() =>
  import("@/pages/landing").then((module) => ({ default: module.Landing })),
)
const Login = lazy(() =>
  import("@/pages/login").then((module) => ({ default: module.Login })),
)
const Dashboard = lazy(() =>
  import("@/pages/dashboard").then((module) => ({ default: module.Dashboard })),
)
const Showcase = lazy(() =>
  import("@/pages/showcase").then((module) => ({ default: module.Showcase })),
)

const TITLES: Record<string, string> = {
  "/": "Alvor",
  "/login": "Sign in · Alvor",
  "/dashboard": "Dashboard · Alvor",
  "/me": "Dashboard · Alvor",
  "/showcase": "Showcase · Alvor",
}

function RouteFallback() {
  return (
    <div role="status" aria-label="Loading page" className="mx-auto flex min-h-[60svh] w-full max-w-5xl flex-col justify-center gap-3 py-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}

interface RouteErrorBoundaryProps {
  children: ReactNode
}

interface RouteErrorBoundaryState {
  hasError: boolean
}

class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    // Keep route failures local and record only sanitized diagnostics for support.
    const message = error instanceof Error ? error.message : "Unknown route error"
    console.error("Alvor route render failed", {
      version: __APP_VERSION__,
      route: window.location.pathname,
      error: {
        name: error instanceof Error ? error.name : "Error",
        message: message.replace(/https?:\/\/\S+/gi, "[url]").slice(0, 240),
      },
    })
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12 text-foreground">
        <div role="alert" className="w-full max-w-md rounded-xl border bg-card p-6 text-center shadow-sm">
          <p className="type-caption font-semibold uppercase tracking-[0.12em] text-danger">Page unavailable</p>
          <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight">Something went wrong.</h1>
          <p className="mt-2 type-body text-muted-foreground">This page could not load. Reload it or return to Alvor without losing the rest of your session.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.location.reload()}>Reload page</Button>
            <Button variant="outline" render={<Link to="/" />}>Back to Alvor</Button>
          </div>
        </div>
      </div>
    )
  }
}

interface AppRoutesProps {
  themeState: ThemeState
}

function AppRoutes({ themeState }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Landing themeState={themeState} />} />
      <Route path="/login" element={<Login themeState={themeState} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/me" element={<Navigate to="/dashboard" replace />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function App() {
  const toastPosition = useToastPosition()
  const themeState = useTheme()
  const { pathname } = useLocation()
  const standalone = pathname === "/" || pathname === "/login"

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Not found · Alvor"
  }, [pathname])

  const routes = (
    <RouteErrorBoundary key={pathname}>
      <Suspense fallback={<RouteFallback />}>
        <AppRoutes themeState={themeState} />
      </Suspense>
    </RouteErrorBoundary>
  )

  return (
    <>
      {standalone ? routes : <SiteShell {...themeState}>{routes}</SiteShell>}
      <Toaster position={toastPosition} />
    </>
  )
}

export default App

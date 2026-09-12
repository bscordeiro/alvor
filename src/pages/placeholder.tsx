import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceholderPageProps {
  title: string
  description: string
  parentLabel?: string
  parentPath?: string
}

const LEGACY_SIBLINGS: Record<string, { id: string; label: string; path: string }[]> = {
  Explore: [
    { id: "discover", label: "Discover", path: "/explore/discover" },
    { id: "trending", label: "Trending", path: "/explore/trending" },
    { id: "saved", label: "Saved", path: "/explore/saved" },
  ],
  Activity: [
    { id: "updates", label: "Updates", path: "/activity/updates" },
    { id: "mentions", label: "Mentions", path: "/activity/mentions" },
  ],
  Settings: [
    { id: "general", label: "General", path: "/settings/general" },
    { id: "appearance", label: "Appearance", path: "/settings/appearance" },
    { id: "account", label: "Account", path: "/settings/account" },
  ],
}

function PlaceholderPage({ title, description, parentLabel, parentPath }: PlaceholderPageProps) {
  const siblings = LEGACY_SIBLINGS[title] ?? (parentLabel ? LEGACY_SIBLINGS[parentLabel] : undefined) ?? []

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 py-6 lg:py-8">
      <div>
        <p className="w-fit rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          {parentLabel ?? "Section"}
        </p>
        <h1 className="font-heading mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-xl type-body text-muted-foreground text-pretty">{description}</p>
        {parentPath && parentLabel && (
          <Button variant="ghost" size="sm" className="mt-4" render={<Link to={parentPath} />}>
            <ArrowLeft data-icon="inline-start" />
            Back to {parentLabel}
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Operational view</CardTitle>
          <CardDescription>
            Replace this placeholder with the real {title.toLowerCase()} surface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {siblings.length > 0 ? (
            <ul className="flex flex-col divide-y divide-border">
              {siblings.map((sibling) => (
                <li key={sibling.id}>
                  <Link
                    to={sibling.path}
                    className="flex items-center justify-between py-2.5 type-body font-medium hover:text-foreground"
                  >
                    {sibling.label}
                    <span className="type-caption font-normal text-muted-foreground">
                      {sibling.path}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-body text-muted-foreground">
              No child views registered for this section yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { PlaceholderPage }

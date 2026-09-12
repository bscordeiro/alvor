import { useEffect, useRef, useState } from "react"
import { Inbox, RotateCcw, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Section } from "@/pages/showcase/section"

type FeedStatus = "loaded" | "loading" | "error" | "empty"

const FEED_ROWS = [
  { title: "Design review scheduled", time: "2m ago" },
  { title: "Release v0.4 published", time: "1h ago" },
  { title: "Mara mentioned you", time: "3h ago" },
]

function AsyncStatesSection() {
  const [feed, setFeed] = useState<FeedStatus>("loaded")
  const feedTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (feedTimer.current !== null) {
        window.clearTimeout(feedTimer.current)
      }
    }
  }, [])

  function retryFeed() {
    if (feedTimer.current !== null) {
      window.clearTimeout(feedTimer.current)
    }
    setFeed("loading")
    feedTimer.current = window.setTimeout(() => setFeed("loaded"), 1200)
  }

  return (
    <Section
      index="13 · Async states"
      title="Async states"
      body="One panel, four realities. Drive it with the simulator — skeletons while loading, retry on error, and a designed empty state."
    >
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["loaded", "Loaded"],
            ["loading", "Loading"],
            ["error", "Error"],
            ["empty", "Empty"],
          ] as [FeedStatus, string][]
        ).map(([value, label]) => (
          <Button
            key={value}
            size="sm"
            variant={feed === value ? "default" : "outline"}
            aria-pressed={feed === value}
            onClick={() => setFeed(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div
        aria-live="polite"
        className="mt-4 min-h-56 rounded-lg border bg-background p-4"
      >
        {feed === "loaded" && (
          <div className="flex flex-col divide-y divide-border">
            {FEED_ROWS.map((row) => (
              <div
                key={row.title}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <span className="type-body font-medium">{row.title}</span>
                <span className="shrink-0 type-caption text-muted-foreground">
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        )}
        {feed === "loading" && (
          <div className="flex flex-col gap-4 py-1" aria-label="Loading feed">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3.5 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {feed === "error" && (
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Couldn&apos;t load the feed</AlertTitle>
            <AlertDescription>
              The connection dropped before anything arrived. Nothing was lost.
            </AlertDescription>
          </Alert>
        )}
        {feed === "empty" && (
          <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted">
              <Inbox className="size-5 text-muted-foreground" />
            </span>
            <p className="font-heading type-card-title font-semibold">All caught up</p>
            <p className="max-w-xs type-body text-muted-foreground">
              Nothing new right now. Past updates stay in the archive.
            </p>
          </div>
        )}
      </div>
      {(feed === "error" || feed === "empty") && (
        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={feed === "error" ? retryFeed : () => setFeed("loaded")}
          >
            <RotateCcw data-icon="inline-start" />
            {feed === "error" ? "Retry" : "View archive"}
          </Button>
        </div>
      )}
    </Section>
  )
}

export { AsyncStatesSection }

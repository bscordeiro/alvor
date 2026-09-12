import { ArrowDownRight, ArrowUpRight, CheckCircle2, FolderKanban, Gauge, ListTodo, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardMetric } from "@/data/dashboard"

interface MetricCardProps {
  metric: DashboardMetric
}

const METRIC_ICONS: Record<DashboardMetric["icon"], LucideIcon> = {
  projects: FolderKanban,
  completed: CheckCircle2,
  review: ListTodo,
  capacity: Gauge,
}

function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = metric.trend === "up" ? ArrowUpRight : metric.trend === "down" ? ArrowDownRight : Minus
  const MetricIcon = METRIC_ICONS[metric.icon]
  const trendLabel = metric.trend === "steady" ? "Steady" : metric.trend === "up" ? "Increasing" : "Decreasing"
  const badgeVariant = metric.trend === "down" ? "secondary" : metric.trend === "steady" ? "outline" : "default"

  return (
    <Card className="min-w-0">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardDescription>{metric.label}</CardDescription>
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground" aria-hidden="true">
            <MetricIcon className="size-4" />
          </span>
        </div>
        <CardTitle className="font-heading text-3xl font-semibold tracking-tight">{metric.value}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2">
        <Badge variant={badgeVariant} aria-label={`${metric.change}, ${trendLabel}`}>
          <TrendIcon aria-hidden="true" />
          {metric.change}
        </Badge>
        <span className="type-caption text-muted-foreground">{metric.detail}</span>
      </CardContent>
    </Card>
  )
}

export { MetricCard }

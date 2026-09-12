import { useId } from "react"

import type { ActivityPoint, WorkloadPoint } from "@/data/dashboard"
import { cn } from "@/lib/utils"

interface ActivityLineChartProps {
  data: readonly ActivityPoint[]
  title: string
}

interface WorkloadBarChartProps {
  data: readonly WorkloadPoint[]
  title: string
}

const CHART_WIDTH = 360
const CHART_HEIGHT = 160
const CHART_INSET = 16
const TONE_CLASSES: Record<WorkloadPoint["tone"], string> = {
  primary: "bg-primary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
}

function ActivityLineChart({ data, title }: ActivityLineChartProps) {
  const titleId = useId()
  const values = data.map((point) => point.value)
  const minimum = Math.min(...values)
  const maximum = Math.max(...values)
  const range = Math.max(maximum - minimum, 1)
  const points = data.map((point, index) => {
    const x = CHART_INSET + (index * (CHART_WIDTH - CHART_INSET * 2)) / Math.max(data.length - 1, 1)
    const y = CHART_HEIGHT - CHART_INSET - ((point.value - minimum) / range) * (CHART_HEIGHT - CHART_INSET * 2)
    return { ...point, x, y }
  })
  const path = points.map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ")

  return (
    <figure>
      <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-40 w-full overflow-visible text-primary" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{title}</title>
        <line x1={CHART_INSET} x2={CHART_WIDTH - CHART_INSET} y1={CHART_HEIGHT - CHART_INSET} y2={CHART_HEIGHT - CHART_INSET} className="stroke-border" strokeWidth="1" />
        <line x1={CHART_INSET} x2={CHART_INSET} y1={CHART_INSET} y2={CHART_HEIGHT - CHART_INSET} className="stroke-border" strokeWidth="1" />
        <path d={path} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="4" fill="currentColor" stroke="var(--card)" strokeWidth="2" />
        ))}
      </svg>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center type-caption text-muted-foreground">
        {data.map((point) => <span key={point.label}>{point.label}</span>)}
      </div>
      <figcaption className="sr-only">{data.map((point) => `${point.label}: ${point.value}`).join(", ")}</figcaption>
    </figure>
  )
}

function WorkloadBarChart({ data, title }: WorkloadBarChartProps) {
  const maximum = Math.max(...data.map((point) => point.value), 1)
  const summary = data.map((point) => `${point.label}: ${point.value}%`).join(", ")

  return (
    <figure>
      <div className="flex h-40 items-end gap-3 border-b border-l px-3 pb-0" role="img" aria-label={`${title}. ${summary}`}>
        {data.map((point) => (
          <div key={point.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
            <span className="type-caption text-muted-foreground">{point.value}%</span>
            <div className="flex min-h-0 w-full flex-1 items-end justify-center">
              <div
                className={cn("w-full max-w-12 rounded-t-md transition-[height] duration-300 motion-reduce:transition-none", TONE_CLASSES[point.tone])}
                style={{ height: `${Math.max((point.value / maximum) * 100, 8)}%` }}
                title={`${point.label}: ${point.value}%`}
              />
            </div>
            <span className="type-caption text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 type-caption text-muted-foreground">Share of current team capacity by work type.</figcaption>
    </figure>
  )
}

export { ActivityLineChart, WorkloadBarChart }

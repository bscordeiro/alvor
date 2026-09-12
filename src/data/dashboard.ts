type DashboardMetricIcon = "projects" | "completed" | "review" | "capacity"

interface DashboardMetric {
  label: string
  icon: DashboardMetricIcon
  value: string
  change: string
  detail: string
  trend: "up" | "down" | "steady"
}

interface ActivityPoint {
  label: string
  value: number
}

interface WorkloadPoint {
  label: string
  value: number
  tone: "primary" | "info" | "success" | "warning"
}

const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    label: "Active projects",
    icon: "projects",
    value: "24",
    change: "+12.5%",
    detail: "vs last month",
    trend: "up",
  },
  {
    label: "Completed work",
    icon: "completed",
    value: "186",
    change: "+8.2%",
    detail: "vs last month",
    trend: "up",
  },
  {
    label: "Review queue",
    icon: "review",
    value: "12",
    change: "-4.6%",
    detail: "vs last month",
    trend: "down",
  },
  {
    label: "Team capacity",
    icon: "capacity",
    value: "78%",
    change: "On track",
    detail: "this week",
    trend: "steady",
  },
]

const ACTIVITY_DATA: ActivityPoint[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 74 },
  { label: "Fri", value: 66 },
  { label: "Sat", value: 38 },
  { label: "Sun", value: 47 },
]

const WORKLOAD_DATA: WorkloadPoint[] = [
  { label: "Design", value: 42, tone: "primary" },
  { label: "Build", value: 31, tone: "info" },
  { label: "Review", value: 18, tone: "success" },
  { label: "Planning", value: 9, tone: "warning" },
]

export type { ActivityPoint, DashboardMetric, DashboardMetricIcon, WorkloadPoint }
export { ACTIVITY_DATA, DASHBOARD_METRICS, WORKLOAD_DATA }

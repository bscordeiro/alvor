import { ArrowRight, Info, LayoutGrid, TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section } from "@/pages/showcase/section"

function ButtonsSection() {
  return (
    <Section
      index="01 · Buttons"
      title="Buttons"
      body="Six variants, five sizes, icon slots, and disabled states. Active intent reads at a glance."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">
          Large
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button variant="outline">
          <LayoutGrid data-icon="inline-start" />
          With icon
        </Button>
        <Button disabled>Disabled</Button>
      </div>
    </Section>
  )
}

function TypographySection() {
  return (
    <Section
      index="02 · Typography"
      title="Typography"
      body="System-native stack with a tight display cut, relaxed body copy, and quiet metadata."
    >
      <div className="flex flex-col gap-4">
        <p className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Display speaks first
        </p>
        <h3 className="font-heading text-2xl font-semibold tracking-tight">
          Section titles carry structure
        </h3>
        <p className="type-body text-muted-foreground">
          Lead paragraphs open the story — larger, lighter, and limited to a
          couple of lines.
        </p>
        <p className="max-w-2xl leading-relaxed">
          Body copy does everyday work at 16px with relaxed line height.
          It stays readable across viewports, densities, and both color schemes
          without any per-page tuning.
        </p>
        <blockquote className="border-l-2 border-primary pl-4 text-muted-foreground italic">
          “Good defaults beat endless options.”
        </blockquote>
        <p className="type-caption text-muted-foreground">
          Caption — 14px metadata, timestamps, and helper text.
        </p>
      </div>
    </Section>
  )
}

const INVENTORY = [
  { component: "Button", location: "components/ui", status: "Stable" },
  { component: "SiteShell", location: "components/layout", status: "Stable" },
  { component: "HeaderSearch", location: "components/layout", status: "New" },
  { component: "useTheme", location: "hooks", status: "Stable" },
  { component: "Dialog", location: "components/ui", status: "New" },
]

function InventoryTableSection() {
  return (
    <Section
      index="03 · Tables"
      title="Tables"
      body="Dense data with calm rows. Status reads through badges, not decoration."
    >
      <Table>
        <TableCaption>Core building blocks shipped with the template.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVENTORY.map((row) => (
            <TableRow key={row.component}>
              <TableCell className="font-medium">{row.component}</TableCell>
              <TableCell className="text-muted-foreground">{row.location}</TableCell>
              <TableCell className="text-right">
                <Badge variant={row.status === "New" ? "secondary" : "default"}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  )
}

function IndicatorsSection() {
  return (
    <Section
      index="06 · Indicators"
      title="Indicators"
      body="Alerts, badges, progress, and skeletons — every async or attention state, covered."
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-3">
          <Alert>
            <Info />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              The template builds clean. Preview it with{" "}
              <span className="font-medium text-foreground">npm run preview</span>.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlert />
            <AlertTitle>Action needed</AlertTitle>
            <AlertDescription>
              Destructive alerts pair a strong icon with calm body copy.
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </div>
        <div className="flex flex-col gap-3">
          <Progress value={25} aria-label="Upload progress: 25 percent" />
          <Progress value={60} aria-label="Upload progress: 60 percent" />
          <Progress value={90} aria-label="Upload progress: 90 percent" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
        </div>
      </div>
    </Section>
  )
}

function CardsSection() {
  return (
    <Section
      index="07 · Cards"
      title="Cards"
      body="Content containers for features, metrics, and loading states."
    >
      <div className="grid items-start gap-4 pb-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Starter card</CardTitle>
            <CardDescription>Header, body, and footer in one tidy unit.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="type-body text-muted-foreground">
              Drop any content here — text, media, or controls.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Take action</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly signups</CardTitle>
            <CardDescription>Compared to last week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-4xl font-semibold tracking-tight">1,248</p>
          </CardContent>
          <CardFooter>
            <Badge>+12.4%</Badge>
          </CardFooter>
        </Card>
        <Card aria-busy="true" aria-label="Loading card">
          <CardHeader>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-8 w-24" />
          </CardFooter>
        </Card>
      </div>
    </Section>
  )
}

const ROLE_SWATCHES = [
  ["Primary", "bg-primary text-primary-foreground", "#334155"],
  ["Secondary", "bg-secondary text-secondary-foreground", "#E7EAEE"],
  ["Success", "bg-success text-success-foreground", "#16803C"],
  ["Info", "bg-info text-info-foreground", "#0369A1"],
  ["Warning", "bg-warning text-warning-foreground", "#C2410C"],
  ["Danger", "bg-danger text-danger-foreground", "#C81E1E"],
  ["Light", "bg-light text-light-foreground", "#EDF0F3"],
  ["Dark", "bg-dark text-dark-foreground", "#333B45"],
] as const

function SemanticRolesSection() {
  return (
    <Section
      index="09 · Semantic roles"
      title="Semantic roles"
      body="The eight Bootstrap-vocabulary roles as first-class utilities — bg-role with its paired foreground. Hex values shown for the light scheme; dark adapts."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ROLE_SWATCHES.map(([label, classes, hex]) => (
          <div key={label} className="overflow-hidden rounded-xl border bg-card shadow-xs">
            <div className={`flex h-20 items-center justify-center text-2xl font-bold ${classes}`}>
              Aa
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <span className="type-body font-medium">{label}</span>
              <code className="font-mono text-xs text-muted-foreground">{hex}</code>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ListGroupsSection() {
  return (
    <Section
      index="12 · List groups"
      title="List groups"
      body="Stacked rows with counts, statuses, and rich previews."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="gap-0 py-0">
          {["Cras justo odio", "Dapibus ac facilisis in", "Morbi leo risus"].map(
            (label, index) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-2.5 type-body not-last:border-b"
              >
                <span>{label}</span>
                <Badge>{[14, 2, 1][index]}</Badge>
              </div>
            ),
          )}
        </Card>
        <Card className="gap-0 py-0">
          <div className="bg-primary px-4 py-2.5 type-body font-medium text-primary-foreground">
            Active notification
          </div>
          {["All systems go", "Deploy at noon", "Build failing"].map((label) => (
            <div
              key={label}
              className="px-4 py-2.5 type-body text-muted-foreground not-last:border-b"
            >
              {label}
            </div>
          ))}
        </Card>
      </div>
    </Section>
  )
}

export {
  ButtonsSection,
  TypographySection,
  InventoryTableSection,
  IndicatorsSection,
  CardsSection,
  SemanticRolesSection,
  ListGroupsSection,
}

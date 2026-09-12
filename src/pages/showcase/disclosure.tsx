import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Section } from "@/pages/showcase/section"

const PANES = [
  {
    value: "overview",
    label: "Overview",
    body: "Every primitive the template ships, exercised live. Copy a section straight into your next project — no cleanup pass needed.",
  },
  {
    value: "tokens",
    label: "Tokens",
    body: "Colors, type, radii, and spacing flow from DESIGN.md into Tailwind. Change a token, restyle the template.",
  },
  {
    value: "shell",
    label: "Shell",
    body: "Side rail on desktop, bottom tabs on mobile, frosted header with search, theme toggle, and submenus everywhere.",
  },
]

function TabsAccordionSection() {
  return (
    <Section
      index="05 · Tabs & Accordion"
      title="Tabs & Accordion"
      body="Disclosure primitives for dense content — animated, keyboard-navigable, and theme-aware."
    >
      <Tabs defaultValue="overview">
        <TabsList>
          {PANES.map((pane) => (
            <TabsTrigger key={pane.value} value={pane.value}>
              {pane.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {PANES.map((pane) => (
          <TabsContent key={pane.value} value={pane.value}>
            <p className="max-w-2xl py-2 text-muted-foreground">{pane.body}</p>
          </TabsContent>
        ))}
      </Tabs>
      <Accordion
        defaultValue={["item-1"]}
        className="mt-6 rounded-lg border px-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What ships with the template?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Adaptive shell, submenus, search, theme toggle, PWA setup, design
              tokens, and this gallery. Delete what you don&apos;t need.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I add a page?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Add a route, register its nav item, and render inside the shell.
              Content width follows the fluid or boxed mode.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Where do tokens live?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Colors, type, radii, and spacing in DESIGN.md, validated by lint
              and exported to CSS on demand.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  )
}

function DialogSection() {
  return (
    <Section
      index="08 · Dialog"
      title="Dialog"
      body="Modal overlays with backdrop blur, focus management, and footer actions."
    >
      <Dialog>
        <DialogTrigger render={<Button>Launch dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Template dialog</DialogTitle>
            <DialogDescription>
              Backdrop click or Escape dismisses it. Focus stays trapped while
              open.
            </DialogDescription>
          </DialogHeader>
          <p className="type-body text-muted-foreground">
            Use dialogs for confirmations, short forms, and anything that
            deserves full attention.
          </p>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <DialogClose render={<Button>Confirm</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Section>
  )
}

function OverlaysSection() {
  return (
    <Section
      index="11 · Overlays"
      title="Overlays"
      body="Floating layers with backdrop blur and focus management — popovers, tooltips, and side panels."
    >
      <div className="flex flex-wrap items-center gap-3">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent>
            <p className="type-body font-medium">Pinned note</p>
            <p className="mt-1 type-caption text-muted-foreground">
              Popovers float above content for quick actions and previews.
            </p>
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
            <TooltipContent>
              <p>Helpful hint, right on cue.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Open panel</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Side panel</SheetTitle>
              <SheetDescription>
                Slides in from the edge for details, filters, and forms.
              </SheetDescription>
            </SheetHeader>
            <p className="px-4 type-body text-muted-foreground">
              Sheet content lives here — navigation, settings, or anything that
              shouldn&apos;t take over the screen.
            </p>
            <SheetFooter>
              <SheetClose render={<Button>Done</Button>} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Section>
  )
}

export { TabsAccordionSection, DialogSection, OverlaysSection }

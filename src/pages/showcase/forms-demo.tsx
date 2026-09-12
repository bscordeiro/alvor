import { useState } from "react"
import { Check, TriangleAlert } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "@/pages/showcase/section"

function FormsSection() {
  const [updates, setUpdates] = useState(true)

  return (
    <Section
      index="04 · Forms"
      title="Forms"
      body="Labeled fields in small and default heights, valid and invalid states with messaging, radios, checkboxes, and switches."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="showcase-name">Project name</Label>
            <Input id="showcase-name" placeholder="Acme website" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="showcase-locked">Locked field</Label>
            <Input id="showcase-locked" value="Read-only value" disabled readOnly />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="type-body font-medium">Product updates</p>
              <p className="type-caption text-muted-foreground">
                One email per release, never more.
              </p>
            </div>
            <Switch
              checked={updates}
              onCheckedChange={setUpdates}
              aria-label="Product updates"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="type-body font-medium">Marketing emails</p>
              <p className="type-caption text-muted-foreground">
                Off by default, always optional.
              </p>
            </div>
            <Switch aria-label="Marketing emails" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="showcase-stack">Stack</Label>
          <Select defaultValue="react">
            <SelectTrigger id="showcase-stack" className="w-full">
              <SelectValue placeholder="Select a stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React + Vite</SelectItem>
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="showcase-notes">Project notes</Label>
          <Textarea id="showcase-notes" placeholder="Goals, constraints, references…" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="type-body font-medium">Billing</span>
          <RadioGroup defaultValue="monthly" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="monthly" id="billing-monthly" />
              <Label htmlFor="billing-monthly">Monthly</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="yearly" id="billing-yearly" />
              <Label htmlFor="billing-yearly">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="showcase-terms" defaultChecked />
          <Label htmlFor="showcase-terms">I agree to the terms of the template</Label>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="showcase-plan">Plan — compact</Label>
          <Select defaultValue="pro">
            <SelectTrigger id="showcase-plan" size="sm" className="w-full">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="showcase-email-valid">Email — valid</Label>
            <Input
              id="showcase-email-valid"
              defaultValue="ada@alvor.dev"
              aria-describedby="showcase-email-valid-hint"
              className="border-success focus-visible:border-success focus-visible:ring-success/20"
            />
            <p
              id="showcase-email-valid-hint"
              className="flex items-center gap-1.5 type-caption text-success"
            >
              <Check className="size-3.5" />
              Looks good.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="showcase-username-invalid">Username — invalid</Label>
            <Input
              id="showcase-username-invalid"
              defaultValue="admin"
              aria-invalid
              aria-describedby="showcase-username-invalid-hint"
            />
            <p
              id="showcase-username-invalid-hint"
              className="flex items-center gap-1.5 type-caption text-destructive"
            >
              <TriangleAlert className="size-3.5" />
              That username is taken.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export { FormsSection }

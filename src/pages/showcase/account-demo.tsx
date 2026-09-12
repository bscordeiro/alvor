import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useStatusFlash } from "@/hooks/use-status-flash"
import { Section } from "@/pages/showcase/section"

function AccountSection() {
  const signinFlash = useStatusFlash()

  return (
    <Section
      index="15 · Account"
      title="Account"
      body="Account access starts here: a sign-in card that reports a truthful local preview."
    >
      <div className="max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Preview sign-in</CardTitle>
            <CardDescription>Visual demo only — nothing leaves the browser.</CardDescription>
          </CardHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              signinFlash.flash("info")
              toast.info("Preview only", {
                description: "No account was created and no credentials were sent.",
              })
            }}
          >
            <CardContent className="flex flex-col gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="showcase-signin-email">Email</Label>
                <Input
                  id="showcase-signin-email"
                  type="email"
                  required
                  placeholder="ada@alvor.dev"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="showcase-signin-password">Password</Label>
                <Input
                  id="showcase-signin-password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" status={signinFlash.status}>
                Preview sign-in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Section>
  )
}

export { AccountSection }

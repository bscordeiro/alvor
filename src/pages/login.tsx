import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router"

import { BrandMark } from "@/components/layout/brand-mark"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import type { ThemeState } from "@/hooks/use-theme"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginProps {
  themeState: ThemeState
}

function Login({ themeState }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link to="/" aria-label="Back to Alvor home" className="flex items-center gap-2.5">
          <BrandMark className="size-8 rounded-[8px]" />
          <span className="font-heading text-base font-semibold tracking-tight">Alvor</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle {...themeState} />
        </div>
      </header>
      <main id="main-content" className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl shadow-primary/5">
            <CardHeader className="space-y-3">
              <BadgeMark />
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Preview a sign-in flow for your product.</CardDescription>
            </CardHeader>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
              autoComplete="off"
            >
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" name="email" type="email" autoComplete="email" placeholder="ada@alvor.dev" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="pr-11"
                      required
                    />
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      className="absolute top-1/2 right-1 -translate-y-1/2"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((visible) => !visible)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Preview sign-in</Button>
                <Alert variant="default" className="bg-muted/50">
                  <AlertTitle>Visual example</AlertTitle>
                  <AlertDescription>
                    This form is for preview only. Alvor does not send, authenticate, or store these values.
                  </AlertDescription>
                </Alert>
                <p aria-live="polite" className="min-h-5 type-caption text-center text-muted-foreground">
                  {submitted ? "Preview complete — no sign-in was performed." : ""}
                </p>
              </CardContent>
            </form>
          </Card>
          <Link to="/" className="mx-auto mt-6 flex w-fit items-center gap-1.5 type-caption text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Alvor
          </Link>
        </div>
      </main>
    </div>
  )
}

function BadgeMark() {
  return (
    <p className="w-fit rounded-full border bg-card px-3 py-1 type-caption font-medium text-muted-foreground">
      Secure-looking, intentionally not connected
    </p>
  )
}

export { Login }

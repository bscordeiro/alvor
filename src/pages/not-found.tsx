import { ArrowLeft, Home, Search } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60svh] w-full max-w-5xl items-center justify-center py-8">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center">
          <p className="w-fit rounded-full border bg-card px-3 py-1 type-caption font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight">Page not found</h1>
          <CardDescription className="max-w-sm">
            This view does not exist. Return to a known destination and keep exploring.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-3">
          <Button render={<Link to="/dashboard" />}>
            <Home data-icon="inline-start" />
            Go to dashboard
          </Button>
          <Button variant="outline" render={<Link to="/showcase" />}>
            <Search data-icon="inline-start" />
            Open showcase
          </Button>
          <Button variant="ghost" render={<Link to="/" />}>
            <ArrowLeft data-icon="inline-start" />
            Back to Alvor
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export { NotFoundPage }

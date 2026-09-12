import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useStatusFlash } from "@/hooks/use-status-flash"
import { Section } from "@/pages/showcase/section"

function ToastsSection() {
  const [saving, setSaving] = useState(false)
  const promiseFlash = useStatusFlash()
  const successFlash = useStatusFlash()
  const errorFlash = useStatusFlash()
  const infoFlash = useStatusFlash()

  function saveDemo() {
    if (saving) return
    setSaving(true)
    const task = new Promise<void>((resolve) =>
      window.setTimeout(resolve, 1500),
    )
    task.then(() => promiseFlash.flash("success"))
    toast.promise(task.finally(() => setSaving(false)), {
      loading: "Saving changes…",
      success: "Changes saved",
      error: "Could not save",
    })
  }

  return (
    <Section
      index="16 · Toasts"
      title="Toasts"
      body="Stacked, auto-dismissing notifications with theme-aware styling."
    >
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          status={successFlash.status}
          onClick={() => {
            successFlash.flash("success")
            toast.success("Saved", {
              description: "Your changes are live.",
            })
          }}
        >
          Success
        </Button>
        <Button
          variant="outline"
          status={errorFlash.status}
          onClick={() => {
            errorFlash.flash("error")
            toast.error("Failed", {
              description: "The server refused the request.",
            })
          }}
        >
          Error
        </Button>
        <Button
          variant="outline"
          status={infoFlash.status}
          onClick={() => {
            infoFlash.flash("info")
            toast.info("Heads up", {
              description: "A new version is available.",
            })
          }}
        >
          Info
        </Button>
        <Button
          variant="outline"
          loading={saving}
          status={promiseFlash.status}
          onClick={saveDemo}
        >
          Promise
        </Button>
      </div>
    </Section>
  )
}

export { ToastsSection }

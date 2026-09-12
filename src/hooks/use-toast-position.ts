import { useEffect, useState } from "react"

type ToastPosition = "top-right" | "top-center"

function getToastPosition(): ToastPosition {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1023.98px)").matches
  ) {
    return "top-center"
  }
  return "top-right"
}

function useToastPosition() {
  const [position, setPosition] = useState<ToastPosition>(getToastPosition)

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023.98px)")
    const update = () =>
      setPosition(query.matches ? "top-center" : "top-right")
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return position
}

export { useToastPosition }
export type { ToastPosition }

import { useCallback, useEffect, useRef, useState } from "react"

import type { ButtonStatus } from "@/components/ui/button"

const HOLD_MS = 2400

function useStatusFlash(holdMs: number = HOLD_MS) {
  const [status, setStatus] = useState<ButtonStatus | null>(null)
  const timer = useRef<number | null>(null)
  const seq = useRef(0)

  const flash = useCallback(
    (next: ButtonStatus) => {
      const id = seq.current + 1
      seq.current = id
      if (timer.current !== null) {
        window.clearTimeout(timer.current)
      }
      setStatus(next)
      timer.current = window.setTimeout(() => {
        if (seq.current === id) {
          setStatus(null)
        }
      }, holdMs)
    },
    [holdMs],
  )

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current)
      }
    }
  }, [])

  return { status, flash }
}

export { useStatusFlash }
export type { ButtonStatus as FlashStatus }

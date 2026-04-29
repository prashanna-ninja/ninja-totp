"use client"

import { useEffect } from "react"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="theme-page min-h-dvh flex flex-col items-center justify-center px-8 text-center">
      <div className="space-y-8 max-w-sm">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="size-5 text-brand-surface" strokeWidth={2.5} />
          <span className="h4 text-brand-surface">Ninja TOTP</span>
        </div>

        <p className="label text-muted-foreground">500 · SOMETHING WENT WRONG</p>

        <div className="space-y-3">
          <h1 className="h1">Unexpected error.</h1>
          <p className="p2 text-muted-foreground">
            An error occurred while loading this page. Try again or contact support if it persists.
          </p>
          {error.digest && (
            <p className="p3 text-muted-foreground/60 font-mono">
              Ref: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={reset} variant="primary" className="w-full h-10 rounded-lg p2">
            Try again
          </Button>
          <Button asChild variant="outline" className="w-full h-10 rounded-lg p2">
            <Link href="/">Back to sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

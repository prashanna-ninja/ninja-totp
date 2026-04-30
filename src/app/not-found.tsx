import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NinjaLogo } from "@/components/custom-ui/custom-logo/ninja-logo"

export default function NotFound() {
  return (
    <div className="theme-page min-h-dvh flex flex-col items-center justify-center px-8 text-center">
      <div className="space-y-8 max-w-sm">
        <div className="flex items-center justify-center">
          <NinjaLogo />
        </div>

        <p className="label text-muted-foreground">404 · PAGE NOT FOUND</p>

        <div className="space-y-3">
          <h1 className="h1">Nothing here.</h1>
          <p className="p2 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Button asChild variant="primary" className="w-full h-10 rounded-lg p2">
          <Link href="/">Back to sign in</Link>
        </Button>
      </div>
    </div>
  )
}

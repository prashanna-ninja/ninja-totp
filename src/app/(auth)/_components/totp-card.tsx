import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card"

interface TotpCardProps {
  vault: string
  code: string
  secondsLeft?: number
  variant?: "dark" | "light"
  className?: string
}

export function TotpCard({
  vault,
  code,
  secondsLeft = 24,
  variant = "light",
  className,
}: TotpCardProps) {
  const progress = (secondsLeft / 30) * 100

  return (
    <Card
      className={cn(
        "w-52 shadow-lg select-none gap-2 py-3",
        variant === "dark" && "bg-brand-surface text-brand-foreground ring-brand-surface",
        className,
      )}
    >
      <CardHeader className="px-4 py-0">
        <CardTitle
          className={cn(
            "label",
            variant === "dark" ? "text-brand-foreground/60" : "text-muted-foreground",
          )}
        >
          {vault}
        </CardTitle>
        <CardAction
          className={cn(
            "label",
            variant === "dark" ? "text-brand-foreground/40" : "text-muted-foreground/60",
          )}
        >
          {secondsLeft}s
        </CardAction>
      </CardHeader>

      <CardContent className="px-4">
        <p
          className={cn(
            "h2 tabular-nums tracking-widest",
            variant === "dark" ? "text-brand-foreground" : "text-foreground",
          )}
        >
          {code}
        </p>

        <div
          className={cn(
            "mt-3 h-0.5 w-full rounded-full overflow-hidden",
            variant === "dark" ? "bg-brand-foreground/10" : "bg-border",
          )}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all",
              variant === "dark" ? "bg-brand-muted/60" : "bg-brand",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

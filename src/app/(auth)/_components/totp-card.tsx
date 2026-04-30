import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TotpCardProps {
  vault: string
  code: string
  variant?: "dark" | "light"
  className?: string
}

export function TotpCard({ vault, code, variant = "light", className }: TotpCardProps) {
  return (
    <Card
      className={cn(
        "w-52 select-none gap-1 py-4 shadow-lg rounded-2xl",
        variant === "dark"
          ? "bg-brand text-white ring-0 border-0"
          : "bg-white text-foreground ring-1 ring-black/5 border-0",
        className,
      )}
    >
      <CardHeader className="px-5 py-0">
        <CardTitle className={cn(
          "text-[10px] font-semibold tracking-widest uppercase",
          variant === "dark" ? "text-white/60" : "text-muted-foreground",
        )}>
          {vault}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5">
        <p className={cn(
          "text-3xl font-bold tabular-nums tracking-widest",
          variant === "dark" ? "text-white" : "text-foreground",
        )}>
          {code}
        </p>
      </CardContent>
    </Card>
  )
}

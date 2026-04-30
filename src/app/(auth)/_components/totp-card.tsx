import { cn } from "@/lib/utils"

interface TotpCardProps {
  vault: string
  code: string
  variant?: "dark" | "light"
  className?: string
}

export function TotpCard({ vault, code, variant = "light", className }: TotpCardProps) {
  return (
    <div
      className={cn(
        "w-52 rounded-2xl px-5 py-4 select-none shadow-lg",
        variant === "dark"
          ? "bg-brand text-white"
          : "bg-white text-foreground ring-1 ring-black/5",
        className,
      )}
    >
      <p className={cn(
        "text-[10px] font-semibold tracking-widest uppercase mb-3",
        variant === "dark" ? "text-white/60" : "text-muted-foreground",
      )}>
        {vault}
      </p>
      <p className={cn(
        "text-3xl font-bold tabular-nums tracking-widest",
        variant === "dark" ? "text-white" : "text-foreground",
      )}>
        {code}
      </p>
    </div>
  )
}

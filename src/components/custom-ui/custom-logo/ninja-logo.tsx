import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface NinjaLogoProps {
  variant?: "auth" | "sidebar";
  collapsed?: boolean;
  className?: string;
}

export function NinjaLogo({ variant = "auth", collapsed = false, className }: NinjaLogoProps) {
  if (variant === "sidebar") {
    return (
      <div className={cn("flex items-center gap-2.5 overflow-hidden", !collapsed && "ml-2", className)}>
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-brand-foreground shrink-0">
          <ShieldCheck size={16} />
        </span>
        <p className={cn("text-[20px] tracking-tight whitespace-nowrap transition-opacity duration-300", collapsed && "opacity-0")}>
          <span className="font-semibold text-sidebar-foreground">Ninja</span>{" "}
          <span className="text-brand">TOTP</span>
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ShieldCheck className="size-5 text-brand-surface" strokeWidth={2.5} />
      <span className="h4 text-brand-surface">Ninja TOTP</span>
    </div>
  );
}

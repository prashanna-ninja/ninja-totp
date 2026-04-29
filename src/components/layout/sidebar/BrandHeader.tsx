"use client";

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandHeaderProps {
  collapsed?: boolean;
}

export default function BrandHeader({ collapsed = false }: BrandHeaderProps) {
  return (
    <div
      className={`flex items-center gap-2.5 overflow-hidden ${!collapsed && "ml-2"}`}
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-brand-foreground shrink-0">
        <ShieldCheck size={16} />
      </span>
      <p
        className={cn(
          "text-[20px] tracking-tight whitespace-nowrap transition-opacity duration-300",
          collapsed && "opacity-0",
        )}
      >
        <span className="font-semibold text-sidebar-foreground">Ninja</span>{" "}
        <span className="text-brand">TOTP</span>
      </p>
    </div>
  );
}

"use client";

import { ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrgSwitcherProps {
  collapsed?: boolean;
}

const currentOrg = {
  name: "Acme Corp",
  plan: "2FA Manager · Pro",
};

export default function OrgSwitcher({ collapsed = false }: OrgSwitcherProps) {
  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(
        "w-full h-auto justify-start gap-2.5 rounded-lg overflow-hidden transition-all duration-300",
        collapsed
          ? "border-transparent px-0 py-0 hover:bg-transparent"
          : "border border-sidebar-border bg-sidebar px-2 py-2 hover:bg-sidebar-accent",
      )}
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-brand text-brand-foreground shrink-0">
        <Lock className="size-3.5" />
      </span>
      <div
        className={cn(
          "flex-1 min-w-0 text-left transition-opacity duration-300",
          collapsed && "opacity-0",
        )}
      >
        <p className="text-sm font-semibold text-sidebar-foreground truncate leading-tight">
          {currentOrg.name}
        </p>
        <p className="text-[10px] text-sidebar-foreground/50 leading-tight mt-0.5 truncate">
          {currentOrg.plan}
        </p>
      </div>
      <ChevronDown
        className={cn(
          "size-4 text-sidebar-foreground/40 shrink-0 transition-opacity duration-300",
          collapsed && "opacity-0",
        )}
      />
    </Button>
  );
}

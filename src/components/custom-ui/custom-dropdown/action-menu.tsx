"use client";

import { type LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ActionMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      icon?: LucideIcon;
      onClick?: () => void;
      variant?: "default" | "destructive";
    };

interface ActionMenuProps {
  trigger: React.ReactNode;
  items: ActionMenuItem[];
  label?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export function ActionMenu({
  trigger,
  items,
  label,
  side = "top",
  align = "end",
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-24">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {items.map((item, i) =>
          item.separator ? (
            <DropdownMenuSeparator key={i} />
          ) : (
            <DropdownMenuItem
              key={i}
              variant={item.variant}
              onClick={item.onClick}
            >
              {item.icon && <item.icon />}
              {item.label}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

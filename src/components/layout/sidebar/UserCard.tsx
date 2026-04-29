"use client";

import { MoreHorizontal } from "lucide-react";

interface UserCardProps {
  collapsed?: boolean;
}

const currentUser = {
  name: "Mira Tanaka",
  role: "Admin",
  initials: "MT",
};

export default function UserCard({ collapsed }: UserCardProps) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-center p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand text-brand-foreground text-[11px] font-semibold">
          {currentUser.initials}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 p-3 border-t border-sidebar-border">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand text-brand-foreground text-[11px] font-semibold shrink-0">
        {currentUser.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-sidebar-foreground truncate leading-tight">
          {currentUser.name}
        </p>
        <p className="text-[11px] text-sidebar-foreground/50 leading-tight mt-0.5">
          {currentUser.role}
        </p>
      </div>
      <button
        type="button"
        className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

"use client";

import { MoreHorizontal, Settings, LogOut } from "lucide-react";
import { ActionMenu, type ActionMenuItem } from "@/components/custom-ui/custom-dropdown/action-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface UserCardProps {
  collapsed?: boolean;
}

const currentUser = {
  name: "Mira Tanaka",
  role: "Admin",
  initials: "MT",
};

export default function UserCard({ collapsed }: UserCardProps) {
  const router = useRouter();

  const menuItems: ActionMenuItem[] = [
    { label: "Settings", icon: Settings, onClick: () => router.push("/settings") },
    { separator: true },
    {
      label: "Sign out",
      icon: LogOut,
      variant: "destructive" as const,
      onClick: () => authClient.signOut({ fetchOptions: { onSuccess: () => router.push("/") } }),
    },
  ];

  const avatar = (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand text-brand-foreground text-[11px] font-semibold shrink-0">
      {currentUser.initials}
    </div>
  );

  if (collapsed) {
    return (
      <div className="flex items-center justify-center p-3 border-t border-sidebar-border">
        <ActionMenu trigger={avatar} items={menuItems} side="right" align="end" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 p-3 border-t border-sidebar-border">
      {avatar}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-sidebar-foreground truncate leading-tight">
          {currentUser.name}
        </p>
        <p className="text-[11px] text-sidebar-foreground/50 leading-tight mt-0.5">
          {currentUser.role}
        </p>
      </div>
      <ActionMenu
        trigger={
          <button
            type="button"
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors cursor-pointer"
          >
            <MoreHorizontal size={16} />
          </button>
        }
        items={menuItems}
      />
    </div>
  );
}

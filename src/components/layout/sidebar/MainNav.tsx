"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  KeyRound,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  count?: number;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { label: "Vaults", href: "/vaults", icon: KeyRound, count: 8 },
  { label: "Teams", href: "/teams", icon: Users, count: 6 },
  {
    label: "Organizations",
    href: "/organizations",
    icon: Building2,
    count: 24,
  },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface MainNavProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export default function MainNav({ collapsed, onNavigate }: MainNavProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {navItems.map(({ label, href, icon: Icon, count, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={cn(
              "group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
              active
                ? "bg-brand-muted text-brand"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              collapsed && "justify-center px-0 w-10 mx-auto",
            )}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{label}</span>
                {count !== undefined && (
                  <span
                    className={cn(
                      "text-[11px] tabular-nums",
                      active
                        ? "text-brand font-semibold"
                        : "text-sidebar-foreground/40",
                    )}
                  >
                    {count}
                  </span>
                )}
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

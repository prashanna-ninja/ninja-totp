"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../SidebarContext";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function AppHeader({
  breadcrumbs,
  title,
  description,
  actions,
}: AppHeaderProps) {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="px-4 md:px-8 min-h-[118px] flex items-center  border-b border-sidebar-border bg-background">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setMobileOpen(true)}
        className="md:hidden mb-3"
        aria-label="Open menu"
      >
        <Menu size={16} />
      </Button>

      <div className="flex items-start w-full justify-between gap-4">
        <div className="flex-1 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-1.5">
              {breadcrumbs.map((b, i) => (
                <span
                  key={`${b.label}-${i}`}
                  className="flex items-center gap-1.5"
                >
                  {i > 0 && <span className="text-muted-foreground/50">/</span>}
                  {b.href ? (
                    <Link
                      href={b.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {b.label}
                    </Link>
                  ) : (
                    <span>{b.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {title && (
            <h1 className="text-[28px] font-bold tracking-tight text-foreground leading-tight truncate">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-[13px] text-muted-foreground mt-1 truncate">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center self-end gap-2 shrink-0 pt-1">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

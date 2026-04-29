"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarContext";
import BrandHeader from "./sidebar/BrandHeader";
import OrgSwitcher from "./sidebar/OrgSwitcher";
import SearchBar from "./sidebar/SearchBar";
import MainNav from "./sidebar/MainNav";
import PinnedVaults from "./sidebar/PinnedVaults";
import UserCard from "./sidebar/UserCard";

export default function AppSideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { mobileOpen, setMobileOpen } = useSidebar();

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      <div className="flex flex-col gap-3 px-3 py-3 border-b border-sidebar-border">
        <BrandHeader collapsed={collapsed} />
        <OrgSwitcher collapsed={collapsed} />
      </div>

      <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-1">
        {!collapsed && <SearchBar />}
        <div className={cn(!collapsed && "mt-2")}>
          <MainNav collapsed={collapsed} onNavigate={onNavigate} />
        </div>
        <PinnedVaults collapsed={collapsed} onNavigate={onNavigate} />
      </div>

      <UserCard collapsed={collapsed} />
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out shrink-0 relative",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {sidebarContent()}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((p) => !p)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`absolute -right-3 top-26 ${collapsed ? "top-23" : "top-26"} w-6 h-6 rounded-full bg-sidebar border border-sidebar-border shadow-sm hover:bg-brand-foreground z-10`}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </Button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent(() => setMobileOpen(false))}
      </aside>
    </>
  );
}

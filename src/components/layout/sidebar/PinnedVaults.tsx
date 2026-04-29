"use client";

import Link from "next/link";

interface PinnedVault {
  id: string;
  name: string;
  href: string;
  color: string;
}

const pinnedVaults: PinnedVault[] = [
  { id: "1", name: "Production", href: "/vaults/production", color: "#86efac" },
  { id: "2", name: "Frontend", href: "/vaults/frontend", color: "#86efac" },
  { id: "3", name: "DevOps", href: "/vaults/devops", color: "#16a34a" },
  { id: "4", name: "Marketing", href: "/vaults/marketing", color: "#86efac" },
];

interface PinnedVaultsProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export default function PinnedVaults({
  collapsed,
  onNavigate,
}: PinnedVaultsProps) {
  if (collapsed) return null;

  return (
    <div className="px-3 mt-5">
      <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest px-3 mb-2">
        Pinned Vaults
      </p>
      <ul className="flex flex-col gap-0.5">
        {pinnedVaults.map((v) => (
          <li key={v.id}>
            <Link
              href={v.href}
              onClick={onNavigate}
              className="flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-[13px] text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: v.color }}
              />
              <span className="truncate">{v.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

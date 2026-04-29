"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Search } from "lucide-react";

const subscribe = () => () => {};
const getIsMac = () => /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
const getIsMacServer = () => false;

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = useSyncExternalStore(subscribe, getIsMac, getIsMacServer);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const trigger = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "q";
      if (!trigger) return;
      e.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="px-3">
      <div className="flex items-center gap-2 rounded-lg bg-brand-dark-background px-2.5 py-2 primary-border">
        <Search size={14} className="text-sidebar-foreground/50 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search vaults, codes..."
          className="flex-1 min-w-0 bg-transparent text-[13px] outline-none placeholder:text-sidebar-foreground/50 text-sidebar-foreground"
        />
        <kbd className="text-[10px] text-sidebar-foreground/50 bg-sidebar border border-sidebar-border rounded px-1.5 py-0.5 font-mono shrink-0">
          {isMac ? "⌘Q" : "Ctrl Q"}
        </kbd>
      </div>
    </div>
  );
}

import Link from "next/link";
import { TotpCard } from "./totp-card";
import { NinjaLogo } from "@/components/custom-ui/custom-logo/ninja-logo";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  leftPanel?: React.ReactNode;
}

export function AuthSplitLayout({ children, leftPanel }: AuthSplitLayoutProps) {
  return (
    <div className="theme-page md:flex-row min-h-dvh">
      {/* ── Left panel ── */}
      <div className="hidden md:flex md:w-[44%] flex-col bg-brand-muted relative overflow-hidden p-8">
        <NinjaLogo />

        {leftPanel ?? <DefaultLeftPanelContent />}
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 flex-col bg-background relative">
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16">
          <div className="w-full max-w-[450px]">{children}</div>
        </div>

        <footer className="py-4 px-8 flex items-center justify-between">
          <span className="p3 text-muted-foreground">© Ninja TOTP 2026</span>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Status"].map((link) => (
              <Link key={link} href="#" className="p3 text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function DefaultLeftPanelContent() {
  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-64 h-44">
          <TotpCard
            vault="Stripe"
            code="491 827"
            variant="dark"
            className="absolute top-0 right-0 rotate-6 scale-90 opacity-80"
          />
          <TotpCard
            vault="AWS"
            code="192 073"
            variant="light"
            className="absolute top-3 left-2 rotate-2 scale-95 opacity-90"
          />
          <TotpCard
            vault="GitHub"
            code="773 014"
            variant="light"
            className="absolute bottom-0 left-0 -rotate-3"
          />
        </div>
      </div>

      <div className="space-y-3 px-10">
        <h1 className="h1 text-brand-surface max-w-xs">
          Your codes,
          <br />
          in one quiet place.
        </h1>
        <p className="p2 text-brand-surface/70 max-w-xs">
          End-to-end encrypted TOTP for teams. Share access with vaults, never with people.
        </p>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="label text-brand-surface/50 border border-brand-surface/20 rounded-full px-2.5 py-1">
            SOC 2 Type II · In progress
          </span>
        </div>
      </div>
    </>
  );
}

import { OtpEmailCard } from "./otp-email-card";

function PlainCard() {
  return <div className="w-64 rounded-2xl bg-white border border-gray-100 shadow-md h-38" />;
}

export function OtpLeftPanel() {
  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-64 h-44">
          <div className="absolute inset-0 -rotate-6 translate-y-5 -translate-x-5 opacity-60">
            <PlainCard />
          </div>

          <div className="absolute inset-0 -rotate-3 translate-y-2 -translate-x-2 opacity-80">
            <PlainCard />
          </div>

          <div className="absolute inset-0 rotate-1">
            <OtpEmailCard />
          </div>
        </div>
      </div>

      <div className="space-y-3 px-10">
        <h1 className="h1 text-brand-surface max-w-xs">
          One more step.
          <br />
          Then you're in.
        </h1>
        <p className="p2 text-brand-surface/70 max-w-xs">
          Codes are single-use and expire in 3 minutes. We never send them through chat or SMS.
        </p>
        <div className="flex items-center gap-1.5 pt-1">
          <span className="label text-brand-surface/50 border border-brand-surface/20 rounded-full px-2.5 py-1">
            SOC 2 Type II · Zero-knowledge
          </span>
        </div>
      </div>
    </>
  );
}

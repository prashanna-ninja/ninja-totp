import { Mail } from "lucide-react";

export function OtpEmailCard() {
  return (
    <div className="w-64 rounded-2xl bg-white shadow-lg border border-gray-100 p-5 space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-xl bg-brand flex items-center justify-center shrink-0">
          <Mail className="size-4 text-white" strokeWidth={2} />
        </div>
        <p className="text-xs font-medium text-gray-700 truncate">security@ninjatotp.com</p>
      </div>

      <p className="text-xs text-gray-400">Your verification code</p>

      <div className="grid grid-cols-4 gap-x-3 gap-y-1">
        {["4", "9", "2", "·", "0", "8", "7"].map((char, i) => (
          <span key={i} className="text-2xl font-bold text-gray-800 tabular-nums leading-tight">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

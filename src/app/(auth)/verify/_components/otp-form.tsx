"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;
const RESEND_KEY = "otp_resend_at";

function getRemainingCooldown(): number {
  const raw = localStorage.getItem(RESEND_KEY);
  if (!raw) return 0;
  const elapsed = Math.floor((Date.now() - Number(raw)) / 1000);
  return Math.max(0, RESEND_COOLDOWN - elapsed);
}

export function OtpForm({ email }: { email: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    const remaining = getRemainingCooldown();
    if (remaining <= 0) return;

    setResendCountdown(remaining);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startCooldown = () => {
    localStorage.setItem(RESEND_KEY, String(Date.now()));
    setResendCountdown(RESEND_COOLDOWN);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = (code: string) => {
    setIsVerifying(true);
    authClient.twoFactor.verifyOtp(
      { code },
      {
        onSuccess() {
          setIsVerifying(false);
          localStorage.removeItem(RESEND_KEY);
          router.push("/dashboard");
          toast.success("Verified! Welcome back.");
        },
        onError(ctx: { error: { message: string } }) {
          setIsVerifying(false);
          setValue("");
          toast.error(ctx.error.message ?? "Invalid code, please try again.");
        },
      },
    );
  };

  const handleResend = () => {
    if (resendCountdown > 0) return;
    setIsResending(true);
    authClient.twoFactor.sendOtp(
      {},
      {
        onSuccess() {
          setIsResending(false);
          startCooldown();
          toast.success("New code sent to your email.");
        },
        onError(ctx: { error: { message: string } }) {
          setIsResending(false);
          toast.error(ctx.error.message ?? "Failed to resend code.");
        },
      },
    );
  };

  const maskedEmail = email.replace(/(.{2}).+(@.+)/, "$1***$2");

  return (
    <div className="space-y-6">
      <p className="label text-muted-foreground">STEP 2 OF 2</p>

      <div className="space-y-1.5">
        <h1 className="h1">Check your inbox</h1>
        <p className="p2 text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">{maskedEmail}</span>.
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={OTP_LENGTH}
          value={value}
          onChange={setValue}
          onComplete={handleComplete}
          disabled={isVerifying}
        >
          <InputOTPGroup className="gap-2.5">
            {Array.from({ length: OTP_LENGTH }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="rounded-xl" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="button"
        variant="primary"
        disabled={isVerifying || value.length < OTP_LENGTH}
        onClick={() => handleComplete(value)}
        className="w-full h-10 rounded-lg p2"
      >
        {isVerifying ? "Verifying…" : "Verify & continue"}
      </Button>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="p3 text-muted-foreground gap-1.5 h-auto px-0" asChild>
          <Link href="/">
            <ArrowLeft className="size-3.5" />
            Back to sign in
          </Link>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isResending || resendCountdown > 0}
          onClick={handleResend}
          className="p3 text-muted-foreground gap-1.5 h-auto px-0"
        >
          <RotateCcw className="size-3.5" />
          {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : isResending ? "Sending…" : "Resend code"}
        </Button>
      </div>
    </div>
  );
}

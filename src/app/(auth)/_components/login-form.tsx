"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Building2, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { signInSchema } from "@/validations/auth";
import { signIn, authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const schema = signInSchema.extend({ trustDevice: z.boolean() });
type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", trustDevice: false },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);

    await signIn.email(
      { email: data.email, password: data.password },
      {
        async onSuccess(ctx) {
          try {
            if (!ctx.data?.twoFactorRedirect) {
              // First time — enable 2FA for this account
              await authClient.twoFactor.enable({ password: data.password });
            }
            await authClient.twoFactor.sendOtp({});
            router.push(`/verify?email=${encodeURIComponent(data.email)}`);
          } catch {
            setIsSubmitting(false);
            toast.error("Failed to send verification code. Please try again.");
          }
        },
        onError(error: { error: { message: string } }) {
          setIsSubmitting(false);
          toast.error(`Login failed: ${error.error.message}`);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <p className="label text-muted-foreground">STEP 1 OF 2</p>

      <div className="space-y-1.5">
        <h1 className="h1">Welcome back</h1>
        <p className="p2 text-muted-foreground">
          Sign in to access your team vaults.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
        noValidate
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Work email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="me@company.com"
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Master password</FieldLabel>
              <FieldGroup>
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="pr-14"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 size-8 my-auto mr-1 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </FieldGroup>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Controller
              control={form.control}
              name="trustDevice"
              render={({ field }) => (
                <Checkbox
                  id="trust"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel htmlFor="trust" className="p3 text-muted-foreground cursor-pointer font-normal">
              Trust this device for 30 days
            </FieldLabel>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
              <Link href="/signup">Sign up</Link>
            </Button>
            <span className="p3 text-border">·</span>
            <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
              <Link href="/forgot-password">Forgot?</Link>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          variant={"primary"}
          disabled={isSubmitting}
          className={cn("w-full h-10 rounded-lg p2")}
        >
          {isSubmitting ? "Sending code…" : "Continue →"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="label text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" className="flex flex-col items-center gap-1.5 h-auto py-4 rounded-xl">
          <Building2 className="size-5 text-muted-foreground" />
          <div className="text-center">
            <p className="p3 font-medium text-foreground">SSO</p>
            <p className="label text-muted-foreground">SAML or OIDC</p>
          </div>
        </Button>
        <Button type="button" variant="outline" className="flex flex-col items-center gap-1.5 h-auto py-4 rounded-xl">
          <Fingerprint className="size-5 text-muted-foreground" />
          <div className="text-center">
            <p className="p3 font-medium text-foreground">PassKey</p>
            <p className="label text-muted-foreground">Touch ID</p>
          </div>
        </Button>
      </div>
    </div>
  );
}

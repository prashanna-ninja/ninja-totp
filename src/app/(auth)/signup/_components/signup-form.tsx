"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { signUpSchema, type SignUpInput } from "@/validations/auth";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: SignUpInput) => {
    signUp.email(
      { name: data.name, email: data.email, password: data.password },
      {
        onRequest() {
          setIsSubmitting(true);
        },
        onSuccess() {
          setIsSubmitting(false);
          router.push("/dashboard");
          toast.success("Account created successfully!");
        },
        onError(error: { error: { message: string } }) {
          setIsSubmitting(false);
          toast.error(`Sign up failed: ${error.error.message}`);
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <p className="label text-muted-foreground">STEP 1 OF 2</p>

      <div className="space-y-1.5">
        <h1 className="h1">Create account</h1>
        <p className="p2 text-muted-foreground">
          Set up your vault in under a minute.
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

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
                  autoComplete="new-password"
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

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
              <FieldGroup>
                <Input
                  {...field}
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  className="pr-14"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-0 size-8 my-auto mr-1 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </FieldGroup>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <div className="flex items-center justify-end">
          <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
            <Link href="/">Already have an account?</Link>
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className={cn("w-full h-10 rounded-lg p2")}
        >
          {isSubmitting ? "Creating account…" : "Continue →"}
        </Button>
      </form>
    </div>
  );
}

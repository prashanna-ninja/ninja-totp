"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/validations/auth";
import { requestPasswordReset } from "@/lib/auth-client";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    await requestPasswordReset(
      { email: data.email, redirectTo: "/reset-password" },
      {
        onRequest() {
          setIsSubmitting(true);
        },
        onSuccess() {
          setIsSubmitting(false);
          form.reset();
          toast.success("If an account exists with that email, we've sent reset instructions.");
        },
        onError(ctx: { error: { message: string } }) {
          setIsSubmitting(false);
          toast.error(ctx.error.message || "Failed to send reset instructions. Please try again.");
        },
      },
    );
  };

  return (
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

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className={cn("w-full h-10 rounded-lg p2")}
      >
        {isSubmitting ? "Sending…" : "Send reset instructions"}
      </Button>
    </form>
  );
}

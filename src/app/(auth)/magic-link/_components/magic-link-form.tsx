"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const schema = z.object({ email: z.email("Enter a valid email address") });
type FormValues = z.infer<typeof schema>;

export function MagicLinkForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [sentEmail, setSentEmail] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setState("sending");

    const { error } = await authClient.signIn.magicLink({
      email: data.email,
      callbackURL: "/dashboard",
      errorCallbackURL: "/?error=magic_link_failed",
    });

    if (error) {
      setState("idle");
      toast.error(error.message ?? "Failed to send sign-in link. Please try again.");
      return;
    }

    setSentEmail(data.email);
    setState("sent");
    toast.success("Sign-in link sent! Check your inbox.");
  };

  if (state === "sent") {
    return (
      <div className="space-y-6">
        <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0 -ml-0.5">
          <Link href="/"><ArrowLeft className="size-3.5" /> Back to login</Link>
        </Button>

        <div className="space-y-1.5">
          <p className="label text-muted-foreground">LINK SENT</p>
          <h1 className="h1">Check your inbox</h1>
          <p className="p2 text-muted-foreground">We emailed a sign-in link to</p>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <Mail className="size-4 text-muted-foreground shrink-0" />
          <span className="p2 font-medium text-foreground truncate">{sentEmail}</span>
        </div>

        <div className="rounded-xl border border-brand/20 bg-brand-muted/40 px-6 py-5 flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10">
            <CheckCircle2 className="size-5 text-brand" />
          </div>
          <div className="space-y-0.5">
            <p className="p3 font-semibold text-foreground">Link on its way!</p>
            <p className="label text-muted-foreground">Expires in 10 minutes · Single use only</p>
          </div>
        </div>

        <p className="p3 text-center text-muted-foreground">
          Can&apos;t find it? Check your spam folder.
        </p>

        <Button
          type="button"
          variant="outline"
          className="w-full h-10 rounded-lg p2"
          onClick={() => {
            setState("idle");
            form.reset();
          }}
        >
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0 -ml-0.5">
        <Link href="/"><ArrowLeft className="size-3.5" /> Back to login</Link>
      </Button>

      <div className="space-y-1.5">
        <h1 className="h1">Quick Login</h1>
        <p className="p2 text-muted-foreground">
          Enter your work email and we&apos;ll send you a sign-in link.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                autoFocus
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={state === "sending"}
          className="w-full h-10 rounded-lg p2"
        >
          <Mail className="size-4" />
          {state === "sending" ? "Sending link…" : "Send sign-in link →"}
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  organizationSchema,
  type OrganizationInput,
} from "@/validations/organization";
import {
  ORGANIZATION_QUERY_KEY,
  createOrganization,
  updateOrganization,
} from "@/lib/services/organization";
import type { Organization } from "@/generated/prisma/client";

const COLOR_PALETTE = [
  { value: "#22c55e", label: "Green" },
  { value: "#3b82f6", label: "Blue" },
  { value: "#a855f7", label: "Purple" },
  { value: "#ef4444", label: "Red" },
  { value: "#f59e0b", label: "Amber" },
  { value: "#ec4899", label: "Pink" },
  { value: "#64748b", label: "Slate" },
];

export type AddEditOrganizationFormHandle = {
  submit: () => void;
  reset: () => void;
};

type Props = {
  ref?: React.RefObject<AddEditOrganizationFormHandle | null>;
  organization?: Organization;
  onSuccess?: () => void;
  onPendingChange?: (pending: boolean) => void;
};

function AddEditOrganizationForm({
  ref,
  organization,
  onSuccess,
  onPendingChange,
}: Props) {
  const queryClient = useQueryClient();
  const isEditing = Boolean(organization);

  const form = useForm<OrganizationInput>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: organization?.name ?? "",
      color: organization?.color ?? "",
      image: organization?.image ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: OrganizationInput) =>
      isEditing && organization
        ? updateOrganization(organization.id, data)
        : createOrganization(data),
    onSuccess: () => {
      toast.success(
        `Organization ${isEditing ? "updated" : "created"} successfully!`,
      );
      queryClient.invalidateQueries({ queryKey: [ORGANIZATION_QUERY_KEY] });
      onSuccess?.();
      if (!isEditing) form.reset();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Something went wrong.");
    },
  });

  useEffect(() => {
    onPendingChange?.(mutation.isPending);
  }, [mutation.isPending, onPendingChange]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      void form.handleSubmit((data) => mutation.mutate(data))();
    },
    reset: () => form.reset(),
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit((data) => mutation.mutate(data))(e);
      }}
      className="space-y-6"
      noValidate
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="org-name">Name</FieldLabel>
            <Input
              {...field}
              id="org-name"
              type="text"
              placeholder="Cobal Advisors"
              autoComplete="off"
              autoFocus
              maxLength={50}
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />

      <Controller
        name="color"
        control={form.control}
        render={({ field, fieldState }) => {
          const isCustomColor = Boolean(
            field.value && !COLOR_PALETTE.some((c) => c.value === field.value),
          );

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>
                Accent color{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </FieldLabel>
              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                {COLOR_PALETTE.map((c) => {
                  const selected = field.value === c.value;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => field.onChange(selected ? "" : c.value)}
                      aria-label={c.label}
                      aria-pressed={selected}
                      className={cn(
                        "size-9 rounded-lg border transition-all cursor-pointer",
                        selected
                          ? "ring-2 ring-offset-2 ring-offset-background ring-foreground border-transparent"
                          : "border-border hover:scale-105",
                      )}
                      style={{ backgroundColor: c.value }}
                    />
                  );
                })}

                <label
                  aria-label="Custom color"
                  className={cn(
                    "relative size-9 rounded-lg border overflow-hidden cursor-pointer transition-all",
                    isCustomColor
                      ? "ring-2 ring-offset-2 ring-offset-background ring-foreground border-transparent"
                      : "border-border hover:scale-105",
                  )}
                  style={
                    isCustomColor && field.value
                      ? { backgroundColor: field.value }
                      : {
                          background:
                            "conic-gradient(from 0deg, #ef4444, #f59e0b, #22c55e, #3b82f6, #a855f7, #ec4899, #ef4444)",
                        }
                  }
                >
                  <input
                    type="color"
                    value={field.value || "#000000"}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="absolute inset-0 size-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          );
        }}
      />

      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="org-image">
              Logo URL{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </FieldLabel>
            <Input
              {...field}
              id="org-image"
              type="url"
              placeholder="https://example.com/logo.png"
              autoComplete="off"
            />
            <FieldError>{fieldState.error?.message}</FieldError>
          </Field>
        )}
      />
    </form>
  );
}

export default AddEditOrganizationForm;

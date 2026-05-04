"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CustomConfirmationPopupProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;

  title: string;
  description?: string;

  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive";

  onConfirm?: () => void;
  onConfirmPending?: boolean;

  className?: string;
};

function CustomConfirmationPopup({
  isOpen,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  onConfirmPending,
  className,
}: CustomConfirmationPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 w-[calc(100%-2rem)] sm:max-w-[420px]",
          className,
        )}
      >
        <div className="shrink-0 px-6 pt-6 pb-5 border-b border-border">
          <DialogTitle className="text-[20px] font-bold tracking-tight text-foreground">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription className="text-[13px] text-muted-foreground mt-1">
              {description}
            </DialogDescription>
          ) : (
            <DialogDescription className="sr-only">{title}</DialogDescription>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-end gap-2 px-6 py-4 border-t border-border rounded-b-xl bg-brand-dark-background">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-50 hover:bg-brand-foreground"
            onClick={() => onOpenChange?.(false)}
            disabled={onConfirmPending}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            onClick={onConfirm}
            disabled={onConfirmPending}
          >
            {onConfirmPending ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomConfirmationPopup;

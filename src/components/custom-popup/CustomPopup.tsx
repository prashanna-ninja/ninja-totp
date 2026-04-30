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

type CustomPopupProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;

  kicker?: string;
  title: string;
  description?: string;

  body: React.ReactNode;

  footerStart?: React.ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  isSubmitting?: boolean;

  className?: string;
};

function CustomPopup({
  isOpen,
  onOpenChange,
  trigger,
  kicker,
  title,
  description,
  body,
  footerStart,
  cancelLabel = "Cancel",
  confirmLabel,
  onCancel,
  onConfirm,
  confirmDisabled,
  isSubmitting,
  className,
}: CustomPopupProps) {
  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const showFooter = Boolean(confirmLabel || onConfirm || footerStart);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 max-h-[90vh] w-[calc(100%-2rem)] sm:max-w-[560px]",
          className,
        )}
      >
        <div className="shrink-0 px-6 pt-6 pb-5 border-b border-border">
          {kicker && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              {kicker}
            </p>
          )}
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

        <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">{body}</div>

        {showFooter && (
          <div className="shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-border rounded-b-xl bg-brand-dark-background">
            <div className="flex-1 min-w-0 text-[12px] text-muted-foreground">
              {footerStart}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-50 hover:bg-brand-foreground"
                onClick={handleCancel}
              >
                {cancelLabel}
              </Button>
              {confirmLabel && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onConfirm}
                  disabled={confirmDisabled || isSubmitting}
                >
                  {confirmLabel}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CustomPopup;

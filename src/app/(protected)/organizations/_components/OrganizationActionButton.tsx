"use client";

import { useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomPopup from "@/components/custom-popup/CustomPopup";
import CustomConfirmationPopup from "@/components/custom-popup/CustomConfirmationPopup";
import {
  ORGANIZATION_QUERY_KEY,
  deleteOrganization,
} from "@/lib/services/organization";
import type { Organization } from "@/generated/prisma/client";
import AddEditOrganizationForm, {
  type AddEditOrganizationFormHandle,
} from "./AddEditOrganizationForm";

type Props = {
  organization: Organization;
};

function OrganizationActionButton({ organization }: Props) {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const editFormRef = useRef<AddEditOrganizationFormHandle>(null);

  const deleteMutation = useMutation({
    mutationFn: () => deleteOrganization(organization.id),
    onSuccess: () => {
      toast.success("Organization deleted");
      queryClient.invalidateQueries({ queryKey: [ORGANIZATION_QUERY_KEY] });
      setIsDeleteOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete organization");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Organization actions"
            onClick={(e) => e.stopPropagation()}
            className="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer flex-shrink-0"
          >
            <MoreHorizontal size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-36">
          <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
            <Pencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setIsDeleteOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomPopup
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Edit Organization"
        description="Update this organization's details."
        body={
          <AddEditOrganizationForm
            ref={editFormRef}
            organization={organization}
            onSuccess={() => setIsEditOpen(false)}
            onPendingChange={setIsEditPending}
          />
        }
        confirmLabel="Save changes"
        className="w-[500px]"
        isSubmitting={isEditPending}
        onConfirm={() => editFormRef.current?.submit()}
      />

      <CustomConfirmationPopup
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={`Delete "${organization.name}"?`}
        description="This will permanently delete the organization, its teams, and its vaults. This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => deleteMutation.mutate()}
        onConfirmPending={deleteMutation.isPending}
      />
    </>
  );
}

export default OrganizationActionButton;

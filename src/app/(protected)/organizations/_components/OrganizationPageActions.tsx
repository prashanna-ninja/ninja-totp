"use client";

import { useRef, useState } from "react";
import { Filter, Plus } from "lucide-react";

import CustomPopup from "@/components/custom-popup/CustomPopup";
import { Button } from "@/components/ui/button";
import type { OrganizationInput } from "@/validations/organization";
import AddEditOrganizationForm, {
  type AddEditOrganizationFormHandle,
} from "./AddEditOrganizationForm";

function OrganizationPageActions() {
  const [isAddOrgPopupOpen, setIsAddOrgPopupOpen] = useState(false);
  const formRef = useRef<AddEditOrganizationFormHandle>(null);

  const handleSubmit = (data: OrganizationInput) => {
    // TODO: hook up to API
    console.log("create organization", data);
    setIsAddOrgPopupOpen(false);
    formRef.current?.reset();
  };

  return (
    <>
      <CustomPopup
        isOpen={isAddOrgPopupOpen}
        onOpenChange={setIsAddOrgPopupOpen}
        title="Create Organization"
        description="Create a new organization to manage your projects and teams."
        body={<AddEditOrganizationForm ref={formRef} onSubmit={handleSubmit} />}
        confirmLabel="Create"
        className="w-[500px]"
        onConfirm={() => formRef.current?.submit()}
      />

      <Button variant="outline" size="sm">
        <Filter />
        Filter
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsAddOrgPopupOpen(true)}
      >
        <Plus />
        Add Organization
      </Button>
    </>
  );
}

export default OrganizationPageActions;

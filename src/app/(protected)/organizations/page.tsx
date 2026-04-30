import { Filter, Plus } from "lucide-react";
import AppPageShell from "@/components/layout/app-page-layout/AppPageShell";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <AppPageShell
      title="Organizations"
      description="Manage your organizations and their members."
      actions={
        <>
          <Button variant="outline" size="sm">
            <Filter />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus />
            Add Organization
          </Button>
        </>
      }
    ></AppPageShell>
  );
}

export default page;

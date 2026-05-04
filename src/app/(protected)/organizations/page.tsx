import AppPageShell from "@/components/layout/app-page-layout/AppPageShell";
import OrganizationPageActions from "./_components/OrganizationPageActions";
import OrganizationsGrid from "./_components/OrganizationsGrid";

function page() {
  return (
    <AppPageShell
      title="Organizations"
      description="Manage your organizations and their members."
      actions={<OrganizationPageActions />}
    >
      <OrganizationsGrid />
    </AppPageShell>
  );
}

export default page;

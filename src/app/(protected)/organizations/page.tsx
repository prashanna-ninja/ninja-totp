import AppPageShell from "@/components/layout/app-page-layout/AppPageShell";
import OrganizationPageActions from "./_components/OrganizationPageActions";

function page() {
  return (
    <AppPageShell
      title="Organizations"
      description="Manage your organizations and their members."
      actions={<OrganizationPageActions />}
    ></AppPageShell>
  );
}

export default page;

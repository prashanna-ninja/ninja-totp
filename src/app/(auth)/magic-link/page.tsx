import { redirectIfAuthenticated } from "@/lib/auth-guard";
import { AuthSplitLayout } from "../_components/auth-split-layout";
import { MagicLinkForm } from "./_components/magic-link-form";

export default async function MagicLinkPage() {
  await redirectIfAuthenticated();
  return (
    <AuthSplitLayout>
      <MagicLinkForm />
    </AuthSplitLayout>
  );
}

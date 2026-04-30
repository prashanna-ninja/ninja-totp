import { redirectIfAuthenticated } from "@/lib/auth-guard";
import { AuthSplitLayout } from "../_components/auth-split-layout";
import { SignupForm } from "./_components/signup-form";

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  return (
    <AuthSplitLayout>
      <SignupForm />
    </AuthSplitLayout>
  );
}

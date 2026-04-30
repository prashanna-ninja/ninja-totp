import { redirectIfAuthenticated } from "@/lib/auth-guard";
import { AuthSplitLayout } from "./_components/auth-split-layout";
import { LoginForm } from "./_components/login-form";

export default async function SignInPage() {
  await redirectIfAuthenticated();

  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
}

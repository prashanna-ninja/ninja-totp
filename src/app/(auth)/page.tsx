import { AuthSplitLayout } from "./_components/auth-split-layout";
import { LoginForm } from "./_components/login-form";

export default function SignInPage() {
  return (
    <AuthSplitLayout>
      <LoginForm />
    </AuthSplitLayout>
  );
}

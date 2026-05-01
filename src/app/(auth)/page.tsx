import { redirectIfAuthenticated } from "@/lib/auth-guard";
import { AuthSplitLayout } from "./_components/auth-split-layout";
import { LoginForm } from "./_components/login-form";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignInPage({ searchParams }: Props) {
  await redirectIfAuthenticated();
  const { error } = await searchParams;

  return (
    <AuthSplitLayout>
      <LoginForm error={error} />
    </AuthSplitLayout>
  );
}

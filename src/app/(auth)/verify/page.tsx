import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

import { auth } from "@/lib/auth";
import { AuthSplitLayout } from "../_components/auth-split-layout";
import { OtpForm } from "./_components/otp-form";
import { OtpLeftPanel } from "./_components/otp-left-panel";

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyPage({ searchParams }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/dashboard");

  const { email } = await searchParams;
  if (!email) redirect("/");

  const cookieStore = await cookies();
  const hasPending =
    cookieStore.has("better-auth.two_factor") ||
    cookieStore.has("__Secure-better-auth.two_factor");

  if (!hasPending) redirect("/");

  return (
    <AuthSplitLayout leftPanel={<OtpLeftPanel />}>
      <OtpForm email={email} />
    </AuthSplitLayout>
  );
}

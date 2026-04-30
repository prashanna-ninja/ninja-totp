import Link from "next/link"
import { AuthSplitLayout } from "../_components/auth-split-layout"
import { ResetPasswordForm } from "./_components/reset-password-form"
import { Button } from "@/components/ui/button"

interface ResetPasswordPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams
  const resolvedToken = typeof token === "string" ? token : undefined

  if (!resolvedToken) {
    return (
      <AuthSplitLayout>
        <div className="space-y-6">
          <p className="label text-muted-foreground">ACCOUNT RECOVERY</p>
          <div className="space-y-1.5">
            <h1 className="h1">Invalid link.</h1>
            <p className="p2 text-muted-foreground">
              This reset link is missing or has expired. Request a new one.
            </p>
          </div>
          <Button variant="primary" asChild className="w-full h-10 rounded-lg p2">
            <Link href="/forgot-password">Request new link</Link>
          </Button>
        </div>
      </AuthSplitLayout>
    )
  }

  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <p className="label text-muted-foreground">ACCOUNT RECOVERY</p>

        <div className="space-y-1.5">
          <h1 className="h1">Reset password</h1>
          <p className="p2 text-muted-foreground">
            Choose a new master password for your account.
          </p>
        </div>

        <ResetPasswordForm token={resolvedToken} />

        <div className="flex items-center justify-center">
          <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
            <Link href="/">Back to sign in</Link>
          </Button>
        </div>
      </div>
    </AuthSplitLayout>
  )
}

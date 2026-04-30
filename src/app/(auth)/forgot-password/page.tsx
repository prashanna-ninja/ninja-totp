import Link from "next/link"
import { AuthSplitLayout } from "../_components/auth-split-layout"
import { ForgotPasswordForm } from "./_components/forgot-password-form"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <p className="label text-muted-foreground">ACCOUNT RECOVERY</p>

        <div className="space-y-1.5">
          <h1 className="h1">Forgot password?</h1>
          <p className="p2 text-muted-foreground">
            Enter your email and we&apos;ll send you reset instructions.
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="flex items-center justify-center">
          <Button variant="link" size="sm" asChild className="p3 text-muted-foreground h-auto p-0">
            <Link href="/">Back to sign in</Link>
          </Button>
        </div>
      </div>
    </AuthSplitLayout>
  )
}

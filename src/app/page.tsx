import { AuthSplitLayout } from "@/components/auth/auth-split-layout"
import { LoginForm } from "@/components/auth/login-form"

export default function SignInPage() {
  return (
    <AuthSplitLayout env="Development">
      <LoginForm />
    </AuthSplitLayout>
  )
}

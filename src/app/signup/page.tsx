import { AuthSplitLayout } from "@/components/auth/auth-split-layout"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <AuthSplitLayout env="Development">
      <SignupForm />
    </AuthSplitLayout>
  )
}

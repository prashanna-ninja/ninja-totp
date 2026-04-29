import { AuthSplitLayout } from "../_components/auth-split-layout"
import { SignupForm } from "./_components/signup-form"

export default function SignUpPage() {
  return (
    <AuthSplitLayout>
      <SignupForm />
    </AuthSplitLayout>
  )
}

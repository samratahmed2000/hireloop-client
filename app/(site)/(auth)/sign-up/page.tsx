import AuthEmailForm from "@/app/components/auth/AuthEmailForm"
import AuthShell from "@/app/components/auth/AuthShell"

const SignUpPage = () => {
  return (
    <AuthShell
      title="Create your account"
      description="Start applying to curated roles in minutes."
    >
      <AuthEmailForm mode="sign-up" />
    </AuthShell>
  )
}

export default SignUpPage

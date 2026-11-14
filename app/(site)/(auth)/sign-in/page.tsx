import AuthEmailForm from "@/app/components/auth/AuthEmailForm"
import AuthShell from "@/app/components/auth/AuthShell"

const SignInPage = () => {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to keep your job search moving."
    >
      <AuthEmailForm mode="sign-in" />
    </AuthShell>
  )
}

export default SignInPage

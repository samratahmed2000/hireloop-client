"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LockKeyhole, Mail } from "lucide-react"
import { AuthField, PasswordField } from "@/app/components/auth/AuthField"
import AuthForm from "@/app/components/auth/AuthForm"
import AuthShell from "@/app/components/auth/AuthShell"
import GoogleAuthButton from "@/app/components/auth/GoogleAuthButton"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { signIn } from "@/lib/auth-client"

type SignInFieldErrors = {
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SignInPage = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const clearFieldError = (field: keyof SignInFieldErrors) => () => {
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
  }

  const showError = (title: string, message: string) => {
    setError(message)
    toast.add({
      title,
      description: message,
      type: "error",
      priority: "high",
    })
  }

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    const nextFieldErrors: SignInFieldErrors = {}

    if (!emailPattern.test(email)) {
      nextFieldErrors.email = "Enter a valid email address."
    }

    if (password.length === 0) {
      nextFieldErrors.password = "Enter your password."
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setError(null)
      toast.add({
        title: "Check your details",
        description: "Please fix the highlighted fields and try again.",
        type: "error",
        priority: "high",
      })
      return
    }

    setFieldErrors({})
    setError(null)
    setIsSubmitting(true)

    try {
      const { error: authError } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      })

      if (authError) {
        showError(
          "Couldn't sign you in",
          authError.message ?? "We couldn't sign you in. Check your details."
        )
        return
      }

      toast.add({
        title: "Signed in",
        description: "Welcome back. Taking you to the homepage.",
        type: "success",
      })

      router.push("/")
      router.refresh()
    } catch {
      showError(
        "Couldn't sign you in",
        "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsGoogleLoading(true)

    try {
      const { error: authError } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (authError) {
        showError(
          "Couldn't continue with Google",
          authError.message ?? "We couldn't continue with Google. Try again."
        )
      }
    } catch {
      showError(
        "Couldn't continue with Google",
        "We couldn't continue with Google. Try again."
      )
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to keep your job search moving and pick up where you left off."
    >
      <AuthForm
        onSubmit={handleSignIn}
        error={error}
        aria-busy={isSubmitting}
        noValidate
      >
        <FieldGroup className="gap-5">
          <AuthField
            id="email"
            name="email"
            type="email"
            label="Email address"
            icon={Mail}
            placeholder="jane@example.com"
            autoComplete="email"
            inputMode="email"
            required
            error={fieldErrors.email}
            disabled={isSubmitting}
            onChange={clearFieldError("email")}
          />

          <PasswordField
            id="password"
            name="password"
            label="Password"
            icon={LockKeyhole}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            error={fieldErrors.password}
            disabled={isSubmitting}
            onChange={clearFieldError("password")}
          />
        </FieldGroup>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl border-transparent bg-[#5b3bf5] text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"
        >
          {isSubmitting && <Spinner className="size-4" />}
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <FieldSeparator className="[&>span]:bg-neutral-900 [&>span]:text-neutral-500">
          or continue with
        </FieldSeparator>

        <GoogleAuthButton
          onClick={handleGoogleSignIn}
          loading={isGoogleLoading}
          disabled={isSubmitting}
        />

        <p className="text-center text-sm text-neutral-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#9d8cff] underline-offset-4 transition-colors hover:text-[#b9adff] hover:underline"
          >
            Create one
          </Link>
        </p>
      </AuthForm>
    </AuthShell>
  )
}

export default SignInPage

"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LockKeyhole, Mail, UserRound } from "lucide-react"
import { AuthField, PasswordField } from "@/app/components/auth/AuthField"
import AuthForm from "@/app/components/auth/AuthForm"
import GoogleSignIn from "@/app/components/auth/GoogleSignIn"
import { RoleField, type UserRole } from "@/app/components/auth/RoleField"
import { Button } from "@/components/ui/button"
import { FieldGroup, FieldSeparator } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { signIn, signUp } from "@/lib/auth-client"

type AuthMode = "sign-in" | "sign-up"

type AuthFieldErrors = {
  name?: string
  email?: string
  password?: string
}

type AuthFormValues = {
  name?: string
  email: string
  password: string
  role?: UserRole
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const content = {
  "sign-in": {
    submitLabel: "Sign In",
    submittingLabel: "Signing...",
    failureTitle: "Couldn't sign you in",
    failureMessage: "We couldn't sign you in. Check your details.",
    successTitle: "Signed in",
    successMessage: "Welcome back. Taking you to the homepage.",
    redirectTo: "/",
    footerPrompt: "Don't have an account?",
    footerLinkLabel: "Sign up",
    footerLinkHref: "/sign-up",
  },
  "sign-up": {
    submitLabel: "Sign Up",
    submittingLabel: "Creating...",
    failureTitle: "Couldn't create your account",
    failureMessage: "We couldn't create your account. Try again.",
    successTitle: "Account created",
    successMessage: "Your HireLoop account is ready. Sign in to continue.",
    redirectTo: "/sign-in",
    footerPrompt: "Already have an account?",
    footerLinkLabel: "Sign in",
    footerLinkHref: "/sign-in",
  },
} as const

type AuthEmailFormProps = {
  mode: AuthMode
}

function AuthEmailForm({ mode }: AuthEmailFormProps) {
  const router = useRouter()
  const text = content[mode]
  const isSignUp = mode === "sign-up"

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({})
  const [role, setRole] = useState<UserRole>("seeker")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearFieldError = (field: keyof AuthFieldErrors) => () => {
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const user = Object.fromEntries(formData.entries()) as AuthFormValues

    const name = user.name?.trim() ?? ""
    const email = user.email.trim()
    const password = user.password

    const nextFieldErrors: AuthFieldErrors = {}

    if (isSignUp && name.length < 2) {
      nextFieldErrors.name = "Enter your full name."
    }

    if (!emailPattern.test(email)) {
      nextFieldErrors.email = "Enter a valid email address."
    }

    if (isSignUp && password.length < 8) {
      nextFieldErrors.password = "Use at least 8 characters."
    } else if (!isSignUp && password.length === 0) {
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
      const { error: authError } = isSignUp
        ? await signUp.email({
            name,
            email,
            password,
            role: user.role ?? role,
          })
        : await signIn.email({
            email,
            password,
          })

      if (authError) {
        showError(text.failureTitle, authError.message ?? text.failureMessage)
        return
      }

      toast.add({
        title: text.successTitle,
        description: text.successMessage,
        type: "success",
      })

      router.push(text.redirectTo)
      router.refresh()
    } catch {
      showError(text.failureTitle, "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthForm
      onSubmit={handleSubmit}
      error={error}
      aria-busy={isSubmitting}
      noValidate
    >
      <FieldGroup className="gap-5">
        {isSignUp && (
          <RoleField value={role} onChange={setRole} disabled={isSubmitting} />
        )}

        {isSignUp && (
          <AuthField
            id="name"
            name="name"
            label="Name"
            icon={UserRound}
            placeholder="Ahmed"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            error={fieldErrors.name}
            disabled={isSubmitting}
            onChange={clearFieldError("name")}
          />
        )}

        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="me@mail.com"
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
          placeholder={
            isSignUp ? "Create a strong password" : "Enter your password"
          }
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={isSignUp ? 8 : undefined}
          hint={
            isSignUp
              ? "Use 8 or more characters with a mix of letters, numbers and symbols."
              : undefined
          }
          error={fieldErrors.password}
          disabled={isSubmitting}
          onChange={clearFieldError("password")}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full cursor-pointer rounded-xl border-transparent bg-[#5b3bf5] text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"
      >
        {isSubmitting && <Spinner className="size-4" />}
        {isSubmitting ? text.submittingLabel : text.submitLabel}
      </Button>

      <FieldSeparator className="[&>span]:bg-card [&>span]:text-muted-foreground">
        Or
      </FieldSeparator>

      <GoogleSignIn
        callbackURL="/"
        disabled={isSubmitting}
        onStart={() => setError(null)}
        onError={setError}
      />

      <p className="text-center text-sm text-muted-foreground">
        {text.footerPrompt}{" "}
        <Link
          href={text.footerLinkHref}
          className="font-medium text-[#5b3bf5] underline-offset-4 transition-colors hover:text-[#4a2fe0] hover:underline dark:text-[#9d8cff] dark:hover:text-[#b9adff]"
        >
          {text.footerLinkLabel}
        </Link>
      </p>
    </AuthForm>
  )
}

export default AuthEmailForm

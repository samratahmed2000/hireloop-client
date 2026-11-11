"use client"

import { useState } from "react"
import GoogleAuthButton from "@/app/components/auth/GoogleAuthButton"
import { toast } from "@/components/ui/toast"
import { signIn } from "@/lib/auth-client"

type GoogleSignInProps = {
  callbackURL?: string
  disabled?: boolean
  onStart?: () => void
  onError?: (message: string) => void
  className?: string
}

function GoogleSignIn({
  callbackURL = "/",
  disabled = false,
  onStart,
  onError,
  className,
}: GoogleSignInProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    onStart?.()
    setIsLoading(true)

    try {
      const { error: authError } = await signIn.social({
        provider: "google",
        callbackURL,
      })

      if (authError) {
        const message =
          authError.message ?? "We couldn't continue with Google. Try again."
        onError?.(message)
        toast.add({
          title: "Couldn't continue with Google",
          description: message,
          type: "error",
          priority: "high",
        })
      }
    } catch {
      const message = "We couldn't continue with Google. Try again."
      onError?.(message)
      toast.add({
        title: "Couldn't continue with Google",
        description: message,
        type: "error",
        priority: "high",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GoogleAuthButton
      onClick={handleClick}
      loading={isLoading}
      disabled={disabled}
      className={className}
    />
  )
}

export default GoogleSignIn

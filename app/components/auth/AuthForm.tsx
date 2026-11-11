"use client"

import type { ComponentProps, FormEvent, ReactNode } from "react"
import { CircleExclamationPoint } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type AuthFormProps = Omit<ComponentProps<"form">, "onSubmit" | "children"> & {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>
  error?: string | null
  children: ReactNode
}

function AuthForm({
  onSubmit,
  error,
  className,
  children,
  ...props
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      {error && (
        <Alert
          variant="destructive"
          className="border-red-400/20 bg-red-400/10 text-red-300"
        >
          <CircleExclamationPoint />
          <AlertDescription className="text-red-300/90">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {children}
    </form>
  )
}

export default AuthForm

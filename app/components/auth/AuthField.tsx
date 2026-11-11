"use client"

import { useState, type ComponentProps, type ReactNode } from "react"
import { EyeIcon, EyeOffIcon, type LucideIcon } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

const inputGroupClassName =
  "h-11 rounded-xl border-white/10 bg-white/4 transition-colors has-[[data-slot=input-group-control]:focus-visible]:border-[#5b3bf5]/60 has-[[data-slot=input-group-control]:focus-visible]:ring-[#5b3bf5]/25 has-[[data-slot][aria-invalid=true]]:border-red-400/60 has-[[data-slot][aria-invalid=true]]:ring-red-400/15"

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  id: string
  name: string
  label: string
  icon: LucideIcon
  error?: string
  hint?: ReactNode
  endAdornment?: ReactNode
}

function AuthField({
  id,
  name,
  label,
  icon: Icon,
  error,
  hint,
  endAdornment,
  className,
  ...props
}: AuthFieldProps) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id} className="text-neutral-200">
        {label}
      </FieldLabel>

      <InputGroup className={inputGroupClassName}>
        <InputGroupAddon
          align="inline-start"
          className="pl-3 text-neutral-500 transition-colors group-focus-within/input-group:text-[#9d8cff]"
        >
          <Icon className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={cn(
            "h-full text-sm text-white placeholder:text-neutral-500 md:text-sm",
            className
          )}
          {...props}
        />
        {endAdornment}
      </InputGroup>

      {hint && (
        <FieldDescription
          id={`${id}-hint`}
          className="text-xs text-neutral-500"
        >
          {hint}
        </FieldDescription>
      )}

      {error && (
        <FieldError id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </FieldError>
      )}
    </Field>
  )
}

type PasswordFieldProps = Omit<AuthFieldProps, "type" | "endAdornment">

function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <AuthField
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <InputGroupAddon align="inline-end" className="pr-1.5">
          <InputGroupButton
            size="icon-sm"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((value) => !value)}
            className="text-neutral-400 hover:bg-white/5 hover:text-white"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      }
    />
  )
}

export { AuthField, PasswordField }

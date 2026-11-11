"use client"

import {
  Building2,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react"
import { FieldError, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const roles = [
  {
    value: "seeker",
    label: "Job Seeker",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
] as const

type UserRole = (typeof roles)[number]["value"]

type RoleFieldProps = {
  value: UserRole
  onChange: (value: UserRole) => void
  error?: string
  disabled?: boolean
}

function RoleField({ value, onChange, error, disabled }: RoleFieldProps) {
  return (
    <FieldSet data-invalid={error ? true : undefined} className="gap-2">
      <RadioGroup
        name="role"
        value={value}
        onValueChange={(next) => onChange(next as UserRole)}
        disabled={disabled}
        aria-label="Account type"
        className="grid grid-cols-3 gap-2"
      >
        {roles.map((role) => {
          const Icon: LucideIcon = role.icon
          const selected = role.value === value

          return (
            <label
              key={role.value}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-border bg-foreground/5 px-1 py-4 text-center transition-colors",
                "relative hover:border-foreground/20 hover:bg-foreground/10",
                "has-focus-visible:border-[#5b3bf5]/60 has-focus-visible:ring-3 has-focus-visible:ring-[#5b3bf5]/25",
                selected && "border-[#5b3bf5]/70 bg-[#5b3bf5]/15",
                disabled && "cursor-not-allowed opacity-60"
              )}
            >
              <RadioGroupItem
                value={role.value}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <Icon
                aria-hidden
                className={cn(
                  "size-4",
                  selected
                    ? "text-[#5b3bf5] dark:text-[#9d8cff]"
                    : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  selected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {role.label}
              </span>
            </label>
          )
        })}
      </RadioGroup>

      {error && (
        <FieldError className="text-xs text-red-400">{error}</FieldError>
      )}
    </FieldSet>
  )
}

export { RoleField, type UserRole }

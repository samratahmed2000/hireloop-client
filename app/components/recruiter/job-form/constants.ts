import type { JobCategory, JobType, SalaryFrequency } from "@/lib/types/jobs"

export const jobCategories = [
  { value: "engineering", label: "Engineering & Tech" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Customer Support" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "people", label: "People & HR" },
  { value: "other", label: "Other" },
] satisfies readonly { value: JobCategory; label: string }[]

export const salaryFrequencies = [
  { value: "hourly", label: "Per hour" },
  { value: "monthly", label: "Per month" },
  { value: "yearly", label: "Per year" },
] satisfies readonly { value: SalaryFrequency; label: string }[]

export const jobTypes: readonly JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

export const controlClassName = "h-10 rounded-xl border-border bg-foreground/5"

export const selectTriggerClassName =
  "h-10 w-full rounded-xl border-border bg-foreground/5"

export const jobTypeItemClassName =
  "h-10 min-w-0 flex-1 basis-[calc(50%-0.25rem)] justify-center rounded-xl border-border bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground data-pressed:border-[#5b3bf5]/50 data-pressed:bg-[#5b3bf5]/10 data-pressed:text-[#5b3bf5] sm:basis-0 dark:data-pressed:border-[#9d8cff]/40 dark:data-pressed:bg-[#9d8cff]/15 dark:data-pressed:text-[#c3b9ff]"

export const jobSubmitButtonClassName =
  "h-10 cursor-pointer rounded-xl border-transparent bg-[#5b3bf5] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"

export function isJobType(value: string): value is JobType {
  return (jobTypes as readonly string[]).includes(value)
}

export function toDateInputValue(value?: string) {
  if (!value) {
    return undefined
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString().slice(0, 10)
}

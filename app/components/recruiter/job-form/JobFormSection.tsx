import type { ReactNode } from "react"

export function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-destructive">
      *
    </span>
  )
}

function JobFormSection({
  step,
  title,
  description,
  children,
}: {
  step: number
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[#5b3bf5] dark:bg-[#9d8cff]"
          />
          <span className="text-[#5b3bf5] dark:text-[#9d8cff]">{step}.</span>
          {title}
        </h2>
        <p className="pl-5.5 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </section>
  )
}

export default JobFormSection

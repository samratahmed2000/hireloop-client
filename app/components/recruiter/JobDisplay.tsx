import { ObjectId } from "mongodb"
import {
  formatDistanceToNowStrict,
  isBefore,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns"
import { cn } from "@/lib/utils"
import type { Job, JobCategory, JobStatus } from "@/lib/types/jobs"
import CategoryMeta from "./CategoryMeta"

export type DisplayStatus = JobStatus | "expired"

const statusMeta: Record<
  DisplayStatus,
  { label: string; badgeClassName: string; dotClassName: string }
> = {
  active: {
    label: "Active",
    badgeClassName:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  expired: {
    label: "Expired",
    badgeClassName: "border-border bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground/60",
  },
  closed: {
    label: "Closed",
    badgeClassName: "border-border bg-muted text-muted-foreground",
    dotClassName: "bg-muted-foreground/60",
  },
  draft: {
    label: "Draft",
    badgeClassName:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dotClassName: "bg-amber-500",
  },
}

const frequencyUnit = {
  hourly: "hr",
  monthly: "mo",
  yearly: "yr",
} as const

function formatAmount(value: number) {
  return value >= 1000 ? `${Number((value / 1000).toFixed(1))}k` : String(value)
}

export function getCategoryMeta(category: JobCategory) {
  return CategoryMeta[category] ?? CategoryMeta.other
}

export function formatCompensation(job: Job) {
  const currency = job.currency ?? "$"

  return `${currency}${formatAmount(job.minSalary)} – ${currency}${formatAmount(job.maxSalary)} / ${frequencyUnit[job.salaryFrequency]}`
}

export function getPostedAt(job: Job) {
  if (job.createdAt) {
    const createdAt = new Date(job.createdAt)

    if (!Number.isNaN(createdAt.getTime())) {
      return createdAt
    }
  }

  try {
    return new ObjectId(job._id).getTimestamp()
  } catch {
    return null
  }
}

export function getDeadline(job: Job) {
  const deadline = parseISO(job.applicationDeadline)

  return isValid(deadline) ? deadline : null
}

export function getDisplayStatus(
  job: Job,
  deadline: Date | null
): DisplayStatus {
  if (job.status === "closed" || job.status === "draft") {
    return job.status
  }

  return deadline && isBefore(deadline, startOfToday()) ? "expired" : "active"
}

export function getJobLocation(job: Job) {
  return job.remote ? `${job.location} (Remote)` : job.location
}

export function formatPostedAgo(postedAt: Date) {
  return `Posted ${formatDistanceToNowStrict(postedAt)} ago`
}

export function CategoryIcon({ category }: { category: JobCategory }) {
  const meta = getCategoryMeta(category)
  const Icon = meta.icon

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl",
        meta.iconClassName
      )}
    >
      <Icon className="size-4.5" />
    </span>
  )
}

export function StatusPill({ status }: { status: DisplayStatus }) {
  const meta = statusMeta[status]

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        meta.badgeClassName
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", meta.dotClassName)}
      />
      {meta.label}
    </span>
  )
}

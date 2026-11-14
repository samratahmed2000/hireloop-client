import { formatDistanceToNowStrict } from "date-fns"
import { getCategoryMeta } from "@/app/components/recruiter/job/JobDisplay"
import { getAppliedAt, isArchivedApplication } from "@/lib/applications"
import type { Application } from "@/lib/types/applications"

export type ApplicationsTab = "active" | "archived"

export const brandButtonClassName =
  "h-10 rounded-xl border-transparent bg-[#5b3bf5] px-4 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50"

export const detailsButtonClassName =
  "h-8 rounded-lg px-2.5 text-xs font-semibold text-[#5b3bf5] hover:bg-[#5b3bf5]/10 hover:text-[#5b3bf5] dark:text-[#c3b9ff] dark:hover:bg-[#9d8cff]/10 dark:hover:text-[#c3b9ff]"

export const tabItemClassName =
  "h-8 rounded-lg px-3.5 text-xs font-medium text-muted-foreground data-pressed:bg-foreground/10 data-pressed:text-foreground data-pressed:shadow-xs sm:px-4"

export function getJobMeta(application: Application) {
  const parts: string[] = []

  if (application.jobType) {
    parts.push(application.jobType)
  }

  if (application.remote) {
    parts.push("Remote")
  } else if (application.location) {
    parts.push(application.location)
  }

  return parts.length
    ? parts.join(" • ")
    : getCategoryMeta(application.jobCategory).label
}

export function getAppliedLabel(application: Application) {
  const appliedAt = getAppliedAt(application)

  return appliedAt
    ? formatDistanceToNowStrict(appliedAt, { addSuffix: true })
    : "—"
}

export function getApplicationsByTab(
  applications: Application[],
  tab: ApplicationsTab
) {
  return applications.filter((application) =>
    tab === "archived"
      ? isArchivedApplication(application)
      : !isArchivedApplication(application)
  )
}

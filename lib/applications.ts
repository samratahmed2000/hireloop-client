import { ObjectId } from "bson"
import type { Application, ApplicationStatus } from "./types/applications"

export const applicationStatusMeta: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "border-border bg-muted/60 text-muted-foreground",
  },
  review: {
    label: "Review",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  shortlisted: {
    label: "Shortlisted",
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  interview: {
    label: "Interview",
    className:
      "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  offered: {
    label: "Offered",
    className:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  rejected: {
    label: "Rejected",
    className:
      "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "border-border bg-muted/60 text-muted-foreground",
  },
}

const statusAliases: Record<string, ApplicationStatus> = {
  applied: "applied",
  pending: "applied",
  submitted: "applied",
  review: "review",
  reviewing: "review",
  "in review": "review",
  "under review": "review",
  shortlist: "shortlisted",
  shortlisted: "shortlisted",
  interview: "interview",
  interviewing: "interview",
  offer: "offered",
  offered: "offered",
  hired: "offered",
  accepted: "offered",
  rejected: "rejected",
  declined: "rejected",
  withdrawn: "withdrawn",
  archived: "withdrawn",
}

export function normalizeApplicationStatus(
  status?: string | null
): ApplicationStatus {
  const key = status?.trim().toLowerCase()

  return (key && statusAliases[key]) || "applied"
}

export function getAppliedAt(application: Application): Date | null {
  const value = application.appliedAt ?? application.createdAt

  if (value) {
    const date = new Date(value)

    if (!Number.isNaN(date.getTime())) {
      return date
    }
  }

  try {
    return new ObjectId(application._id).getTimestamp()
  } catch {
    return null
  }
}

export function isArchivedApplication(application: Application) {
  return (
    application.archived === true ||
    normalizeApplicationStatus(application.status) === "withdrawn"
  )
}

export function getApplicationStats(applications: Application[]) {
  const total = applications.length
  let shortlisted = 0
  let interviews = 0
  let offers = 0

  for (const application of applications) {
    const status = normalizeApplicationStatus(application.status)

    if (status === "shortlisted") {
      shortlisted += 1
    } else if (status === "interview") {
      interviews += 1
    } else if (status === "offered") {
      offers += 1
    }
  }

  return {
    total,
    shortlisted,
    interviews,
    offers,
    successRate: total === 0 ? 0 : Math.round((offers / total) * 100),
  }
}

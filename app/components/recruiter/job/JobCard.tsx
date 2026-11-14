import { format } from "date-fns"
import { Building2Icon, MapPinIcon, UsersIcon } from "lucide-react"
import type { Job } from "@/lib/types/jobs"
import JobActions from "./JobActions"
import {
  CategoryIcon,
  StatusPill,
  formatCompensation,
  formatPostedAgo,
  getCategoryMeta,
  getDeadline,
  getDisplayStatus,
  getJobLocation,
  getPostedAt,
} from "./JobDisplay"

function JobCard({ job }: { job: Job }) {
  const category = getCategoryMeta(job.jobCategory)
  const deadline = getDeadline(job)
  const displayStatus = getDisplayStatus(job, deadline)
  const postedAt = getPostedAt(job)
  const applicants = job.applicants ?? 0
  const isClosed = displayStatus === "expired" || displayStatus === "closed"

  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CategoryIcon category={job.jobCategory} />
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">
              {job.jobTitle}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {category.label}
            </p>
          </div>
        </div>
        <StatusPill status={displayStatus} />
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <Building2Icon className="size-3.5 shrink-0" />
          <span className="truncate">{job.companyName}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <MapPinIcon className="size-3.5 shrink-0" />
          <span className="truncate">{getJobLocation(job)}</span>
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center rounded-lg bg-foreground/5 px-2 py-1 font-medium">
          {job.jobType}
        </span>
        <span className="font-medium text-foreground">
          {formatCompensation(job)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UsersIcon className="size-3.5" />
          <span className="font-medium text-foreground">{applicants}</span>
        </span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">
            {isClosed ? "Closed" : "Deadline"}
          </p>
          <p className="text-sm font-medium text-foreground">
            {deadline ? format(deadline, "MMM d, yyyy") : "—"}
          </p>
          {!isClosed && postedAt && (
            <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
              {formatPostedAgo(postedAt)}
            </p>
          )}
        </div>
        <JobActions job={job} />
      </div>
    </article>
  )
}

export default JobCard

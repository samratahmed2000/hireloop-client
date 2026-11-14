import type { Job } from "@/lib/types/jobs"
import {
  CategoryIcon,
  StatusPill,
  getDeadline,
  getDisplayStatus,
} from "../job/JobDisplay"
import type { DisplayStatus } from "../job/JobDisplay"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "lucide-react"

const applyButtonClassName =
  "h-10 flex-1 rounded-xl border-transparent bg-[#5b3bf5] px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"

const HiringBadge = ({ status }: { status: DisplayStatus }) => {
  if (status !== "active") {
    return <StatusPill status={status} />
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
      Actively Hiring
    </span>
  )
}

const JobDetailsHeader = ({ job }: { job: Job }) => {
  const deadline = getDeadline(job)
  const displayStatus = getDisplayStatus(job, deadline)
  const isOpen = displayStatus === "active"

  return (
    <header className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <CategoryIcon category={job.jobCategory} />

          <div className="min-w-0">
            <h1 className="text-xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-2xl">
              {job.jobTitle}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">
                {job.companyName}
              </span>
              <span aria-hidden className="size-1 rounded-full bg-border" />
              <HiringBadge status={displayStatus} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={`Save ${job.jobTitle}`}
            className="size-10 shrink-0 cursor-pointer rounded-xl border-border bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
          >
            <BookmarkIcon />
          </Button>

          <Button
            type="button"
            disabled={!isOpen}
            className={`${applyButtonClassName} cursor-pointer`}
          >
            {isOpen ? "Apply Now" : "Applications Closed"}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default JobDetailsHeader

import {
  BanknoteIcon,
  BookmarkIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  MapPinIcon,
  TagIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Job } from "@/lib/types/jobs"
import {
  CategoryIcon,
  formatCompensation,
  getCategoryMeta,
  getJobLocation,
} from "@/app/components/recruiter/job/JobDisplay"
import Link from "next/link"

const metaPillClassName =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted-foreground"

type JobCardProps = {
  job: Job
  className?: string
}

function JobCard({ job, className }: JobCardProps) {
  const category = getCategoryMeta(job.jobCategory)

  return (
    <Link href={`/browse-jobs/${job._id}`}>
      <article
        className={cn(
          "rounded-2xl border border-border bg-card/70 p-4 transition-colors hover:border-foreground/15 hover:bg-card sm:p-5",
          className
        )}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <CategoryIcon category={job.jobCategory} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {job.jobTitle}
                </h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex min-w-0 items-center gap-1.5">
                    <Building2Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{job.companyName}</span>
                  </span>
                  <span aria-hidden>•</span>
                  <span className="inline-flex min-w-0 items-center gap-1.5">
                    <MapPinIcon className="size-3.5 shrink-0" />
                    <span className="truncate">{getJobLocation(job)}</span>
                  </span>
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Save ${job.jobTitle}`}
                className="shrink-0 cursor-pointer text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <BookmarkIcon />
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className={metaPillClassName}>
                  <TagIcon className="size-3.5" />
                  {category.label}
                </span>
                <span className={cn(metaPillClassName, "text-foreground")}>
                  <BanknoteIcon className="size-3.5" />
                  {formatCompensation(job)}
                </span>
                <span className={metaPillClassName}>
                  <BriefcaseBusinessIcon className="size-3.5" />
                  {job.jobType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default JobCard

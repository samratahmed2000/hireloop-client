import { format } from "date-fns"
import { MapPinIcon, UsersIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Job } from "@/lib/types/jobs"
import JobActions from "./JobActions"
import JobCard from "./JobCard"
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

function JobsTable({ jobs }: { jobs: Job[] }) {
  return (
    <div className="@container">
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card @min-[700px]:block [&_table]:text-[13px]">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30 [&_th]:text-center">
              <TableHead className="h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase first:pl-4">
                Job Title &amp; Dept
              </TableHead>
              <TableHead className="h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Company &amp; Location
              </TableHead>
              <TableHead className="hidden h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase @min-[1000px]:table-cell">
                Type
              </TableHead>
              <TableHead className="hidden h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase @min-[820px]:table-cell">
                Compensation
              </TableHead>
              <TableHead className="hidden h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase @min-[1150px]:table-cell">
                Applicants
              </TableHead>
              <TableHead className="h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="hidden h-12 px-2 text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase @min-[900px]:table-cell">
                Deadline
              </TableHead>
              <TableHead className="h-12 px-2 text-right text-[0.68rem] font-semibold tracking-[0.08em] text-muted-foreground uppercase last:pr-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => {
              const category = getCategoryMeta(job.jobCategory)
              const deadline = getDeadline(job)
              const displayStatus = getDisplayStatus(job, deadline)
              const postedAt = getPostedAt(job)
              const applicants = job.applicants ?? 0
              const isClosed =
                displayStatus === "expired" || displayStatus === "closed"

              return (
                <TableRow key={job._id} className="hover:bg-muted/40">
                  <TableCell className="px-2 py-3.5 first:pl-4">
                    <div className="flex items-center gap-3">
                      <CategoryIcon category={job.jobCategory} />
                      <div className="min-w-0">
                        <p className="max-w-40 truncate font-medium text-foreground">
                          {job.jobTitle}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {category.label}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-2 py-3.5">
                    <p className="max-w-32 truncate font-medium text-foreground">
                      {job.companyName}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPinIcon className="size-3 shrink-0" />
                      <span className="max-w-32 truncate">
                        {getJobLocation(job)}
                      </span>
                    </p>
                  </TableCell>

                  <TableCell className="hidden px-2 py-3.5 @min-[1000px]:table-cell">
                    <span className="inline-flex items-center rounded-lg bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {job.jobType}
                    </span>
                  </TableCell>

                  <TableCell className="hidden px-2 py-3.5 text-sm font-medium text-foreground @min-[820px]:table-cell">
                    {formatCompensation(job)}
                  </TableCell>

                  <TableCell className="hidden px-2 py-3.5 @min-[1150px]:table-cell">
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UsersIcon className="size-4" />
                      <span className="font-medium text-foreground">
                        {applicants}
                      </span>
                    </span>
                  </TableCell>

                  <TableCell className="px-2 py-3.5">
                    <StatusPill status={displayStatus} />
                  </TableCell>

                  <TableCell className="hidden px-2 py-3.5 @min-[900px]:table-cell">
                    <p className="text-sm font-medium text-foreground">
                      {deadline ? format(deadline, "MMM d, yyyy") : "—"}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
                      {isClosed
                        ? "Closed"
                        : postedAt
                          ? formatPostedAgo(postedAt)
                          : "—"}
                    </p>
                  </TableCell>

                  <TableCell className="px-2 py-3.5 last:pr-4">
                    <JobActions job={job} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 @min-[700px]:hidden">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  )
}

export default JobsTable

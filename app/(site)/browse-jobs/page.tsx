import { SearchXIcon, ServerCrashIcon } from "lucide-react"
import { getPostedAt } from "@/app/components/recruiter/job/JobDisplay"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { getBrowseJobs } from "@/lib/api/jobs"
import type { Job } from "@/lib/types/jobs"
import {
  defaultJobSort,
  isJobSort,
  JobSort,
} from "@/app/components/seeker/job-sort"
import JobSearchBar from "@/app/components/seeker/JobSearchBar"
import JobFilters from "@/app/components/seeker/JobFilters"
import JobSortSelect from "@/app/components/seeker/JobSortSelect"
import JobCard from "@/app/components/seeker/JobCard"

export const dynamic = "force-dynamic"

const emptyClassName =
  "rounded-2xl border border-dashed border-border bg-card py-14 sm:py-16"

function getJobTime(job: Job) {
  return getPostedAt(job)?.getTime() ?? 0
}

function sortJobs(jobs: Job[], sort: JobSort) {
  const sorted = [...jobs]

  switch (sort) {
    case "oldest":
      return sorted.sort((a, b) => getJobTime(a) - getJobTime(b))
    case "salary":
      return sorted.sort((a, b) => b.maxSalary - a.maxSalary)
    default:
      return sorted.sort((a, b) => getJobTime(b) - getJobTime(a))
  }
}

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [Key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  const sortParam = typeof search.sort === "string" ? search.sort : null
  const sort: JobSort = isJobSort(sortParam) ? sortParam : defaultJobSort

  let jobs: Job[] = []
  let loadFailed = false

  try {
    jobs = sortJobs(await getBrowseJobs(query), sort)
  } catch {
    loadFailed = true
  }

  return (
    <main className="relative isolate overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[#5b3bf5]/10 blur-[140px]" />
        <div className="absolute -bottom-56 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#3b1bd8]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-330">
        <h1 className="sr-only">Browse jobs</h1>

        <JobSearchBar />

        <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
          <JobFilters />

          <section aria-label="Job results" className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-heading text-lg font-semibold tracking-tight text-balance text-foreground sm:text-xl">
                Found {jobs.length} Professional{" "}
                {jobs.length === 1 ? "Job" : "Jobs"}
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Sort by:</span>
                <JobSortSelect />
              </div>
            </div>

            <div className="mt-4 sm:mt-5">
              {loadFailed ? (
                <Empty className={emptyClassName}>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <ServerCrashIcon />
                    </EmptyMedia>
                    <EmptyTitle>Couldn&apos;t load jobs</EmptyTitle>
                    <EmptyDescription>
                      Something went wrong while fetching job listings. Please
                      try again in a moment.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : jobs.length === 0 ? (
                <Empty className={emptyClassName}>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <SearchXIcon />
                    </EmptyMedia>
                    <EmptyTitle>No jobs found</EmptyTitle>
                    <EmptyDescription>
                      Try adjusting your search or filters to see more
                      opportunities.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <ul className="flex flex-col gap-3 sm:gap-4">
                  {jobs.map((job) => (
                    <li key={job._id}>
                      <JobCard job={job} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobsPage

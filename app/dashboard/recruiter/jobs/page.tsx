import Link from "next/link"
import {
  BriefcaseBusinessIcon,
  PlusIcon,
  RefreshCwIcon,
  ServerCrashIcon,
} from "lucide-react"
import JobsTable from "@/app/components/recruiter/JobsTable"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { getJobs } from "@/lib/api/jobs"
import type { Job } from "@/lib/types/jobs"

export const dynamic = "force-dynamic"

const brandButtonClassName =
  "h-10 w-full cursor-pointer rounded-xl border-transparent bg-[#5b3bf5] px-4 text-sm font-semibold text-white shadow-[0_0_24px_rgba(91,59,245,0.35)] hover:bg-[#6a4dff] focus-visible:ring-[#5b3bf5]/50 sm:w-auto"

const emptyClassName =
  "rounded-2xl border border-dashed border-border bg-card py-14 sm:py-16"

const JobsPage = async () => {
  let jobs: Job[] = []
  let loadFailed = false

  try {
    jobs = await getJobs()
  } catch {
    loadFailed = true
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-6">
      <header className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-pretty text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          nativeButton={false}
          className={brandButtonClassName}
          render={<Link href="/dashboard/recruiter/new" />}
        >
          <PlusIcon />
          New Job Post
        </Button>
      </header>

      {loadFailed ? (
        <Empty className={emptyClassName}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ServerCrashIcon />
            </EmptyMedia>
            <EmptyTitle>Couldn&apos;t load your job posts</EmptyTitle>
            <EmptyDescription>
              Something went wrong while fetching your listings. Please try
              again in a moment.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              nativeButton={false}
              className="h-9 rounded-xl px-4"
              render={<a href="/dashboard/recruiter/jobs" />}
            >
              <RefreshCwIcon />
              Try again
            </Button>
          </EmptyContent>
        </Empty>
      ) : jobs.length === 0 ? (
        <Empty className={emptyClassName}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BriefcaseBusinessIcon />
            </EmptyMedia>
            <EmptyTitle>No job posts yet</EmptyTitle>
            <EmptyDescription>
              Publish your first role to start attracting qualified candidates.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              nativeButton={false}
              className={brandButtonClassName}
              render={<Link href="/dashboard/recruiter/new" />}
            >
              <PlusIcon />
              Post a new job
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <JobsTable jobs={jobs} />
      )}
    </div>
  )
}

export default JobsPage

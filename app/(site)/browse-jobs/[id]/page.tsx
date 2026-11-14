import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import CompanyOverview from "@/app/components/recruiter/job-details/CompanyOverview"
import { getJobById } from "@/lib/api/jobs"
import type { Job } from "@/lib/types/jobs"
import JobStatCard from "../../../components/recruiter/job-details/JobStatCard"
import JobInfoGrid from "../../../components/recruiter/job-details/JobInfoGrid"
import JobDetailsHeader from "@/app/components/recruiter/job-details/JobDetailsHeader"

export const dynamic = "force-dynamic"

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  let job: Job | null = null

  try {
    job = await getJobById(id)
  } catch {
    notFound()
  }

  if (!job) {
    notFound()
  }

  return (
    <main className="relative isolate overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[#5b3bf5]/10 blur-[140px]" />
        <div className="absolute -bottom-56 left-1/2 h-96 w-[70%] -translate-x-1/2 rounded-full bg-[#3b1bd8]/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Link
          href="/browse-jobs"
          className="mb-4 inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Back to Jobs
        </Link>

        {/* Job Details Header */}
        <JobDetailsHeader job={job} />

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6">
          <div className="min-w-0 space-y-4 lg:space-y-6">
            {/* Job Stat Card */}
            <JobStatCard job={job} />

            <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm sm:p-6 lg:p-7">
              {/* Job Info Grid */}
              <JobInfoGrid job={job} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            {/* Company Overview */}
            <CompanyOverview job={job} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default JobDetailsPage

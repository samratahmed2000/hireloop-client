import { headers } from "next/headers"
import ApplicationsView from "@/app/components/seeker/applications/ApplicationsView"
import { getApplications } from "@/lib/api/applications"
import { getJobs } from "@/lib/api/jobs"
import { getAppliedAt } from "@/lib/applications"
import { auth } from "@/lib/auth"
import type { Application } from "@/lib/types/applications"
import type { Job } from "@/lib/types/jobs"

export const dynamic = "force-dynamic"

const ApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user
  console.log(user, "user")

  let applications: Application[] = []
  let loadFailed = false

  const [applicationsResult, jobsResult] = await Promise.allSettled([
    getApplications(`applicantId=${user?.id}`),
    getJobs(),
  ])

  if (applicationsResult.status === "fulfilled") {
    const jobs: Job[] =
      jobsResult.status === "fulfilled" ? jobsResult.value : []
    const jobsById = new Map<string, Job>(jobs.map((job) => [job._id, job]))

    applications = applicationsResult.value
      .filter((application) =>
        user
          ? application.user === user.id || application.email === user.email
          : false
      )
      .map((application) => {
        const job = jobsById.get(application.jobId)

        return {
          ...application,
          jobType: application.jobType ?? job?.jobType,
          location: application.location ?? job?.location,
          remote: application.remote ?? job?.remote,
        }
      })
      .sort((first, second) => {
        const firstAppliedAt = getAppliedAt(first)?.getTime() ?? 0
        const secondAppliedAt = getAppliedAt(second)?.getTime() ?? 0

        return secondAppliedAt - firstAppliedAt
      })
  } else {
    loadFailed = true
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-6">
      <ApplicationsView applications={applications} loadFailed={loadFailed} />
    </div>
  )
}

export default ApplicationsPage

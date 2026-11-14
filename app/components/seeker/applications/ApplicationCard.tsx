import { CategoryIcon } from "@/app/components/recruiter/job/JobDisplay"
import type { Application } from "@/lib/types/applications"
import ApplicationDetailsLink from "./ApplicationDetailsLink"
import ApplicationStatusBadge from "./ApplicationStatusBadge"
import { getAppliedLabel, getJobMeta } from "./application-utils"

type ApplicationCardProps = {
  application: Application
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  return (
    <article className="rounded-xl border border-border/70 bg-background/40 p-4">
      <div className="flex items-start gap-3">
        <CategoryIcon category={application.jobCategory} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground">
                {application.jobTitle}
              </h3>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {application.companyName}
              </p>
            </div>

            <ApplicationStatusBadge status={application.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="min-w-0 truncate text-xs text-muted-foreground">
              {getJobMeta(application)}
            </p>
            <p
              suppressHydrationWarning
              className="shrink-0 text-[11px] text-muted-foreground"
            >
              {getAppliedLabel(application)}
            </p>
          </div>

          <div className="mt-3 flex justify-end">
            <ApplicationDetailsLink jobId={application.jobId} />
          </div>
        </div>
      </div>
    </article>
  )
}

export default ApplicationCard

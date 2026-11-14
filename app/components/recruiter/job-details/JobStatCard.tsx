import {
  BanknoteIcon,
  BriefcaseBusinessIcon,
  CalendarClockIcon,
  LucideIcon,
  MapPinIcon,
} from "lucide-react"
import {
  formatCompensation,
  getDeadline,
  getJobLocation,
} from "@/app/components/recruiter/job/JobDisplay"
import type { Job } from "@/lib/types/jobs"
import { format } from "date-fns"

const statLabelClassName =
  "mt-2.5 text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase"

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-3 backdrop-blur-sm sm:p-4">
      <Icon aria-hidden className="size-4 text-muted-foreground" />
      <p className={statLabelClassName}>{label}</p>
      <p
        className="mt-1 text-sm leading-snug font-semibold wrap-break-word text-foreground"
        title={value}
      >
        {value}
      </p>
    </div>
  )
}

const JobStatCard = ({ job }: { job: Job }) => {
  const deadline = getDeadline(job)
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <StatCard
        icon={BanknoteIcon}
        label="Salary Range"
        value={formatCompensation(job)}
      />
      <StatCard
        icon={MapPinIcon}
        label="Location"
        value={getJobLocation(job)}
      />
      <StatCard
        icon={BriefcaseBusinessIcon}
        label="Job Type"
        value={job.jobType}
      />
      <StatCard
        icon={CalendarClockIcon}
        label="Apply Before"
        value={deadline ? format(deadline, "MMM d, yyyy") : "Open until filled"}
      />
    </div>
  )
}

export default JobStatCard

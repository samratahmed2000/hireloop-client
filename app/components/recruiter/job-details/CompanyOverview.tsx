import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getCategoryMeta } from "@/app/components/recruiter/job/JobDisplay"
import type { Job } from "@/lib/types/jobs"

const getCompanyInitials = (companyName: string) => {
  return companyName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
}

const detailLabelClassName =
  "text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase"

const CompanyOverview = ({ job }: { job: Job }) => {
  const category = getCategoryMeta(job.jobCategory)

  return (
    <section className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm">
      <h2 className="font-heading text-base font-semibold tracking-tight text-foreground">
        Company Overview
      </h2>

      <div className="relative mt-4 flex aspect-16/10 items-center justify-center overflow-hidden rounded-xl border border-border bg-linear-to-br from-[#5b3bf5]/25 via-card to-[#3b1bd8]/20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,59,245,0.35),transparent_65%)]"
        />
        <span className="relative flex size-16 items-center justify-center rounded-2xl border border-foreground/10 bg-background/40 text-2xl font-semibold tracking-tight text-foreground backdrop-blur-sm">
          {getCompanyInitials(job.companyName) || "HL"}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {job.companyName}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{category.label}</p>

      <Separator className="my-4 bg-border" />

      <dl className="space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className={detailLabelClassName}>Location</dt>
          <dd className="text-right font-medium text-foreground">
            {job.location}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className={detailLabelClassName}>Work Mode</dt>
          <dd className="text-right font-medium text-foreground">
            {job.remote ? "Remote" : "On-site"}
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className={detailLabelClassName}>Job Type</dt>
          <dd className="text-right font-medium text-foreground">
            {job.jobType}
          </dd>
        </div>
      </dl>

      <Button
        variant="outline"
        className="mt-5 h-10 w-full cursor-pointer rounded-xl border-border bg-foreground/5 text-sm font-medium hover:bg-foreground/10"
      >
        View Website
      </Button>
    </section>
  )
}

export default CompanyOverview

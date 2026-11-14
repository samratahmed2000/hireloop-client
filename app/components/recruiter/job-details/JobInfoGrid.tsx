import type { Job } from "@/lib/types/jobs"
import { Separator } from "@base-ui/react"
import { ReactNode } from "react"
import { formatCompensation } from "@/app/components/recruiter/job/JobDisplay"
import { BriefcaseBusinessIcon, MapPinIcon, TagIcon } from "lucide-react"
import { getCategoryMeta } from "@/app/components/recruiter/job/JobDisplay"

const metaPillClassName =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted-foreground"

function DetailSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className="flex gap-2.5 text-sm leading-6 text-muted-foreground"
        >
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#5b3bf5] dark:bg-[#9d8cff]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function toBulletPoints(value?: string) {
  if (!value) {
    return []
  }

  return value
    .split(/\r?\n/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((line) => line.replace(/^[\s\-•*]+/, "").trim())
    .filter(Boolean)
}

const JobInfoGrid = ({ job }: { job: Job }) => {
  const responsibilities = toBulletPoints(job.responsibilities)
  const qualifications = toBulletPoints(job.qualifications)

  const category = getCategoryMeta(job.jobCategory)

  const workMode = job.remote ? "remotely" : `in ${job.location}`
  const description = `${job.companyName} is hiring a ${job.jobTitle} to join their ${category.label} team, working ${workMode}. This ${job.jobType.toLowerCase()} role comes with a compensation range of ${formatCompensation(job)}.`

  const metaTags = [
    { label: category.label, icon: TagIcon },
    { label: job.jobType, icon: BriefcaseBusinessIcon },
    { label: job.remote ? "Remote" : "On-site", icon: MapPinIcon },
  ] as const
  return (
    <div className="flex flex-col gap-7">
      <DetailSection title="Job Description">
        <p className="text-sm leading-6 text-pretty text-muted-foreground">
          {description}
        </p>
      </DetailSection>

      {responsibilities.length > 0 && (
        <>
          <Separator className="bg-border" />
          <DetailSection title="Responsibilities">
            <BulletList items={responsibilities} />
          </DetailSection>
        </>
      )}

      {qualifications.length > 0 && (
        <>
          <Separator className="bg-border" />
          <DetailSection title="Requirements">
            <div className="mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {metaTags.map((tag) => (
                <span key={tag.label} className={metaPillClassName}>
                  <tag.icon className="size-3.5" />
                  {tag.label}
                </span>
              ))}
            </div>
            <BulletList items={qualifications} />
          </DetailSection>
        </>
      )}
    </div>
  )
}

export default JobInfoGrid

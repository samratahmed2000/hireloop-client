"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import type { JobCategory, JobType } from "@/lib/types/jobs"
import {
  jobCategories,
  jobTypes,
} from "@/app/components/recruiter/job-form/constants"
import { cn } from "@/lib/utils"

export type JobFilterState = {
  jobType: JobType | null
  remote: boolean | null
  jobCategory: JobCategory | null
}

type FilterParam = {
  key: string
  serialize: (filters: JobFilterState) => string | null
}

const emptyFilters: JobFilterState = {
  jobType: null,
  remote: null,
  jobCategory: null,
}

const remoteOptions = [
  { value: true, label: "Remote" },
  { value: false, label: "On-site" },
] as const

const jobTypeSet = new Set<string>(jobTypes)
const jobCategorySet = new Set<string>(
  jobCategories.map((category) => category.value)
)

const filterParams: FilterParam[] = [
  {
    key: "jobType",
    serialize: (filters) => filters.jobType,
  },
  {
    key: "remote",
    serialize: (filters) =>
      filters.remote === null ? null : String(filters.remote),
  },
  {
    key: "jobCategory",
    serialize: (filters) => filters.jobCategory,
  },
]

function getFiltersFromParams(params: URLSearchParams): JobFilterState {
  const jobType = params.get("jobType")
  const remote = params.get("remote")
  const jobCategory = params.get("jobCategory")

  return {
    jobType: jobType && jobTypeSet.has(jobType) ? (jobType as JobType) : null,
    remote: remote === "true" ? true : remote === "false" ? false : null,
    jobCategory:
      jobCategory && jobCategorySet.has(jobCategory)
        ? (jobCategory as JobCategory)
        : null,
  }
}

function setParam(params: URLSearchParams, key: string, value: string | null) {
  if (value === null) {
    params.delete(key)
  } else {
    params.set(key, value)
  }
}

type FilterSectionProps = {
  title: string
  children: React.ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function FilterCheckbox({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
    </label>
  )
}

function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const filters = getFiltersFromParams(searchParams)

  const activeCount = Object.values(filters).filter(
    (filter) => filter !== null
  ).length

  const applyFilters = (next: JobFilterState) => {
    const params = new URLSearchParams(searchParams.toString())

    filterParams.forEach(({ key, serialize }) => {
      setParam(params, key, serialize(next))
    })

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs", {
      scroll: false,
    })
  }

  const updateFilters = (patch: Partial<JobFilterState>) => {
    applyFilters({ ...filters, ...patch })
  }

  return (
    <aside
      aria-label="Job filters"
      className="lg:sticky lg:top-24 lg:self-start"
    >
      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls="job-filters"
        onClick={() => setOpen((current) => !current)}
        className="h-11 w-full cursor-pointer justify-between rounded-xl border-border bg-card/70 px-4 text-sm font-medium lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontalIcon className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-[#5b3bf5] text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </Button>

      <div
        id="job-filters"
        className={cn("mt-3 lg:mt-0 lg:block", open ? "block" : "hidden")}
      >
        <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Filters
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => applyFilters(emptyFilters)}
              disabled={activeCount === 0}
              className="cursor-pointer text-xs font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
            >
              Clear
            </Button>
          </div>

          <Separator className="my-4 bg-border" />

          <div className="flex flex-col gap-5">
            <FilterSection title="Job Type">
              {jobTypes.map((type) => (
                <FilterCheckbox
                  key={type}
                  label={type}
                  checked={filters.jobType === type}
                  onCheckedChange={(checked) =>
                    updateFilters({ jobType: checked ? type : null })
                  }
                />
              ))}
            </FilterSection>

            <Separator className="bg-border" />

            <FilterSection title="Remote">
              {remoteOptions.map((option) => (
                <FilterCheckbox
                  key={option.label}
                  label={option.label}
                  checked={filters.remote === option.value}
                  onCheckedChange={(checked) =>
                    updateFilters({ remote: checked ? option.value : null })
                  }
                />
              ))}
            </FilterSection>

            <Separator className="bg-border" />

            <FilterSection title="Job Category">
              {jobCategories.map((category) => (
                <FilterCheckbox
                  key={category.value}
                  label={category.label}
                  checked={filters.jobCategory === category.value}
                  onCheckedChange={(checked) =>
                    updateFilters({
                      jobCategory: checked ? category.value : null,
                    })
                  }
                />
              ))}
            </FilterSection>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default JobFilters

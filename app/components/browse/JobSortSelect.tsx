"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  defaultJobSort,
  isJobSort,
  jobSortOptions,
  type JobSort,
} from "@/app/components/browse/job-sort"

function JobSortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortParam = searchParams.get("sort")
  const sort: JobSort = isJobSort(sortParam) ? sortParam : defaultJobSort

  const applySort = (nextSort: JobSort) => {
    const params = new URLSearchParams(searchParams.toString())

    if (nextSort === defaultJobSort) {
      params.delete("sort")
    } else {
      params.set("sort", nextSort)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs", {
      scroll: false,
    })
  }

  return (
    <Select
      items={jobSortOptions}
      value={sort}
      onValueChange={(value) => {
        if (value) {
          applySort(value)
        }
      }}
    >
      <SelectTrigger
        aria-label="Sort jobs"
        className="h-9 w-full rounded-xl border-border bg-foreground/5 px-3 sm:w-40"
      >
        <SelectValue placeholder="Sort jobs" />
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false}>
        {jobSortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default JobSortSelect

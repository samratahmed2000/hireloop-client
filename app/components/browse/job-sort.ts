export const jobSortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary", label: "Highest Salary" },
] as const

export type JobSort = (typeof jobSortOptions)[number]["value"]

export const defaultJobSort: JobSort = "recent"

const jobSortValues = new Set<string>(
  jobSortOptions.map((option) => option.value)
)

export function isJobSort(value: string | null): value is JobSort {
  return value !== null && jobSortValues.has(value)
}

import type { JobCategory, JobType } from "./jobs"

export type ApplicationStatus =
  | "applied"
  | "review"
  | "shortlisted"
  | "interview"
  | "offered"
  | "rejected"
  | "withdrawn"

export interface Application {
  _id: string
  jobId: string
  user: string
  email: string
  jobTitle: string
  jobCategory: JobCategory
  companyName: string
  status?: ApplicationStatus
  appliedAt?: string
  createdAt?: string
  archived?: boolean
  jobType?: JobType
  location?: string
  remote?: boolean
}

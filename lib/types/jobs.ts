export type JobCategory =
  | "engineering"
  | "design"
  | "product"
  | "marketing"
  | "sales"
  | "support"
  | "operations"
  | "finance"
  | "people"
  | "other"

export type SalaryFrequency = "hourly" | "monthly" | "yearly"

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type NewJobInput = {
  jobTitle: string
  companyName: string
  jobCategory: JobCategory
  jobType: JobType
  remote: boolean
  location: string
  applicationDeadline: string
  minSalary: number
  maxSalary: number
  salaryFrequency: SalaryFrequency
  responsibilities: string
  qualifications: string
}

export type InsertedJob = {
  acknowledged: boolean
  insertedId: string
}

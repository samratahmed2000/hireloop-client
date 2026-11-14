import type {
  JobCategory,
  JobType,
  NewJobInput,
  SalaryFrequency,
} from "@/lib/types/jobs"

export function buildJobPayload(
  formData: FormData,
  jobType: JobType,
  remote: boolean
): NewJobInput {
  return {
    jobTitle: String(formData.get("jobTitle") ?? "").trim(),
    companyName: String(formData.get("companyName") ?? "").trim(),
    jobCategory: formData.get("jobCategory") as JobCategory,
    jobType,
    remote,
    location: String(formData.get("location") ?? "").trim(),
    applicationDeadline: String(formData.get("applicationDeadline") ?? ""),
    minSalary: Number(formData.get("minSalary")),
    maxSalary: Number(formData.get("maxSalary")),
    salaryFrequency: formData.get("salaryFrequency") as SalaryFrequency,
    responsibilities: String(formData.get("responsibilities") ?? "").trim(),
    qualifications: String(formData.get("qualifications") ?? "").trim(),
    applicants: 0,
    status: "active",
  }
}

export function validateJobPayload(payload: NewJobInput) {
  if (
    !payload.jobTitle ||
    !payload.companyName ||
    !payload.location ||
    !payload.applicationDeadline
  ) {
    return {
      title: "Missing details",
      description: "Please complete all required fields before saving.",
    }
  }

  if (
    !Number.isFinite(payload.minSalary) ||
    !Number.isFinite(payload.maxSalary) ||
    payload.maxSalary < payload.minSalary
  ) {
    return {
      title: "Invalid salary range",
      description: "The maximum salary must be greater than the minimum.",
    }
  }

  return null
}

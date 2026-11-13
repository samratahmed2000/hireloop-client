"use server"

import type { InsertedJob, NewJobInput } from "@/lib/types/jobs"
import { baseUrl } from "../utils"

// Add New Job
export const addNewJob = async (job: NewJobInput): Promise<InsertedJob> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
    cache: "no-store",
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Failed to publish job"
    )
  }

  return data as InsertedJob
}

// Edit Job
export const editJob = async (
  jobId: string,
  job: NewJobInput
): Promise<void> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
    cache: "no-store",
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Failed to update job"
    )
  }
}

// Delete Job
export const deleteJob = async (jobId: string): Promise<void> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
    method: "DELETE",
    cache: "no-store",
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : "Failed to delete job"
    )
  }
}

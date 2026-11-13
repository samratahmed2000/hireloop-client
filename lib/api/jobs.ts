"use server"

import { Job } from "../types/jobs"
import { baseUrl } from "../utils"

// Get All Jobs
export const getJobs = async (): Promise<Job[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured")
  }

  const res = await fetch(`${baseUrl}/jobs`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to load jobs")
  }

  return (await res.json()) as Job[]
}
